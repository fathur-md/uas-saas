import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import ws from "ws";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error("Database URL tidak ditemukan di env");
}

let prisma: PrismaClient;

if (connectionString.includes("neon.tech")) {
  neonConfig.webSocketConstructor = ws;

  prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString })
  });
} else {
  prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString })
  });
}

async function main() {
  const adminEmail = "admin@siapsedia.com";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;

  console.log("Mulai proses Seeding Admin...");

  if (!adminPassword) {
    throw new Error(
      "ADMIN_SEED_PASSWORD belum diatur. Set env ini sebelum menjalankan seed."
    );
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {}, // Jangan ubah password jika sudah ada
    create: {
      email: adminEmail,
      name: "Super Admin SiapSedia",
      password: hashedPassword,
      phoneNumber: "081234567890",
      address: "Kantor Pusat SiapSedia, Jakarta",
      role: "ADMIN"
    }
  });
  console.log(`✅ Berhasil! Akun Admin siap digunakan: ${admin.email}`);

  // 1. Seed Merchant
  const merchantEmail = "toko@siapsedia.com";
  const merchantPassword = await bcrypt.hash("password123", 10);

  const merchant = await prisma.user.upsert({
    where: { email: merchantEmail },
    update: {},
    create: {
      email: merchantEmail,
      name: "Bapak Joko (Toko)",
      password: merchantPassword,
      phoneNumber: "081234567891",
      address: "Jl. Diponegoro No. 12",
      role: "MERCHANT",
      merchantProfile: {
        create: {
          storeName: "Toko Sembako Joko",
          area: "Jakarta Pusat",
          address: "Jl. Diponegoro No. 12",
          description: "Sedia galon AQUA, VIT, dan gas 3kg. Pengantaran cepat.",
          isOpen: true,
          isApproved: true,
          deliveryFee: 2000,
          subscriptionStatus: "FREE",
          products: {
            create: [
              {
                name: "Galon AQUA (Isi Ulang)",
                category: "GALON",
                price: 20000,
                description: "Air mineral AQUA asli isi ulang.",
                isAvailable: true
              },
              {
                name: "Gas LPG 3Kg",
                category: "GAS",
                price: 22000,
                description: "Gas LPG melon khusus keperluan dapur tangga.",
                isAvailable: true
              }
            ]
          }
        }
      }
    }
  });
  console.log(`✅ Berhasil! Akun Merchant siap digunakan: ${merchant.email} (Password: password123)`);

  // 2. Seed Customer
  const customerEmail = "budi@siapsedia.com";
  const customerPassword = await bcrypt.hash("password123", 10);

  const customer = await prisma.user.upsert({
    where: { email: customerEmail },
    update: {},
    create: {
      email: customerEmail,
      name: "Budi Santoso",
      password: customerPassword,
      phoneNumber: "081234567892",
      address: "Jl. Sudirman No. 45, Apartemen",
      role: "CUSTOMER"
    }
  });
  console.log(`✅ Berhasil! Akun Pelanggan siap digunakan: ${customer.email} (Password: password123)`);
}

main()
  .catch((e) => {
    console.error("❌ Gagal melakukan seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
