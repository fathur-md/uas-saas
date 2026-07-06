"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

// Middleware keamanan tambahan untuk memastikan hanya Admin yang bisa memanggil fungsi ini
async function checkAdminAuth() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized: Hanya Admin yang bisa melakukan tindakan ini.");
  }
}

export async function approveMerchant(merchantId: string) {
  await checkAdminAuth();
  
  await prisma.merchantProfile.update({
    where: { id: merchantId },
    data: { isApproved: true },
  });
  
  revalidatePath("/admin/merchants");
}

export async function rejectMerchant(merchantId: string) {
  await checkAdminAuth();
  
  // Soft-delete: tandai user sebagai terhapus agar bisa diregistrasi ulang
  const merchant = await prisma.merchantProfile.findUnique({
    where: { id: merchantId },
    select: { userId: true }
  });
  
  if (!merchant) return;
  
  await prisma.user.update({
    where: { id: merchant.userId },
    data: { deletedAt: new Date() },
  });
  
  revalidatePath("/admin/merchants");
}

export async function deleteUser(userId: string) {
  await checkAdminAuth();

  // Prevent admin from deleting themselves
  const session = await auth();
  if (session?.user?.id === userId) {
    throw new Error("Tidak bisa menghapus akun sendiri.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { deletedAt: new Date() },
  });

  revalidatePath("/admin/users");
}

export async function restoreUser(userId: string) {
  await checkAdminAuth();

  await prisma.user.update({
    where: { id: userId },
    data: { deletedAt: null },
  });

  revalidatePath("/admin/users");
}
