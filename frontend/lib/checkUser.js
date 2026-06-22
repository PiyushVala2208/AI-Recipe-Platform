import { currentUser } from "@clerk/nextjs/server";
import { getSubscriptionTier } from "@/lib/getSubscriptionTier";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const isNetworkFetchError = (error) =>
  error instanceof TypeError && error.message.includes("fetch failed");

async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      // Retry on transient server errors (5xx)
      if (response.status >= 500 && i < retries - 1) {
        console.warn(`⚠️ Strapi returned ${response.status}. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
      return response;
    } catch (error) {
      if (i < retries - 1) {
        console.warn(`⚠️ Fetch failed: ${error.message}. Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
      throw error;
    }
  }
}

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  if (!STRAPI_API_TOKEN) {
    console.warn("STRAPI_API_TOKEN is missing in .env");
    return null;
  }

  const subscriptionTier = await getSubscriptionTier();

  try {
    // Check if user exists in Strapi
    const existingUserResponse = await fetchWithRetry(
      `${STRAPI_URL}/api/users?filters[clerkId][$eq]=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      },
    );

    if (!existingUserResponse.ok) {
      console.warn(`Strapi is currently unavailable (Status: ${existingUserResponse.status}). Falling back to logged-out state.`);
      return null;
    }

    const existingUserData = await existingUserResponse.json();

    if (existingUserData.length > 0) {
      const existingUser = existingUserData[0];

      // Update subscription tier if changed
      if (existingUser.subscriptionTier !== subscriptionTier) {
        await fetchWithRetry(`${STRAPI_URL}/api/users/${existingUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({ subscriptionTier }),
        });
      }

      return { ...existingUser, subscriptionTier };
    }

    // Get authenticated role
    const rolesResponse = await fetchWithRetry(
      `${STRAPI_URL}/api/users-permissions/roles`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      },
    );

    const rolesData = await rolesResponse.json();
    const authenticatedRole = rolesData.roles.find(
      (role) => role.type === "authenticated",
    );

    if (!authenticatedRole) {
      console.warn("Authenticated role not found in Strapi. Falling back to logged-out state.");
      return null;
    }

    const userData = {
      username:
        user.username || user.emailAddresses[0].emailAddress.split("@")[0],
      email: user.emailAddresses[0].emailAddress,
      password: `clerk_managed_${user.id}_${Date.now()}`,
      confirmed: true,
      blocked: false,
      role: authenticatedRole.id,
      clerkId: user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl || "",
      subscriptionTier,
    };

    const newUserResponse = await fetchWithRetry(`${STRAPI_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(userData),
    });

    if (!newUserResponse.ok) {
      const errorText = await newUserResponse.text();
      console.warn("Error creating user in Strapi:", errorText);
      return null;
    }

    const newUser = await newUserResponse.json();
    return newUser;
  } catch (error) {
    console.warn("checkUser encountered a network or server issue:", error.message);
    return null;
  }
};
