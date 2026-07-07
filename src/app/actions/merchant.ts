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

export async function requestSubscriptionUpgrade() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "MERCHANT") {
    return { error: "Unauthorized" };
  }

  try {
    const merchant = await prisma.merchantProfile.findUnique({
      where: { userId: session.user.id },
      include: { subscriptionRequest: true }
    });

    if (!merchant) return { error: "Profil merchant tidak ditemukan." };
    
    if (merchant.subscriptionStatus === "PREMIUM") {
      return { error: "Anda sudah berlangganan Premium." };
    }

    if (merchant.subscriptionRequest && merchant.subscriptionRequest.status === "PENDING") {
      return { error: "Anda sudah memiliki pengajuan langganan yang sedang menunggu verifikasi." };
    }

    // Upsert the request (create new or update existing REJECTED to PENDING)
    await prisma.subscriptionRequest.upsert({
      where: { merchantId: merchant.id },
      update: {
        status: "PENDING",
        createdAt: new Date(),
      },
      create: {
        merchantId: merchant.id,
        status: "PENDING",
      }
    });

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/merchant/dashboard");
    revalidatePath("/merchant/profile");
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Terjadi kesalahan saat mengajukan upgrade." };
  }
}

export async function cancelSubscription() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "MERCHANT") {
    return { error: "Unauthorized" };
  }

  try {
    const merchant = await prisma.merchantProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!merchant) return { error: "Profil merchant tidak ditemukan." };
    
    if (merchant.subscriptionStatus === "FREE") {
      return { error: "Anda sudah berada di paket Gratis." };
    }

    await prisma.merchantProfile.update({
      where: { id: merchant.id },
      data: {
        subscriptionStatus: "FREE",
      }
    });

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/merchant/dashboard");
    revalidatePath("/merchant/profile");
    
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Terjadi kesalahan saat membatalkan langganan." };
  }
}
