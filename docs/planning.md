# 📋 Planning — SaaS Kebutuhan Rumah Tangga

> Dokumen ini merangkum hasil diskusi perencanaan proyek UAS.
> Akan terus di-update seiring diskusi berlanjut.

---

## 0.1 Ide / Tema SaaS

**Platform pencarian & pemesanan layanan kebutuhan rumah tangga.**

Sebuah marketplace yang menghubungkan **pelanggan** dengan **penyedia jasa lokal** untuk:

| Kategori | Contoh |
|----------|--------|
| 💧 Galon Air | Depot air minum isi ulang, galon branded (Aqua, Le Minerale, dll) |
| 🔥 Gas LPG | Agen gas 3kg, 12kg |
| 👕 Laundry | Laundry kiloan, satuan, express |

### Masalah yang Diselesaikan

- Langganan WA tutup → harus cari toko baru, ambil nomor, belum tentu antar
- Susah cari penyedia jasa yang **ready stock** & **bisa antar**
- Tidak ada tempat terpusat untuk cari & bandingkan harga layanan rumah tangga

### Nilai Utama

- ✅ Cari penyedia jasa terdekat yang bisa antar
- ✅ Langsung pesan lewat web tanpa simpan nomor WA satu-satu
- ✅ Kalau langganan tutup, langsung switch ke penyedia lain
- ✅ Harga & layanan transparan

---

## 0.2 Target Pengguna

| Role | Deskripsi |
|------|-----------|
| **Customer** | Masyarakat umum yang ingin pesan galon/gas/laundry |
| **Merchant** | Pemilik depot galon, agen gas, usaha laundry |
| **Admin** | Pengelola platform (approve merchant, monitoring) |

---

## 0.3 Scope

**Opsi C: 2 Sisi + Admin (Hybrid)**

| Role | Fungsi |
|------|--------|
| **Customer** | Cari, pesan, tracking pesanan |
| **Merchant** | Daftar toko, kelola produk & pesanan |
| **Admin** | Approve/reject merchant, monitoring |

Estimasi Rencana: ~12-15 halaman (Hasil Akhir: 27 halaman)

---

## 0.4 Fitur Inti (MVP)

### 👤 Customer

| # | Fitur | Deskripsi | Prioritas |
|---|-------|-----------|-----------|
| C1 | Register & Login | Daftar akun, login | Wajib |
| C2 | Beranda / Cari Jasa | Pilih area/kecamatan → lihat merchant di area itu, filter by kategori | Wajib |
| C3 | Detail Merchant | Lihat info toko, produk/layanan, harga, status buka/tutup, rating & review | Wajib |
| C4 | Buat Pesanan | Pilih produk → pilih metode bayar (COD/QRIS) → isi alamat → pesan | Wajib |
| C5 | Riwayat Pesanan | Lihat pesanan aktif & selesai, status tracking | Wajib |
| C6 | Beri Rating & Review | Setelah pesanan selesai, beri bintang (1-5) + ulasan teks | Wajib |
| C7 | Profil | Edit nama, alamat, nomor HP | Wajib |

### 🏪 Merchant

| # | Fitur | Deskripsi | Prioritas |
|---|-------|-----------|-----------|
| M1 | Register & Login | Daftar sebagai merchant (perlu approval admin) | Wajib |
| M2 | Dashboard | Ringkasan pesanan hari ini, statistik | Wajib |
| M3 | Kelola Produk/Layanan | CRUD produk (misal: Galon Aqua 19L — Rp20.000) | Wajib |
| M4 | Kelola Pesanan | Lihat pesanan masuk, terima/tolak, update status, konfirmasi pembayaran | Wajib |
| M5 | Profil Toko | Edit nama toko, alamat, area, jam operasional, status buka/tutup, upload QRIS, set ongkir | Wajib |

### 🛡️ Admin

