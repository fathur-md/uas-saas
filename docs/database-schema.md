# 🗄️ Database Schema — SiapSedia

> Dokumen ini berisi struktur tabel database aplikasi SiapSedia (MVP).
> ORM: Prisma (PostgreSQL)

## Ringkasan Arsitektur

Aplikasi ini menggunakan pendekatan **Satu Tabel User** untuk mempermudah Autentikasi (menggunakan Auth.js). Pengguna dengan peran (role) Merchant akan memiliki profil tambahan yang disimpan di tabel `MerchantProfile` dengan relasi 1-to-1.

---

## Daftar Tabel & Relasi

### 1. Enums (Tipe Data Pilihan)

- `Role`: `CUSTOMER`, `MERCHANT`, `ADMIN`
- `ProductCategory`: `GALON`, `GAS`, `LAUNDRY`
- `OrderStatus`: `PENDING`, `ACCEPTED`, `PROCESSING`, `DELIVERING`, `COMPLETED`, `CANCELLED`, `REJECTED`
- `PaymentStatus`: `UNPAID`, `WAITING_CONFIRMATION`, `PAID`
- `SubscriptionStatus`: `FREE`, `PREMIUM`

### 2. `User` (Tabel Pusat Autentikasi)

- `id` (String, UUID, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (String)
- `phoneNumber` (String)
- `address` (String)
- `role` (Enum: `CUSTOMER`, `MERCHANT`, `ADMIN`, Default: `CUSTOMER`)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)
- `deletedAt` (DateTime, opsional) — _untuk soft delete oleh Admin_
- **Relasi:**
  - `MerchantProfile` (1-to-1)
  - `Order` (1-to-many, sebagai Customer)
  - `Review` (1-to-many, sebagai Customer)

### 3. `MerchantProfile` (Ekstensi User)

- `id` (String, UUID, Primary Key)
- `userId` (String, Unique, Foreign Key ke `User`)
- `storeName` (String)
- `address` (String)
- `area` (String) - _Kecamatan_
- `description` (String, opsional)
- `isOpen` (Boolean, Default: false)
- `isApproved` (Boolean, Default: false)
- `qrisImageUrl` (String, opsional)
- `deliveryFee` (Int, Default: 0)
- `subscriptionStatus` (Enum: `FREE`, `PREMIUM`, Default: `FREE`)
- `monthlyOrderCount` (Int, Default: 0)
- `lastOrderResetDate` (DateTime)
- **Relasi:**
  - `User` (1-to-1)
  - `Product` (1-to-many)
  - `Order` (1-to-many)
  - `Review` (1-to-many)

### 4. `Product`

- `id` (String, UUID, Primary Key)
- `merchantId` (String, Foreign Key ke `MerchantProfile`)
- `name` (String)
- `category` (Enum: `GALON`, `GAS`, `LAUNDRY`)
- `price` (Int)
- `description` (String, opsional)
- `isAvailable` (Boolean, Default: true)
- `imageUrl` (String, opsional)
- **Relasi:**
  - `MerchantProfile` (many-to-1)
  - `OrderItem` (1-to-many)

### 5. `Order`

- `id` (String, UUID, Primary Key)
- `customerId` (String, Foreign Key ke `User`)
- `merchantId` (String, Foreign Key ke `MerchantProfile`)
- `status` (Enum: `PENDING`, `ACCEPTED`, `PROCESSING`, `DELIVERING`, `COMPLETED`, `CANCELLED`, Default: `PENDING`)
- `paymentStatus` (Enum: `UNPAID`, `WAITING_CONFIRMATION`, `PAID`, Default: `UNPAID`)
- `paymentMethod` (String) - _Contoh: COD, QRIS_
- `paymentProofUrl` (String, opsional)
- `shippingAddress` (String)
- `notes` (String, opsional)
- `shippingCost` (Int, Default: 0)
- `totalAmount` (Int)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)
- **Relasi:**
  - `User` (many-to-1)
  - `MerchantProfile` (many-to-1)
  - `OrderItem` (1-to-many)
  - `Review` (1-to-1)

### 6. `OrderItem`

- `id` (String, UUID, Primary Key)
- `orderId` (String, Foreign Key ke `Order`)
- `productId` (String, Foreign Key ke `Product`)
- `quantity` (Int)
- `price` (Int) - _Harga dikunci saat transaksi_
- **Relasi:**
  - `Order` (many-to-1)
  - `Product` (many-to-1)

### 7. `Review`

- `id` (String, UUID, Primary Key)
- `orderId` (String, Unique, Foreign Key ke `Order`)
- `customerId` (String, Foreign Key ke `User`)
- `merchantId` (String, Foreign Key ke `MerchantProfile`)
- `rating` (Int)
- `comment` (String, opsional)
- `createdAt` (DateTime)
- **Relasi:**
  - `Order` (1-to-1)
  - `User` (many-to-1)
  - `MerchantProfile` (many-to-1)
