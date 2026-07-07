"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

async function getMerchantProfileId() {
  const session = await auth();
  if (!session?.user || session.user.role !== "MERCHANT" || !session.user.id) {
    throw new Error("Unauthorized");
  }
  
  const merchant = await prisma.merchantProfile.findUnique({
    where: { userId: session.user.id },
  });
  
  if (!merchant) throw new Error("Profil Merchant tidak ditemukan");
  if (!merchant.isApproved) throw new Error("Toko belum disetujui admin");
  
  return merchant.id;
}

export async function addProduct(_prevState: any, formData: FormData) {
  try {
    const merchantId = await getMerchantProfileId();
    
    const name = formData.get("name") as string;
    const category = formData.get("category") as "GALON" | "GAS" | "LAUNDRY";
    const price = parseInt(formData.get("price") as string);
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name || !category || isNaN(price)) {
      return { error: "Semua kolom wajib diisi dengan benar." };
    }

    let imageUrl = null;
    
    // Upload gambar ke Vercel Blob jika ada
    if (imageFile && imageFile.size > 0) {
      try {
        const { put } = await import("@vercel/blob");
        const blob = await put(imageFile.name, imageFile, { 
          access: "public",
          addRandomSuffix: true,
        });
        imageUrl = blob.url;
      } catch (err) {
        console.error("Gagal mengunggah gambar:", err);
        return { error: "Gagal mengunggah gambar. Pastikan BLOB_READ_WRITE_TOKEN valid." };
      }
    }

    await prisma.product.create({
      data: {
        merchantId,
        name,
        category,
        price,
        description: description || null,
        imageUrl,
      }
    });

    revalidatePath("/merchant/products");
    revalidatePath("/customer/home", "layout");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Gagal menambahkan produk." };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const merchantId = await getMerchantProfileId();
    
    await prisma.product.deleteMany({
      where: {
        id: productId,
        merchantId, // Pastikan hanya bisa hapus milik sendiri
      }
    });
    
    revalidatePath("/merchant/products");
    revalidatePath("/customer/home", "layout");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Gagal menghapus produk" };
  }
}

export async function updateProduct(_prevState: any, formData: FormData) {
  let shouldRedirect = false;
  
  try {
    const merchantId = await getMerchantProfileId();

    const productId = formData.get("productId") as string;
    const name = formData.get("name") as string;
    const category = formData.get("category") as "GALON" | "GAS" | "LAUNDRY";
    const price = parseInt(formData.get("price") as string);
    const description = formData.get("description") as string;
    const isAvailable = formData.get("isAvailable") === "true";
    const imageFile = formData.get("image") as File | null;

    if (!productId || !name || !category || isNaN(price)) {
      return { error: "Semua kolom wajib diisi dengan benar." };
    }

    const existingProduct = await prisma.product.findFirst({
      where: { id: productId, merchantId },
    });

    if (!existingProduct) {
      return { error: "Produk tidak ditemukan." };
    }

    // Check if anything changed
    const hasChanges = 
      existingProduct.name !== name ||
      existingProduct.category !== category ||
      existingProduct.price !== price ||
      (existingProduct.description || "") !== (description || "") ||
      existingProduct.isAvailable !== isAvailable ||
      (imageFile && imageFile.size > 0);

    if (!hasChanges) {
      shouldRedirect = true;
    } else {
      let imageUrl = undefined;

      if (imageFile && imageFile.size > 0) {
        try {
          const { put } = await import("@vercel/blob");
          const blob = await put(imageFile.name, imageFile, {
            access: "public",
            addRandomSuffix: true,
          });
          imageUrl = blob.url;
        } catch (err) {
          console.error("Gagal mengunggah gambar:", err);
          return { error: "Gagal mengunggah gambar. Pastikan BLOB_READ_WRITE_TOKEN valid." };
        }
      }

      await prisma.product.updateMany({
        where: {
          id: productId,
          merchantId,
        },
        data: {
          name,
          category,
          price,
          description: description || null,
          isAvailable,
          ...(imageUrl && { imageUrl }),
        }
      });
      shouldRedirect = true;
    }
  } catch (error: any) {
    return { error: error.message || "Gagal memperbarui produk." };
  }

  if (shouldRedirect) {
    revalidatePath("/merchant/products");
    revalidatePath("/customer/home", "layout");
    redirect("/merchant/products");
  }
}

export async function toggleProductStatus(productId: string, isAvailable: boolean) {
  try {
    const merchantId = await getMerchantProfileId();
    
    await prisma.product.updateMany({
      where: {
        id: productId,
        merchantId,
      },
      data: {
        isAvailable,
      }
    });
    
    revalidatePath("/merchant/products");
    revalidatePath("/customer/home", "layout");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Gagal mengubah status produk" };
  }
}
