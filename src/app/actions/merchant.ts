"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getMerchantPlan() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const merchant = await prisma.merchantProfile.findUnique({
    where: { userId: session.user.id },
    select: { subscriptionStatus: true },
  });

  return merchant?.subscriptionStatus ?? null;
}
