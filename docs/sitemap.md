# 🗺️ Sitemap — Daftar Halaman & Routing

> Dokumen ini berisi semua halaman yang akan dibangun, route-nya, dan deskripsi singkat.
> Disusun berdasarkan keputusan diskusi Phase 0.

---

## Ringkasan

| Section | Jumlah Halaman |
|---------|---------------|
| 🌐 Public | 4 |
| 👤 Customer | 6 |
| 🏪 Merchant | 7 |
| 🛡️ Admin | 6 |
| **Total** | **23** |

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
| C2 | Detail Merchant | `/customer/merchant/:id` | Info toko, daftar produk + harga, status buka/tutup, rata-rata rating ⭐, daftar review, tombol "Pesan" |
| C3 | Checkout | `/customer/order/new?merchant=:id` | Ringkasan produk, isi/konfirmasi alamat, pilih metode bayar (COD/QRIS), tombol "Konfirmasi Pesanan" |
| C4 | Riwayat Pesanan | `/customer/orders` | Daftar semua pesanan (card: merchant, tanggal, status, total), filter by status |
| C5 | Detail Pesanan | `/customer/orders/:id` | Detail lengkap: produk, status tracking, metode bayar, tombol "Saya Sudah Bayar" (jika QRIS + unpaid), tombol "Beri Review" (jika completed + belum review) |
| C6 | Profil | `/customer/profile` | Edit nama, alamat, nomor HP |

### Alur Customer

```
Beranda (/customer/home)
├── Pilih area → pilih kategori → lihat daftar merchant
│   └── Klik merchant → Detail Merchant (/customer/merchant/:id)
│       └── Klik "Pesan" → Checkout (/customer/order/new?merchant=:id)
│           └── Konfirmasi → redirect ke Detail Pesanan
├── [Riwayat] → /customer/orders
│   └── Klik pesanan → Detail Pesanan (/customer/orders/:id)
│       ├── Klik "Saya Sudah Bayar" (QRIS)
│       └── Klik "Beri Review" (setelah completed)
└── [Profil] → /customer/profile
```

---

## 🏪 Merchant (Setelah Login + Approved)

> **Catatan:** Jika merchant belum di-approve admin, semua halaman tetap tampil tapi **disabled/locked** dengan banner "Akun Anda sedang ditinjau admin".

| # | Halaman | Route | Deskripsi |
|---|---------|-------|-----------|
| M1 | Dashboard | `/merchant/dashboard` | Ringkasan: pesanan hari ini, total pesanan bulan ini, rating toko, status langganan |
| M2 | Daftar Produk | `/merchant/products` | Daftar produk milik merchant (card/tabel: nama, harga, status), tombol tambah produk |
| M3 | Tambah Produk | `/merchant/products/new` | Form: nama produk, harga, deskripsi, status tersedia/habis |
| M4 | Edit Produk | `/merchant/products/:id/edit` | Form yang sama dengan M3, pre-filled data produk. Tombol hapus produk |
| M5 | Daftar Pesanan | `/merchant/orders` | Daftar pesanan masuk, filter by status (pending/accepted/processing/delivering/completed) |
| M6 | Detail Pesanan | `/merchant/orders/:id` | Detail: info customer, produk dipesan, alamat antar, metode bayar. Tombol: terima/tolak (jika pending), update status, "Konfirmasi Pembayaran" (jika QRIS waiting) |
| M7 | Profil Toko | `/merchant/profile` | Edit: nama toko, alamat, area/kecamatan, jam operasional, status buka/tutup, upload gambar QRIS, set ongkir (Rp0 = gratis) |

### Alur Merchant

```
Dashboard (/merchant/dashboard)
├── [Produk] → /merchant/products
│   ├── Klik "Tambah" → /merchant/products/new → simpan → redirect ke daftar
│   └── Klik produk → /merchant/products/:id/edit → simpan/hapus → redirect ke daftar
├── [Pesanan] → /merchant/orders
│   └── Klik pesanan → /merchant/orders/:id
│       ├── Terima / Tolak (jika pending)
│       ├── Update status (processing → delivering → completed)
│       └── Konfirmasi Pembayaran (jika QRIS waiting_confirmation)
└── [Profil Toko] → /merchant/profile
```

---

## 🛡️ Admin (Setelah Login)

> Akun admin di-seed saat setup database. Tidak ada register admin.

| # | Halaman | Route | Deskripsi |
|---|---------|-------|-----------|
| A1 | Dashboard | `/admin/dashboard` | Statistik: total customer, total merchant (aktif/pending), total pesanan, pesanan hari ini |
| A2 | Kelola Merchant | `/admin/merchants` | Daftar semua merchant dengan **tab filter**: Semua \| Pending \| Aktif \| Rejected. Tombol approve/reject langsung di list (untuk pending) |
| A3 | Detail Merchant | `/admin/merchants/:id` | Profil lengkap merchant, daftar produk, riwayat pesanan merchant |
| A4 | Kelola Customer | `/admin/customers` | Daftar semua customer (nama, email, HP, tanggal daftar) |
| A5 | Detail Customer | `/admin/customers/:id` | Profil lengkap customer, riwayat pesanan |
| A6 | Monitoring Pesanan | `/admin/orders` | Daftar semua pesanan dari semua merchant, filter by status *(opsional)* |

### Alur Admin

```
Dashboard (/admin/dashboard)
├── [Merchant] → /admin/merchants
│   ├── Tab: Pending → approve/reject langsung
│   └── Klik merchant → /admin/merchants/:id (detail lengkap)
├── [Customer] → /admin/customers
│   └── Klik customer → /admin/customers/:id (detail lengkap)
└── [Pesanan] → /admin/orders (opsional)
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
- Dashboard | Merchant | Customer | Pesanan
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
