"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function updateCustomerProfile(_prevState: any, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "CUSTOMER" || !session.user.id) {
      return { error: "Unauthorized" };
    }
    
    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const address = formData.get("address") as string;
    
    if (!name || !phoneNumber || !address) {
      return { error: "Semua kolom wajib diisi." };
    }
    
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name, phoneNumber, address },
    });
    
    revalidatePath("/customer/profile");
    revalidatePath("/customer/home");
    
    return { success: true, message: "Profil berhasil diperbarui." };
  } catch (error: any) {
    return { error: error.message || "Gagal memperbarui profil." };
  }
}

export async function updateMerchantProfile(_prevState: any, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "MERCHANT" || !session.user.id) {
      return { error: "Unauthorized" };
    }
    
    // 1. Update basic user data (name, phone)
    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    
    if (!name || !phoneNumber) {
      return { error: "Nama dan Nomor Telepon wajib diisi." };
    }
    
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name, phoneNumber },
    });
    
    // 2. Update Merchant data
    const storeName = formData.get("storeName") as string;
    const address = formData.get("address") as string;
    const area = formData.get("area") as string;
    const description = formData.get("description") as string;
    const deliveryFee = parseInt(formData.get("deliveryFee") as string);
    const isOpen = formData.get("isOpen") === "true";
    
    const qrisImageFile = formData.get("qrisImage") as File | null;
    let qrisImageUrl = undefined; // undefined agar prisma tidak update jika null
    
    if (qrisImageFile && qrisImageFile.size > 0) {
      try {
        const { put } = await import("@vercel/blob");
        const blob = await put(qrisImageFile.name, qrisImageFile, { 
          access: "public",
          addRandomSuffix: true,
        });
        qrisImageUrl = blob.url;
      } catch (err) {
        console.error("Vercel Blob Upload Error:", err);
        return { error: "Gagal mengunggah QRIS. Pastikan BLOB_READ_WRITE_TOKEN valid." };
      }
    }
    
    await prisma.merchantProfile.update({
      where: { userId: session.user.id },
      data: {
        storeName,
        address,
        area,
        description,
        deliveryFee: isNaN(deliveryFee) ? 0 : deliveryFee,
        isOpen,
        ...(qrisImageUrl && { qrisImageUrl })
      },
    });
    
    revalidatePath("/merchant/profile");
    revalidatePath("/customer/home"); // Karena status Buka/Tutup merchant mungkin berubah
    
    return { success: true, message: "Profil toko berhasil diperbarui." };
  } catch (error: any) {
    return { error: error.message || "Gagal memperbarui profil toko." };
  }
}
