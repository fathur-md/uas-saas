import "dotenv/config";
import { PrismaClient, ProductCategory, OrderStatus, PaymentStatus, SubscriptionStatus } from "../src/generated/prisma/client";
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
  prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
} else {
  prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

async function main() {
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_SEED_PASSWORD belum diatur. Set env ini sebelum menjalankan seed.");
  }
  
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const commonPassword = await bcrypt.hash("password123", 10);

  console.log("🧹 Memulai proses Seeding Database SiapSedia (Comprehensive Demo Data)...");

  // ---------------------------------------------------------
  // 1. SEED ADMIN
  // ---------------------------------------------------------
  const admin = await prisma.user.upsert({
    where: { email: "admin@siapsedia.com" },
    update: {},
    create: {
      email: "admin@siapsedia.com",
      name: "Super Admin SiapSedia",
      password: hashedPassword,
      phoneNumber: "081234567890",
      address: "Kantor Pusat SiapSedia, Jakarta",
      role: "ADMIN"
    }
  });
  console.log(`✅ Admin siap: ${admin.email}`);

  // ---------------------------------------------------------
  // 2. SEED MERCHANTS
  // ---------------------------------------------------------
  
  // A. Merchant Premium (Sukses, Aktif, Ramai)
  const premiumMerchant = await prisma.user.upsert({
    where: { email: "premium@siapsedia.com" },
    update: {},
    create: {
      email: "premium@siapsedia.com",
      name: "Bapak Budi (Banyu Biru)",
      password: commonPassword,
      phoneNumber: "08111111111",
      address: "Jl. Sudirman No. 1, Jakarta Pusat",
      role: "MERCHANT",
      merchantProfile: {
        create: {
          storeName: "Depot Air & Gas Banyu Biru",
          area: "Jakarta Pusat",
          address: "Jl. Sudirman No. 1, Jakarta Pusat",
          description: "Agen resmi AQUA, Le Minerale, dan Gas Pertamina. Melayani pengantaran cepat 24 Jam!",
          isOpen: true,
          isApproved: true,
          deliveryFee: 0,
          subscriptionStatus: SubscriptionStatus.PREMIUM,
          monthlyOrderCount: 45,
          products: {
            create: [
              { name: "Galon AQUA (Isi Ulang Resmi)", category: ProductCategory.GALON, price: 21000, description: "AQUA asli tersegel rapat.", isAvailable: true },
              { name: "Galon Le Minerale", category: ProductCategory.GALON, price: 23000, description: "Galon sekali pakai.", isAvailable: true },
              { name: "Gas LPG 3Kg (Melon)", category: ProductCategory.GAS, price: 22000, description: "Gas melon subsidi khusus rumah tangga.", isAvailable: true },
              { name: "Gas Bright Gas 5.5Kg", category: ProductCategory.GAS, price: 95000, description: "Tabung gas warna pink.", isAvailable: true }
            ]
          }
        }
      }
    }
  });
  console.log(`✅ Merchant Premium siap: ${premiumMerchant.email}`);

  // B. Merchant Free (Baru mencapai limit, mengajukan langganan)
  const freeMerchant = await prisma.user.upsert({
    where: { email: "free@siapsedia.com" },
    update: {},
    create: {
      email: "free@siapsedia.com",
      name: "Ibu Ratna (Laundry)",
      password: commonPassword,
      phoneNumber: "08222222222",
      address: "Jl. Melati No. 4, Jakarta Selatan",
      role: "MERCHANT",
      merchantProfile: {
        create: {
          storeName: "Laundry Express Berkah",
          area: "Jakarta Selatan",
          address: "Jl. Melati No. 4, Jakarta Selatan",
          description: "Pakaian bersih, wangi, rapi. Siap antar jemput gratis untuk radius 2km.",
          isOpen: true,
          isApproved: true,
          deliveryFee: 5000,
          subscriptionStatus: SubscriptionStatus.FREE,
          monthlyOrderCount: 6, // Limit reached
          subscriptionRequest: {
            create: {
              status: "PENDING"
            }
          },
          products: {
            create: [
              { name: "Cuci Setrika (Per Kg)", category: ProductCategory.LAUNDRY, price: 7000, description: "Minimal 3kg.", isAvailable: true },
              { name: "Cuci Kering Saja (Per Kg)", category: ProductCategory.LAUNDRY, price: 5000, description: "Hanya cuci dan kering.", isAvailable: true },
              { name: "Cuci Satuan - Jas", category: ProductCategory.LAUNDRY, price: 25000, description: "Dry clean.", isAvailable: true }
            ]
          }
        }
      }
    }
  });
  console.log(`✅ Merchant Free siap: ${freeMerchant.email}`);

  // C. Merchant Baru (Menunggu Approval)
  const pendingMerchant = await prisma.user.upsert({
    where: { email: "pending@siapsedia.com" },
    update: {},
    create: {
      email: "pending@siapsedia.com",
      name: "Agus (Sembako Maju)",
      password: commonPassword,
      phoneNumber: "08333333333",
      address: "Jl. Kebon Jeruk No. 10",
      role: "MERCHANT",
      merchantProfile: {
        create: {
          storeName: "Toko Sembako Maju",
          area: "Jakarta Barat",
          address: "Jl. Kebon Jeruk No. 10",
          description: "Toko kelontong menyediakan gas dan air minum.",
          isOpen: false, // Cannot open until approved
          isApproved: false,
          deliveryFee: 2000,
          subscriptionStatus: SubscriptionStatus.FREE,
          products: {
            create: [
              { name: "Gas 3Kg", category: ProductCategory.GAS, price: 21500, description: "Ready stock", isAvailable: true }
            ]
          }
        }
      }
    }
  });
  console.log(`✅ Merchant Pending siap: ${pendingMerchant.email}`);

  // ---------------------------------------------------------
  // 3. SEED CUSTOMERS
  // ---------------------------------------------------------
  
  const customerAktif = await prisma.user.upsert({
    where: { email: "customer.aktif@siapsedia.com" },
    update: {},
    create: {
      email: "customer.aktif@siapsedia.com",
      name: "Andi Wijaya",
      password: commonPassword,
      phoneNumber: "08444444444",
      address: "Apartemen Sudirman Tower A Lt. 12",
      role: "CUSTOMER"
    }
  });
  console.log(`✅ Customer Aktif siap: ${customerAktif.email}`);

  const customerBaru = await prisma.user.upsert({
    where: { email: "customer.baru@siapsedia.com" },
    update: {},
    create: {
      email: "customer.baru@siapsedia.com",
      name: "Siti Aminah",
      password: commonPassword,
      phoneNumber: "08555555555",
      address: "Jl. Kamboja No. 99",
      role: "CUSTOMER"
    }
  });
  console.log(`✅ Customer Baru siap: ${customerBaru.email}`);

  // ---------------------------------------------------------
  // 4. MENGAMBIL ID UNTUK TRANSAKSI (ORDERS & REVIEWS)
  // ---------------------------------------------------------
  
  // Ambil profile dan product
  const premiumProfile = await prisma.merchantProfile.findUnique({ where: { userId: premiumMerchant.id }, include: { products: true } });
  const freeProfile = await prisma.merchantProfile.findUnique({ where: { userId: freeMerchant.id }, include: { products: true } });
  
  if (!premiumProfile || !freeProfile) throw new Error("Gagal mengambil merchant profile");

  const galonProduct = premiumProfile.products.find(p => p.name.includes("AQUA"))!;
  const gasProduct = premiumProfile.products.find(p => p.name.includes("LPG 3Kg"))!;
  const laundryProduct = freeProfile.products.find(p => p.category === "LAUNDRY")!;

  // Transaksi 1: Selesai & Diulas (Premium Merchant, COD)
  await prisma.order.create({
    data: {
      customerId: customerAktif.id,
      merchantId: premiumProfile.id,
      status: OrderStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
      paymentMethod: "COD",
      shippingAddress: customerAktif.address,
      notes: "Tolong diantar ke lantai 12 ya mas, titip sekuriti kalau saya tidak ada.",
      shippingCost: premiumProfile.deliveryFee,
      totalAmount: (galonProduct.price * 2) + premiumProfile.deliveryFee,
      orderItems: {
        create: [
          { productId: galonProduct.id, quantity: 2, price: galonProduct.price }
        ]
      },
      review: {
        create: {
          customerId: customerAktif.id,
          merchantId: premiumProfile.id,
          rating: 5,
          comment: "Mantap banget! Pengiriman super cepat dan penjual ramah."
        }
      }
    }
  });

  // Transaksi 2: Sedang Diantar (Premium Merchant, QRIS Belum Dikonfirmasi)
  await prisma.order.create({
    data: {
      customerId: customerBaru.id,
      merchantId: premiumProfile.id,
      status: OrderStatus.DELIVERING,
      paymentStatus: PaymentStatus.WAITING_CONFIRMATION,
      paymentMethod: "QRIS",
      paymentProofUrl: "https://example.com/fake-proof.png",
      shippingAddress: customerBaru.address,
      notes: "Cepat ya bang, gas habis lagi masak",
      shippingCost: premiumProfile.deliveryFee,
      totalAmount: gasProduct.price + premiumProfile.deliveryFee,
      orderItems: {
        create: [
          { productId: gasProduct.id, quantity: 1, price: gasProduct.price }
        ]
      }
    }
  });

  // Transaksi 3: Sedang Diproses (Laundry, COD)
  await prisma.order.create({
    data: {
      customerId: customerAktif.id,
      merchantId: freeProfile.id,
      status: OrderStatus.PROCESSING,
      paymentStatus: PaymentStatus.UNPAID,
      paymentMethod: "COD",
      shippingAddress: customerAktif.address,
      notes: "Ambil cucian di pos satpam, 3 kresek besar",
      shippingCost: freeProfile.deliveryFee,
      totalAmount: (laundryProduct.price * 5) + freeProfile.deliveryFee, // asumsikan 5kg
      orderItems: {
        create: [
          { productId: laundryProduct.id, quantity: 5, price: laundryProduct.price }
        ]
      }
    }
  });

  // Transaksi 4: Order Masuk / Pending (Premium Merchant, Menunggu Respon)
  await prisma.order.create({
    data: {
      customerId: customerBaru.id,
      merchantId: premiumProfile.id,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.UNPAID,
      paymentMethod: "COD",
      shippingAddress: customerBaru.address,
      notes: "",
      shippingCost: premiumProfile.deliveryFee,
      totalAmount: (galonProduct.price * 1) + premiumProfile.deliveryFee,
      orderItems: {
        create: [
          { productId: galonProduct.id, quantity: 1, price: galonProduct.price }
        ]
      }
    }
  });
  
  // Transaksi 5: Ditolak (Laundry, COD)
  await prisma.order.create({
    data: {
      customerId: customerBaru.id,
      merchantId: freeProfile.id,
      status: OrderStatus.REJECTED,
      paymentStatus: PaymentStatus.UNPAID,
      paymentMethod: "COD",
      shippingAddress: customerBaru.address,
      notes: "Nyuci bed cover",
      shippingCost: freeProfile.deliveryFee,
      totalAmount: laundryProduct.price * 2, 
      orderItems: {
        create: [
          { productId: laundryProduct.id, quantity: 2, price: laundryProduct.price }
        ]
      }
    }
  });

  console.log("✅ Berhasil membuat 5 sampel transaksi dengan berbagai status (Completed, Delivering, Processing, Pending, Rejected)");
  console.log("🎉 SEEDING SELESAI SEMPURNA! 🎉");
}

main()
  .catch((e) => {
    console.error("❌ Gagal melakukan seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
