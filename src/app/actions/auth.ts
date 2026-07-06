"use server";

import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function logoutUser() {
  await signOut({ redirectTo: "/login" });
}

export async function loginUser(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    console.log("LOGIN ERROR TYPE:", (error as any).type);
    console.log("LOGIN ERROR NAME:", (error as any).name);
    console.log("LOGIN ERROR MESSAGE:", (error as any).message);
    
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau kata sandi salah." };
        default:
          return { error: `Terjadi kesalahan sistem saat login: ${error.type} | ${error.message}` };
      }
    }
    throw error; // Wajib melempar kembali error jika itu NEXT_REDIRECT
  }
}

export async function registerCustomer(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !phone || !address || !password) {
    return { error: "Semua kolom wajib diisi." };
  }

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findFirst({
      where: { email, deletedAt: null }
    });

    if (existingUser) {
      return {
        error: "Email sudah terdaftar. Silakan gunakan email lain atau login."
      };
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database dengan role CUSTOMER
    await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber: phone,
        address,
        password: hashedPassword,
        role: "CUSTOMER"
      }
    });
  } catch (error) {
    return { error: "Terjadi kesalahan pada server. Silakan coba lagi." };
  }

  // Jika sukses, redirect ke halaman login
  redirect("/login?registered=true");
}

export async function registerMerchant(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  
  const storeName = formData.get("storeName") as string;
  const area = formData.get("area") as string;
  const address = formData.get("address") as string;
  const description = formData.get("description") as string;

  if (!name || !email || !phone || !password || !storeName || !area || !address) {
    return { error: "Semua kolom wajib (kecuali deskripsi) harus diisi." };
  }

  try {
    const existingUser = await prisma.user.findFirst({ where: { email, deletedAt: null } });
    if (existingUser) {
      return { error: "Email sudah terdaftar. Silakan gunakan email lain atau login." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Gunakan Prisma Transaction untuk menyimpan User dan MerchantProfile sekaligus
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          phoneNumber: phone,
          address, // Alamat pemilik bisa disamakan dengan alamat toko untuk pendaftaran ini
          password: hashedPassword,
          role: "MERCHANT",
        },
      });

      await tx.merchantProfile.create({
        data: {
          userId: user.id,
          storeName,
          area,
          address,
          description: description || null,
          isApproved: false, // Menunggu persetujuan admin
          isOpen: false,
        },
      });
    });

  } catch (error) {
    return { error: "Terjadi kesalahan pada server saat mendaftarkan toko Anda." };
  }

  redirect("/login?registered=true");
}
