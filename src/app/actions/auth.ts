"use server";

import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function logoutUser() {
  await signOut({ redirectTo: "/login" });
}

export async function loginUser(_prevState: any, formData: FormData) {
  try {
    // Tentukan URL redirect spesifik berdasarkan role untuk mencegah double-redirect middleware
    const email = formData.get("email") as string;
    const user = await prisma.user.findFirst({
      where: { email, deletedAt: null }
    });
    
    let redirectTo = "/";
    if (user) {
      if (user.role === 'CUSTOMER') redirectTo = "/customer/home";
      if (user.role === 'MERCHANT') redirectTo = "/merchant/dashboard";
      if (user.role === 'ADMIN') redirectTo = "/admin/dashboard";
    }
    
    formData.append("redirectTo", redirectTo);

    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau kata sandi salah." };
        default:
          return {
            error: `Terjadi kesalahan sistem saat login: ${error.type} | ${error.message}`
          };
      }
    }
    throw error; // Wajib melempar kembali error jika itu NEXT_REDIRECT
  }
}

export async function registerCustomer(_prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !phone || !address || !password) {
    return { error: "Semua kolom wajib diisi." };
  }
  
  if (password.length < 8) {
    return { error: "Password minimal 8 karakter." };
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

export async function registerMerchant(_prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  const storeName = formData.get("storeName") as string;
  const area = formData.get("area") as string;
  const address = formData.get("address") as string;
  const description = formData.get("description") as string;

  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !storeName ||
    !area ||
    !address
  ) {
    return { error: "Semua kolom wajib (kecuali deskripsi) harus diisi." };
  }
  
  if (password.length < 8) {
    return { error: "Password minimal 8 karakter." };
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: { email, deletedAt: null }
    });
    if (existingUser) {
      return {
        error: "Email sudah terdaftar. Silakan gunakan email lain atau login."
      };
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
          role: "MERCHANT"
        }
      });

      await tx.merchantProfile.create({
        data: {
          userId: user.id,
          storeName,
          area,
          address,
          description: description || null,
          isApproved: false, // Menunggu persetujuan admin
          isOpen: false
        }
      });
    });
  } catch (error) {
    return {
      error: "Terjadi kesalahan pada server saat mendaftarkan toko Anda."
    };
  }

  redirect("/login?registered=true");
}