| # | Fitur | Deskripsi | Prioritas |
|---|-------|-----------|-----------|
| A1 | Login | Login admin (akun di-seed) | Wajib |
| A2 | Approve Merchant | Lihat daftar pendaftar merchant, approve/reject | Wajib |
| A3 | Kelola Users | Lihat semua customer & merchant | Wajib |
| A4 | Monitoring Pesanan | Lihat semua transaksi | Opsional |
| A5 | Dashboard Statistik | Total user, merchant, pesanan | Opsional |

---

## 0.5 Keputusan Detail

### A. Pencarian Merchant

**Pilih area/kecamatan (dropdown)** — Customer pilih kecamatan → muncul merchant di area itu.

- Merchant punya field `area/kecamatan`
- Customer pilih dari dropdown daftar area yang tersedia

### B. Metode Pembayaran (Customer → Merchant)

**COD + QRIS Statis** — Customer pilih bayar tunai (COD) atau scan QRIS milik merchant.

**Flow COD:**
1. Customer pesan → pilih "COD"
2. Merchant antar → customer bayar tunai
3. Merchant klik "Sudah Dibayar"

**Flow QRIS:**
1. Customer pesan → pilih "QRIS"
2. App tampilkan gambar QRIS merchant
3. Customer scan & bayar via app bank sendiri (di luar platform)
4. Customer klik "Saya Sudah Dibayar"
5. Merchant cek rekening → klik "Konfirmasi Pembayaran"

**Syarat:** Jika merchant tidak upload QRIS → opsi QRIS tidak muncul, hanya COD.

### C. Pesanan per Merchant

**Satu pesanan = satu merchant.** Mau pesan dari merchant lain → buat pesanan baru.

### D. Delivery Fee

**Merchant pilih: gratis atau berbayar.**
- Merchant set `delivery_fee` di profil toko (bisa Rp0)
- Jika Rp0 → customer tidak lihat biaya tambahan
- Jika > Rp0 → muncul di checkout: subtotal + ongkir = total

### E. Rating & Review

**Rating bintang (1-5) + review teks.**
- Customer bisa beri rating setelah pesanan `completed`
- Di halaman detail merchant muncul rata-rata bintang + daftar review
- Di daftar merchant muncul: ⭐ 4.5 (23 review)

---

## 0.6 Revenue Model Platform

**Freemium SaaS:** Merchant mendapatkan 6 pesanan gratis setiap bulan. Jika melebihi kuota, merchant harus berlangganan sebesar Rp 29.000/bulan (atau Rp 290.000/tahun) kepada Admin untuk menerima pesanan tak terbatas tanpa potongan komisi transaksi.

> *Detail implementasi ditentukan saat database schema.*

---

## 0.7 Order Lifecycle

```
Customer pesan → Merchant terima/tolak → Diproses → Diantar → Selesai → Review
```

### Order Status

| Status | Keterangan |
|--------|------------|
| `pending` | Customer sudah pesan, menunggu respon merchant |
| `accepted` | Merchant terima pesanan |
| `rejected` | Merchant tolak pesanan |
| `processing` | Sedang diproses (cuci/isi galon/siapkan gas) |
| `delivering` | Sedang diantar |
| `completed` | Pesanan selesai |
| `cancelled` | Dibatalkan oleh customer atau sistem |

### Payment Status

| Status | Keterangan |
|--------|------------|
| `unpaid` | Belum bayar |
| `waiting_confirmation` | Customer klaim sudah bayar QRIS, merchant belum konfirmasi |
| `paid` | Pembayaran dikonfirmasi |

---

## 0.8 Batasan Scope (Yang TIDAK Dibuat)

