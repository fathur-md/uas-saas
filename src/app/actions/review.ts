"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function submitReview(prevState: any, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "CUSTOMER" || !session.user.id) {
      return { error: "Unauthorized" };
    }
    
    const customerId = session.user.id;
    const orderId = formData.get("orderId") as string;
    const rating = parseInt(formData.get("rating") as string);
    const comment = formData.get("comment") as string;
    
    if (!orderId || isNaN(rating) || rating < 1 || rating > 5) {
      return { error: "Data ulasan tidak valid. Pastikan Anda memilih rating 1-5." };
    }
    
    // Verifikasi order milik customer ini dan sudah COMPLETED
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        customerId,
        status: "COMPLETED"
      }
    });
    
    if (!order) {
      return { error: "Pesanan tidak ditemukan atau belum selesai." };
    }
    
    // Cek apakah sudah pernah direview
    const existingReview = await prisma.review.findUnique({
      where: { orderId }
    });
    
    if (existingReview) {
      return { error: "Anda sudah memberikan ulasan untuk pesanan ini." };
    }
    
    await prisma.review.create({
      data: {
        orderId,
        customerId,
        merchantId: order.merchantId,
        rating,
        comment: comment || null,
      }
    });
    
    revalidatePath("/customer/orders");
    return { success: true };
    
  } catch (error: any) {
    return { error: error.message || "Terjadi kesalahan saat menyimpan ulasan." };
  }
}
