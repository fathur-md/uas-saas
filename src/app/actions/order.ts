"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createOrder(
  boundData: { productId: string; merchantId: string; price: number; shippingCost: number },
  prevState: any,
  formData: FormData
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "CUSTOMER" || !session.user.id) {
      return { error: "Anda harus login sebagai Customer untuk memesan." };
    }
    
    const customerId = session.user.id;
    
    const quantity = parseInt(formData.get("quantity") as string);
    const shippingAddress = formData.get("shippingAddress") as string;
    const notes = formData.get("notes") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    
    if (isNaN(quantity) || quantity < 1 || !shippingAddress || !paymentMethod) {
      return { error: "Mohon lengkapi semua kolom yang wajib." };
    }
    
    const totalAmount = (boundData.price * quantity) + boundData.shippingCost;
    
    // Mulai transaksi database
    const order = await prisma.$transaction(async (tx) => {
      // 1. Buat Order
      const newOrder = await tx.order.create({
        data: {
          customerId,
          merchantId: boundData.merchantId,
          paymentMethod,
          shippingAddress,
          notes: notes || null,
          shippingCost: boundData.shippingCost,
          totalAmount,
          status: "PENDING",
          paymentStatus: paymentMethod === "COD" ? "UNPAID" : "WAITING_CONFIRMATION",
        }
      });
      
      // 2. Buat OrderItem
      await tx.orderItem.create({
        data: {
          orderId: newOrder.id,
          productId: boundData.productId,
          quantity,
          price: boundData.price,
        }
      });
      
      return newOrder;
    });

  } catch (error: any) {
    console.error("Gagal membuat pesanan:", error);
    return { error: error.message || "Gagal membuat pesanan, silakan coba lagi." };
  }
  
  // Jika sukses, lempar ke halaman riwayat pesanan
  redirect("/customer/orders");
}

export async function updateOrderStatus(
  orderId: string, 
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "PROCESSING" | "DELIVERING" | "COMPLETED" | "CANCELLED", 
  paymentStatus?: "PAID" | "UNPAID" | "WAITING_CONFIRMATION",
  formData?: FormData
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "MERCHANT" || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const merchantId = (await prisma.merchantProfile.findUnique({ where: { userId: session.user.id } }))?.id;
    
    if (!merchantId) throw new Error("Profil Merchant tidak ditemukan");

    const updateData: any = { status };
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    await prisma.order.updateMany({
      where: {
        id: orderId,
        merchantId, // pastikan hanya merchant yang bersangkutan yang bisa mengubah
      },
      data: updateData,
    });

  } catch (error) {
    console.error("Gagal mengupdate pesanan:", error);
    throw new Error("Gagal mengupdate pesanan, silakan coba lagi.");
  }
  
  revalidatePath("/merchant/orders");
}

export async function cancelOrder(orderId: string, formData?: FormData) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "CUSTOMER" || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId, customerId: session.user.id },
    });

    if (!order) throw new Error("Pesanan tidak ditemukan");
    if (order.status !== "PENDING") {
      throw new Error("Hanya pesanan berstatus Menunggu Konfirmasi yang bisa dibatalkan.");
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });
  } catch (error) {
    console.error("Gagal membatalkan pesanan:", error);
    throw new Error("Gagal membatalkan pesanan, silakan coba lagi.");
  }

  revalidatePath("/customer/orders");
}
