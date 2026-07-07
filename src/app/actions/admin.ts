"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

// Middleware keamanan tambahan untuk memastikan hanya Admin yang bisa memanggil fungsi ini
async function checkAdminAuth() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized: Hanya Admin yang bisa melakukan tindakan ini." };
  }
}

export async function approveMerchant(merchantId: string) {
  try {
    const authCheck = await checkAdminAuth();
    if (authCheck?.error) return authCheck;
    
    await prisma.merchantProfile.update({
      where: { id: merchantId },
      data: { isApproved: true },
    });
    
    revalidatePath("/admin/merchants");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Gagal menyetujui merchant." };
  }
}

export async function rejectMerchant(merchantId: string) {
  try {
    const authCheck = await checkAdminAuth();
    if (authCheck?.error) return authCheck;
    
    // Soft-delete: tandai user sebagai terhapus agar bisa diregistrasi ulang
    const merchant = await prisma.merchantProfile.findUnique({
      where: { id: merchantId },
      select: { userId: true }
    });
    
    if (!merchant) return { error: "Merchant tidak ditemukan." };
    
    await prisma.$transaction([
      prisma.user.update({
        where: { id: merchant.userId },
        data: { deletedAt: new Date() },
      }),
      prisma.merchantProfile.update({
        where: { id: merchantId },
        data: { isOpen: false, isApproved: false },
      }),
    ]);
    
    revalidatePath("/admin/merchants");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Gagal menolak merchant." };
  }
}

export async function deleteUser(userId: string) {
  try {
    const authCheck = await checkAdminAuth();
    if (authCheck?.error) return authCheck;

    // Prevent admin from deleting themselves
    const session = await auth();
    if (session?.user?.id === userId) {
      return { error: "Tidak bisa menghapus akun sendiri." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Gagal menonaktifkan pengguna." };
  }
}

export async function restoreUser(userId: string) {
  try {
    const authCheck = await checkAdminAuth();
    if (authCheck?.error) return authCheck;

    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: null },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Gagal memulihkan pengguna." };
  }
}

export async function approveSubscription(requestId: string) {
  try {
    const authCheck = await checkAdminAuth();
    if (authCheck?.error) return authCheck;
    
    const request = await prisma.subscriptionRequest.findUnique({
      where: { id: requestId },
      include: { merchant: true }
    });

    if (!request || request.status !== "PENDING") {
      return { error: "Permohonan tidak ditemukan atau sudah diproses." };
    }

    await prisma.$transaction(async (tx) => {
      // 1. Update request status
      await tx.subscriptionRequest.update({
        where: { id: requestId },
        data: { status: "APPROVED" }
      });

      // 2. Update merchant status
      await tx.merchantProfile.update({
        where: { id: request.merchantId },
        data: {
          subscriptionStatus: "PREMIUM",
          monthlyOrderCount: 0,
          lastOrderResetDate: new Date(),
        }
      });
    });

    revalidatePath("/admin/subscriptions");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Gagal menyetujui permohonan." };
  }
}

export async function rejectSubscription(requestId: string) {
  try {
    const authCheck = await checkAdminAuth();
    if (authCheck?.error) return authCheck;
    
    await prisma.subscriptionRequest.update({
      where: { id: requestId },
      data: { status: "REJECTED" }
    });

    revalidatePath("/admin/subscriptions");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Gagal menolak permohonan." };
  }
}
