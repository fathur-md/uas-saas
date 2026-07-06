"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function uploadPaymentProof(orderId: string, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "CUSTOMER" || !session.user.id) {
      return { error: "Anda harus login sebagai Customer." };
    }

    const file = formData.get("proofImage") as File;
    if (!file || file.size === 0) {
      return { error: "Silakan pilih file gambar bukti transfer terlebih dahulu." };
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      return { error: "File harus berupa gambar (JPG/PNG/WEBP)." };
    }
    
    // Validasi ukuran max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return { error: "Ukuran gambar maksimal 5MB." };
    }

    // Verifikasi order milik customer ini
    const order = await prisma.order.findUnique({
      where: { id: orderId, customerId: session.user.id }
    });

    if (!order) {
      return { error: "Pesanan tidak ditemukan." };
    }

    if (order.paymentStatus === "PAID") {
      return { error: "Pesanan ini sudah dibayar." };
    }

    // Upload ke Vercel Blob
    const blob = await put(`payment-proofs/${order.id}-${Date.now()}-${file.name}`, file, {
      access: "public",
    });

    // Update database
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentProofUrl: blob.url,
      }
    });

    revalidatePath("/customer/orders");
    revalidatePath(`/customer/orders/${order.id}/payment`);

    return { success: true, url: blob.url };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { error: "Gagal mengunggah bukti pembayaran. Silakan coba lagi." };
  }
}