| # | Fitur | Alasan |
|---|-------|--------|
| 1 | ❌ Payment gateway (Midtrans, Xendit) | Sudah pakai QRIS statis |
| 2 | ❌ Real-time GPS tracking pengiriman | Diganti Manual Status Tracking |
| 3 | ❌ Real-time chat (customer ↔ merchant) | Dihapus untuk fokus ke alur utama transaksi MVP |
| 4 | ❌ Push notification | Diganti dengan Cross-Invalidation Cache (Auto-Refresh Dasbor) |
| 5 | ❌ Multi-bahasa (i18n) | Cukup Bahasa Indonesia |
| 6 | ❌ Mobile app (native) / PWA | Akan dibangun sebagai PWA |
| 7 | ❌ Sistem promo / kupon / diskon | Bukan fitur inti |
| 8 | ❌ Auto-cancel pesanan (timeout) | Untuk MVP cukup manual |
| 9 | ❌ Multiple alamat per customer | Cukup 1 alamat, bisa edit saat pesan |

---

## 0.9 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** Neon DB (PostgreSQL)
- **Authentication:** Auth.js (NextAuth)
- **Deployment:** Vercel
- **ORM:** Prisma ORM
- **Image/File Hosting:** Vercel Blob

---

## 0.10 Sitemap

> **Telah selesai disusun.** Silakan lihat detail struktur routing aplikasi pada dokumen terpisah di `sitemap.md`.

---

## 0.11 Database Schema

> **Telah diimplementasikan menggunakan Prisma ORM.** Silakan lihat detail struktur tabel dan relasi pada dokumen terpisah di `database-schema.md` dan file aktual `prisma/schema.prisma`.

---

## 0.12 Nama Brand

**SiapSedia**
*Makna: Merchant selalu siap dan sedia memenuhi kebutuhan harian pengguna.*

---

## 📊 Perbandingan Rencana Awal vs Hasil Akhir (Source of Truth)

> Merupakan evaluasi pamungkas untuk membuktikan bahwa spesifikasi teknologi (Tech Stack) dan eksekusi platform sesuai dengan data fisik di `package.json`, `.env`, dan direktori fisik lainnya.

### 1. Evolusi Tech Stack (Berdasarkan `package.json`)
- **Rencana Awal:** Next.js 16, Tailwind v4, Prisma.
- **Hasil Akhir:** 
  - Menggunakan versi *bleeding-edge* **Next.js 16.2.10** dan **React 19.2.4**.
  - Tailwind CSS menggunakan arsitektur terbaru **v4 Alpha** (`@tailwindcss/postcss`).
  - ORM menggunakan **Prisma v7.8.0** dengan *adapter Serverless* (`@prisma/adapter-neon`).
  - Autentikasi dikonfigurasi menggunakan standar tertinggi saat ini: **Auth.js v5 beta** (`next-auth@5.0.0-beta.31`).

### 2. Infrastruktur Cloud (Berdasarkan `.env`)
- **Rencana Awal:** Neon DB dan Vercel Blob.
- **Hasil Akhir:** Integrasi sukses absolut. File `.env` memetakan dua jenis koneksi Neon secara bersamaan (koneksi reguler dan *connection pooler* khusus serverless) guna mencegah *bottleneck* koneksi. Parameter *environment* `BLOB_READ_WRITE_TOKEN` juga terpasang kokoh untuk sistem unggah bukti bayar (QRIS).

### 3. Optimalisasi Aset Media (Berdasarkan `public/`)
- Pada fase *planning* tidak disinggung mengenai konvensi format aset, namun pada rilis *production* (hasil akhir), logo utama aplikasi diekspor ke dalam format *Next-Gen* **WebP** (`logo.webp`) selain versi PNG reguler. Ini merupakan langkah drastis untuk mengompresi *size* gambar dan mendongkrak performa skor Lighthouse.

### 4. Konsistensi Batasan MVP (Tercapai 100%)
- Janji pembatasan *Scope MVP* ditepati dengan akurasi maksimal. Ketiadaan gerbang pembayaran otomatis (*payment gateway* pihak ketiga seperti Midtrans) direalisasikan dengan elegan lewat fungsi **Unggah Bukti Transfer QRIS**. Fitur ini terbukti menghemat biaya lisensi API bulanan tapi tetap mampu menjaga alur verifikasi transaksi yang modern bagi admin/merchant.
