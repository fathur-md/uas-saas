import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

// Ambil koneksi database
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

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
}

main()
  .catch((e) => {
    console.error("❌ Gagal melakukan seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
