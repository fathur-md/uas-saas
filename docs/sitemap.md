# 🗺️ Sitemap — Daftar Halaman & Routing

> Dokumen ini berisi semua halaman yang akan dibangun, route-nya, dan deskripsi singkat.
> Disusun berdasarkan keputusan diskusi Phase 0.

---

## Ringkasan

| Section | Jumlah Halaman |
|---------|---------------|
| 🌐 Public | 4 |
| 👤 Customer | 5 |
| 🏪 Merchant | 6 |
| 🛡️ Admin | 7 |
| **Total** | **22** |

> Beberapa halaman punya pola serupa (list, detail, form) sehingga bisa pakai komponen yang sama.

---

## 🌐 Public (Tanpa Login)

| # | Halaman | Route | Deskripsi |
|---|---------|-------|-----------|
| P1 | Landing Page | `/` | Hero section, penjelasan platform, CTA daftar/login |
| P2 | Login | `/login` | Form login (email + password). Satu halaman untuk semua role — sistem deteksi role otomatis → redirect ke dashboard masing-masing |
| P3 | Register Customer | `/register` | Form: nama, email, password, nomor HP, alamat |
| P4 | Register Merchant | `/register/merchant` | Form: nama toko, email, password, nomor HP, alamat toko, area/kecamatan, kategori (galon/gas/laundry). Setelah daftar → status `pending` |

### Alur Public

```
Landing Page (/)
├── [Login] → /login → redirect per role
│   ├── Customer → /customer/home
│   ├── Merchant → /merchant/dashboard
│   └── Admin → /admin/dashboard
├── [Daftar Customer] → /register
└── [Daftar Merchant] → /register/merchant
```

---

## 👤 Customer (Setelah Login)

| # | Halaman | Route | Deskripsi |
|---|---------|-------|-----------|
| C1 | Beranda | `/customer/home` | Satu halaman bertahap: pilih area → pilih kategori → muncul daftar merchant (card: nama, rating, status buka/tutup) |
| C2 | Detail Merchant & Checkout | `/customer/merchant/:id` | Info toko, daftar produk + harga, dan langsung terintegrasi dengan form Checkout (pesan, alamat, metode bayar) |
| C3 | Riwayat & Detail Pesanan | `/customer/orders` | Daftar semua pesanan lengkap dengan detail produk, tracking status, dan form ulasan dalam satu halaman (Card Expand/List). |
| C4 | Pembayaran QRIS | `/customer/orders/:id/payment` | Halaman khusus untuk menscan kode QRIS merchant dan mengunggah bukti pembayaran via Vercel Blob. |
| C5 | Profil | `/customer/profile` | Edit nama, alamat, nomor HP |

### Alur Customer

```
Beranda (/customer/home)
├── Pilih area → pilih kategori → lihat daftar merchant
│   └── Klik merchant → Detail Merchant & Checkout (/customer/merchant/:id)
│       └── Konfirmasi → redirect ke Riwayat Pesanan
├── [Riwayat] → /customer/orders
│   ├── Klik "Selesaikan Pembayaran" → Pembayaran QRIS (/customer/orders/:id/payment)
│   └── Klik "Beri Review" (setelah completed langsung di card)
└── [Profil] → /customer/profile
```

---

## 🏪 Merchant (Setelah Login + Approved)

> **Catatan:** Jika merchant belum di-approve admin, semua halaman tetap tampil tapi **disabled/locked** dengan banner "Akun Anda sedang ditinjau admin".

| # | Halaman | Route | Deskripsi |
|---|---------|-------|-----------|
| M1 | Dashboard | `/merchant/dashboard` | Ringkasan: pesanan hari ini, total pesanan bulan ini, rating toko, status langganan |
| M2 | Daftar & Tambah Produk | `/merchant/products` | Menampilkan form tambah produk dan daftar produk sekaligus untuk efisiensi UX. |
| M3 | Edit Produk | `/merchant/products/:id/edit` | Form pre-filled data produk. Tombol hapus produk |
| M4 | Kelola Pesanan | `/merchant/orders` | Daftar sekaligus detail pesanan. Merchant bisa langsung terima/tolak, update status, dan melihat bukti bayar QRIS. |
| M5 | Profil Toko | `/merchant/profile` | Edit: nama toko, alamat, area/kecamatan, jam operasional, status buka/tutup, upload gambar QRIS, set ongkir |

### Alur Merchant

```
Dashboard (/merchant/dashboard)
├── [Produk] → /merchant/products
│   ├── Isi Form Tambah di halaman yang sama
│   └── Klik edit produk → /merchant/products/:id/edit → simpan/hapus → redirect ke daftar
├── [Pesanan] → /merchant/orders
│   ├── Terima / Tolak / Update status langsung di card
│   └── Lihat & Konfirmasi Pembayaran QRIS
└── [Profil Toko] → /merchant/profile
```

---

## 🛡️ Admin (Setelah Login)

> Akun admin di-seed saat setup database. Tidak ada register admin.

| # | Halaman | Route | Deskripsi |
|---|---------|-------|-----------|
| A1 | Dashboard | `/admin/dashboard` | Statistik: total customer, total merchant (aktif/pending), total pesanan, pesanan hari ini |
| A2 | Persetujuan Merchant | `/admin/merchants` | Daftar pendaftar merchant yang butuh di-approve/reject. |
| A3 | Detail Merchant | `/admin/merchants/:id` | Profil lengkap merchant, daftar produk, riwayat pesanan merchant |
| A4 | Kelola Semua User | `/admin/users` | Manajemen gabungan untuk semua user (Customer & Merchant) + fitur Soft Delete. |
| A5 | Detail Customer | `/admin/users/:id` | Profil lengkap customer dan riwayat pesanannya. |
| A6 | Monitoring Pesanan | `/admin/orders` | Daftar semua pesanan lintas-toko (master view). |
| A7 | Pengaturan | `/admin/settings` | Menampilkan informasi platform, statistik database, dan detail admin. |

### Alur Admin

```
Dashboard (/admin/dashboard)
├── [Persetujuan Merchant] → /admin/merchants
│   └── Klik detail → /admin/merchants/:id
├── [Semua User] → /admin/users
│   └── Klik detail customer → /admin/users/:id
├── [Semua Pesanan] → /admin/orders
└── [Pengaturan] → /admin/settings
```

---

## Navigasi

### Navbar / Sidebar per Role

**Public (belum login):**
- Logo + nama brand
- Login | Daftar

**Customer:**
- Logo
- Beranda | Pesanan | Profil
- Logout

**Merchant:**
- Logo
- Dashboard | Produk | Pesanan | Profil Toko
- Logout

**Admin:**
- Logo
- Dashboard | Merchant | Customer | Pesanan | Pengaturan
- Logout

---

## Catatan Komponen yang Bisa Dipakai Ulang

| Komponen | Dipakai di |
|----------|-----------|
| Form produk | M3 (tambah) & M4 (edit) — komponen sama, mode berbeda |
| Card merchant | C1 (daftar) — reusable |
| Card pesanan | C4, M5, A6 — pola serupa (info pesanan + status badge) |
| Detail pesanan | C5 & M6 — mirip, tapi beda tombol action |
| Tabel user | A4 (customer) & A2 (merchant) — pola serupa |
| Status badge | Semua halaman pesanan — komponen kecil reusable |
