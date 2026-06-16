import { auth } from "@clerk/nextjs/server";

export async function getSubscriptionTier() {
  const { has } = await auth();
  return has?.({ plan: "pro" }) ? "pro" : "free";
}
