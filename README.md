# 🛒 SiapSedia — SaaS Marketplace Kebutuhan Rumah Tangga

![Next.js 16](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Neon Serverless](https://img.shields.io/badge/Neon_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=black)

**SiapSedia** adalah platform _Hyperlocal Marketplace_ berbasis Software as a Service (SaaS) yang dikembangkan sebagai Tugas Akhir/UAS mata kuliah Pemrograman Web. Aplikasi ini menjembatani pelanggan (Customer) dengan penyedia jasa lokal (Merchant) seperti penjual Galon, Gas LPG, dan Jasa Laundry.

---

## 🔗 Tautan Penting

- **🟢 Aplikasi Live (Vercel):** [https://uas-saas.vercel.app/](https://uas-saas.vercel.app/)
- **🎥 Video Presentasi:** `[On Progress]`
- **📄 Dokumentasi Perencanaan:** Cek folder `/docs` di repository ini.

---

## 🏗️ Arsitektur & Teknologi

Proyek ini menggunakan _tech stack bleeding-edge_ dengan pemisahan _concern_ yang tegas (Pola `src/app`):

- **Frontend & Backend (Fullstack):** Next.js 16.2 (App Router) + React 19
- **Otentikasi:** Auth.js v5 Beta (Role-Based JWT via Edge Middleware)
- **Database & ORM:** PostgreSQL (Neon Serverless) + Prisma ORM v7
- **Styling:** Tailwind CSS v4 Alpha
- **State Management (Server):** React Server Components (RSC) + Server Actions + Cross-Invalidation Cache

---

## 🔑 Kredensial Pengujian (Demo)

Gunakan akun berikut untuk meninjau masing-masing _role_ di aplikasi:

| Peran                  | Email                          | Kata Sandi    | Deskripsi Akses                                     |
| ---------------------- | ------------------------------ | ------------- | --------------------------------------------------- |
| **Admin**              | `admin@siapsedia.com`          | `Admin123`    | Master Dasbor, Approve Merchant, Soft-delete user   |
| **Merchant (Premium)** | `premium@siapsedia.com`        | `password123` | Toko "Depot Air Banyu Biru", Terima/Tolak pesanan   |
| **Merchant (Gratis)**  | `free@siapsedia.com`           | `password123` | Toko gratis, menunjukkan batasan limit SaaS         |
| **Customer**           | `customer.aktif@siapsedia.com` | `password123` | Pengguna biasa untuk mencari toko & membuat pesanan |

---

## 🚀 Panduan Menjalankan di Komputer Lokal

Jika Anda ingin menjalankan proyek ini secara lokal, ikuti langkah berikut:

### 1. Kloning Repositori & Instalasi

```bash
git clone https://github.com/fathur-md/uas-saas.git
cd uas-saas
npm install
```

### 2. Konfigurasi Environment

Salin file konfigurasi contoh:

```bash
cp .env.example .env
```

Isi file `.env` dengan kredensial database Neon Anda (`DATABASE_URL` dan `DIRECT_URL`) serta variabel rahasia NextAuth.

### 3. Setup Database & Seed Data

Lakukan sinkronisasi skema database dan jalankan _seeder_ untuk mengisi data awal (dummy):

```bash
npx prisma db push --force-reset
npm run db:seed
```

### 4. Jalankan Server Dev

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---
