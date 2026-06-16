import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkUser } from "@/lib/checkUser";
import { getSubscriptionTier } from "@/lib/getSubscriptionTier";

export async function GET() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return NextResponse.json({ subscriptionTier: "free" }, { status: 401 });
  }

  const user = await checkUser();
  const subscriptionTier =
    user?.subscriptionTier || (await getSubscriptionTier());

  return NextResponse.json({ subscriptionTier });
}
