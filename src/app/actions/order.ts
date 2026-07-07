"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createOrder(
  boundData: { productId: string; merchantId: string; price: number; shippingCost: number },
  _prevState: any,
  formData: FormData
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "CUSTOMER" || !session.user.id) {
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
    
    // Fetch merchant for subscription limits
    const merchant = await prisma.merchantProfile.findUnique({
      where: { id: boundData.merchantId },
      select: { subscriptionStatus: true, monthlyOrderCount: true, lastOrderResetDate: true }
    });
    
    if (!merchant) {
      return { error: "Merchant tidak ditemukan." };
    }
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Hitung jumlah pesanan aktual bulan ini
    const actualOrderCount = await prisma.order.count({
      where: {
        merchantId: boundData.merchantId,
        createdAt: { gte: startOfMonth },
        status: { notIn: ["CANCELLED", "REJECTED"] }
      }
    });
    
    if (merchant.subscriptionStatus === "FREE" && actualOrderCount >= 6) {
      return { error: "Toko ini sedang penuh pesanan (kuota bulanan merchant gratis telah habis). Silakan coba lagi bulan depan atau pilih toko lain." };
    }
    
    // Mulai transaksi database
    await prisma.$transaction(async (tx) => {
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
      
      // 3. (Kosmetik) Update Kuota Merchant untuk record
      await tx.merchantProfile.update({
        where: { id: boundData.merchantId },
        data: {
          monthlyOrderCount: actualOrderCount + 1,
          lastOrderResetDate: now,
        }
      });
      
      return newOrder;
    });

  } catch (error: any) {
    console.error("Gagal membuat pesanan:", error);
    return { error: error.message || "Gagal membuat pesanan, silakan coba lagi." };
  }
  
  revalidatePath("/merchant/orders");
  // Jika sukses, lempar ke halaman riwayat pesanan
  redirect("/customer/orders");
}

export async function updateOrderStatus(
  orderId: string, 
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "PROCESSING" | "DELIVERING" | "COMPLETED" | "CANCELLED", 
  paymentStatus?: "PAID" | "UNPAID" | "WAITING_CONFIRMATION",
  _formData?: FormData
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "MERCHANT" || !session.user.id) {
      return { error: "Unauthorized" };
    }

    const merchantId = (await prisma.merchantProfile.findUnique({ where: { userId: session.user.id } }))?.id;
    
    if (!merchantId) return { error: "Profil Merchant tidak ditemukan" };

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

    revalidatePath("/merchant/orders");
    revalidatePath("/customer/orders");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal mengupdate pesanan:", error);
    return { error: error.message || "Gagal mengupdate pesanan, silakan coba lagi." };
  }
}

export async function cancelOrder(orderId: string, _formData?: FormData) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "CUSTOMER" || !session.user.id) {
      return { error: "Unauthorized" };
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId, customerId: session.user.id },
    });

    if (!order) return { error: "Pesanan tidak ditemukan" };
    if (order.status !== "PENDING") {
      return { error: "Hanya pesanan berstatus Menunggu Konfirmasi yang bisa dibatalkan." };
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });

    revalidatePath("/customer/orders");
    revalidatePath("/merchant/orders");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal membatalkan pesanan:", error);
    return { error: error.message || "Gagal membatalkan pesanan, silakan coba lagi." };
  }
}
