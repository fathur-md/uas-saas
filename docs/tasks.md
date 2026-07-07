# 📋 Tasks — Project Workflow & Tracking

> Dokumen ini adalah **pusat kendali** proyek.
> Berisi aturan kerja, checklist per fase, dan log perubahan.
> Dirancang agar **fleksibel** — jika ide/scope berubah, alur kerja tetap sama.

---

## Aturan Kerja

### Prinsip

1. **Selalu mulai dari docs** — Jangan coding sebelum planning jelas
2. **Update tasks.md** — Tandai progress setiap selesai mengerjakan sesuatu
3. **Catat keputusan** — Setiap perubahan besar dicatat di [Log Keputusan](#log-keputusan)
4. **Satu fase, satu fokus** — Selesaikan fase sekarang sebelum lanjut ke fase berikutnya

### Konvensi Status

| Simbol | Arti                    |
| ------ | ----------------------- |
| `[ ]`  | Belum dikerjakan        |
| `[/]`  | Sedang dikerjakan       |
| `[x]`  | Selesai                 |
| `[-]`  | Dibatalkan / tidak jadi |

### Jika Ada Perubahan Ide / Scope

1. Catat alasan perubahan di [Log Keputusan](#log-keputusan)
2. Update `planning.md` dengan ide/scope baru
3. Review ulang fase yang terdampak di checklist bawah
4. Tandai task yang tidak relevan dengan `[-]`
5. Tambah task baru jika perlu

---

## Fase & Checklist

### Fase 0 — Planning & Research

> **Tujuan:** Semua keputusan desain sudah jelas sebelum mulai coding.
> **Output:** `planning.md`, `sitemap.md`, `database-schema.md` lengkap.

- [x] 0.1 — Tentukan ide / tema SaaS ✅ Marketplace kebutuhan rumah tangga (galon/gas/laundry)
- [x] 0.2 — Tentukan target pengguna & role ✅ Customer, Merchant, Admin
- [x] 0.3 — Tentukan scope (opsi A/B/C) ✅ Opsi C (2 sisi + admin)
- [x] 0.4 — Definisi fitur inti (MVP) per role ✅ Lengkap dengan detail klarifikasi
- [x] 0.5 — Tentukan batasan scope (apa yang TIDAK termasuk) ✅ 9 item dicoret
- [x] 0.6 — Buat sitemap (daftar halaman + routing) ✅ Selesai, total 23 halaman terstruktur
- [x] 0.7 — Brainstorm nama brand ✅ Dipilih: SiapSedia
- [x] 0.8 — Tentukan tech stack ✅ Next.js 16, Tailwind v4, Prisma, Neon DB, Vercel Blob
- [x] 0.9 — Desain database schema (tabel, relasi) → `database-schema.md` ✅ Selesai, tersimpan di prisma/schema.prisma
- [x] 0.10 — Review akhir: semua docs lengkap & konsisten ✅ Fase 0 Selesai!

---

### Fase 1 — Project Setup

> **Tujuan:** Fondasi project siap, bisa langsung develop fitur.
> **Output:** Project berjalan di localhost, database terhubung.

- [x] 1.1 — Inisialisasi project (framework) ✅ Next.js 16 & Tailwind v4 terinstal
- [x] 1.2 — Setup database & buat tabel ✅ Sinkronisasi Prisma db push berhasil
- [x] 1.3 — Setup environment variables ✅ Prisma dev dan Neon DB ready
- [x] 1.4 — Setup design system (warna, font, layout dasar) ✅ Selesai (Neutral Wireframe, Inter font)
- [x] 1.5 — Buat layout/template utama (navbar, sidebar, footer) ✅ Selesai (Layout Public & Dashboard)
- [x] 1.6 — Verifikasi: app jalan di localhost ✅ Berhasil (localhost:3000 berjalan lancar)

---

### Fase 2 — Core Development

> **Tujuan:** Semua fitur wajib berfungsi.
> **Output:** App bisa di-demo end-to-end.
>
> _Detail task diisi setelah Fase 0 selesai, berdasarkan fitur di `planning.md`._

#### Auth & User Management

- [x] 2.1 — Setup Auth.js (Instalasi & Konfigurasi Inti)
- [x] 2.2 — Register (customer)
- [x] 2.3 — Register (merchant, dengan approval flow)
- [x] 2.4 — Login / Logout & Middleware (Role-Based Routing)
- [x] 2.5 — Seed akun admin

#### Customer Features

- [x] 2.6 — Pencarian Merchant & Filter (Kategori/Area)
- [x] 2.7 — Halaman Detail Merchant & Produk
- [x] 2.8 — Checkout Pesanan (Buy Now) dengan COD/QRIS
- [x] 2.9 — Riwayat Pesanan & Form Ulasan (Bintang & Teks)

#### Merchant Features

- [x] 2.10 — Manajemen Produk (Tambah, Hapus, Ubah Ketersediaan)
- [x] 2.11 — Manajemen Pesanan (State Machine: Pending -> Accepted -> Processing -> Delivering -> Completed)

#### Admin Features

- [x] 2.12 — Persetujuan Merchant (Approve / Reject)
- [x] 2.13 — Kelola Users Gabungan (Soft Delete Customer & Merchant)
- [x] 2.14 — Monitoring Semua Pesanan
- [x] 2.15 — Detail Merchant Profile & Produk
- [x] 2.16 — Detail Customer & Riwayat Pesanan

---

### Fase 3 — Polish & UX

> **Tujuan:** App terasa premium, tidak terlihat "tugas kuliah".
> **Output:** UI responsif, smooth, dan konsisten.

- [x] 3.1 — Responsive design (mobile & tablet)
- [x] 3.2 — Loading states & skeleton
- [x] 3.3 — Error handling & pesan error user-friendly
- [x] 3.4 — Animasi & micro-interactions
- [x] 3.5 — SEO (meta tags, title, description)

---

### Fase 4 — Deployment

> **Tujuan:** Website bisa diakses online.
> **Output:** URL publik yang bisa dikasih ke dosen.

- [x] 4.1 — Build production ✅ Berhasil tanpa error
- [x] 4.2 — Deploy ke hosting (Vercel/Netlify/Cloudflare) ✅ Berhasil deploy dan terkoneksi ke Neon DB
- [x] 4.3 — Test semua fitur di production ✅ Berhasil login Super Admin di Vercel
- [x] 4.4 — Pastikan semua fitur terbuka (tanpa paywall) ✅ Siap untuk dosen

---

### Fase 5 — Dokumentasi & Presentasi

> **Tujuan:** Deliverables siap dikumpulkan.
> **Output:** PDF + video YouTube.

- [ ] 5.1 — Buat dokumentasi PDF (gambaran program + URL)
- [ ] 5.2 — Rekam video presentasi (maks 10 menit, tampilkan wajah)
- [ ] 5.3 — Upload video ke YouTube (unlisted)
- [ ] 5.4 — Final check: semua ketentuan assignment terpenuhi ✓

---

## Validasi Ketentuan UAS

> Checklist ini di-review di akhir sebelum pengumpulan.

- [ ] ✅ Studi kasus nyata & menyelesaikan masalah → lihat `planning.md`
- [ ] ✅ Semua fitur terbuka untuk penilaian
- [ ] ✅ Bahasa pemrograman web
- [ ] ✅ Bisa diakses online (URL: **___**)
- [ ] ✅ Pakai database
- [ ] ✅ Dokumentasi PDF
- [ ] ✅ Video presentasi (YouTube: **___**)

---

## Log Keputusan & Arsitektur

> Ringkasan keputusan penting terkait fitur, desain (UI/UX), dan teknis yang mendasari aplikasi SiapSedia, beserta alasan di baliknya.

### 🚀 Bisnis Model & Scope Fitur

- **Marketplace "SiapSedia" (Opsi C)**: Membangun model dua sisi (Customer ↔ Merchant) + dasbor Admin.
  - **Alasan:** Format ini menyajikan solusi lengkap (end-to-end) bagi masalah keseharian lokal (Galon, Gas, Laundry).
- **Monetisasi (Freemium)**: Merchant gratis 6 pesanan pertama setiap bulan, langganan unlimited Rp 29.000/bulan.
  - **Alasan:** Menjawab prasyarat model "SaaS" dengan harga yang mudah dijangkau oleh UMKM, memberikan Return of Investment (ROI) instan, tanpa memberatkan pengguna di awal.
- **MVP Boundaries (Batasan Fitur)**: Transaksi manual (COD & QRIS), 1 pesanan = 1 toko, tanpa live chat.
  - **Alasan:** Mencegah _scope creep_ (proyek melebar tanpa ujung). Fokus pada inti masalah pencarian dan pemesanan. QRIS Manual dipilih karena menghemat biaya integrasi API Payment Gateway tapi tetap terlihat modern.
- **Strategi Akuisisi Mitra**: Membuat landing page terpisah `/mitra`.
  - **Alasan:** Memisahkan perjalanan pengguna (Customer Journey) agar beranda utama murni untuk berjualan, sementara calon Merchant mendapatkan presentasi bisnis (Pricing & Benefit) yang lebih leluasa dan berkelas.

### 🎨 Keputusan Desain & UI/UX

- **Desain Seamless & Konsolidasi Halaman**: Menggabungkan halaman list (daftar) dan form create/edit dalam satu tampilan.
  - **Alasan:** Mencegah kelelahan pengguna akibat perpindahan rute terus-menerus (full-page reload) dan menciptakan UX layaknya aplikasi _Native_ (SPA).
- **Prioritas Mobile-First**: Menerapkan *Desktop Sidebar* yang elegan dan *Mobile Hamburger Menu* (Slide-out Drawer) yang seragam untuk Customer, Merchant, maupun Admin.
  - **Alasan:** Memastikan navigasi tetap konsisten dan responsif bagi target audiens utama (rumah tangga) yang 90% akan mengakses melalui _smartphone_ / HP tanpa mengorbankan ruang layar.
- **Light Mode Terkunci**: Menghapus properti `dark:` bawaan Tailwind di seluruh kerangka UI.
  - **Alasan:** Menjamin konsistensi estetika. Mencegah UI pecah atau gelap sebagian saat setting _device_ pengguna berada di Mode Gelap (Dark Mode).
- **Graceful Error Handling (Anti-Crash)**: Membungkus mutasi _Server Actions_ via aksi sisi klien (`useTransition`) alih-alih tag form murni HTML.
  - **Alasan:** Lemparan error bawaan `throw new Error()` pada Next.js akan memicu layar putih (_crash_ global). Dengan `useTransition`, jika server gagal (misal koneksi putus), pengguna hanya melihat notifikasi _alert_ kecil dan UI tetap utuh.
- **Flexbox Safeties**: Menyuntikkan `min-w-0` pada flex container dan memindahkan _breakpoint_ grid ke `xl:grid-cols-2`.
  - **Alasan:** Mencegah _bug_ memanjangnya tombol "Pesan" hingga tumpah (_overflow_) di layar ukuran tanggung (tablet lanskap). Ini mengatasi tabrakan hukum tata letak asli Flexbox dengan batasan teks.

### 🏗️ Arsitektur Teknologi (Backend)

- **Teknologi Inti**: Next.js 16 (App Router), React 19, Tailwind v4, Prisma ORM, Neon Postgres Serverless.
  - **Alasan:** Merupakan standar industri paling mutakhir. Memungkinkan skalabilitas _fullstack_ tingkat tinggi (UI dan Backend tergabung) tanpa harus menyewa server Node/Express terpisah, sangat ideal untuk level kampus.
- **Cross-Invalidation Cache (revalidatePath)**: Menyegarkan rute `/customer` ketika Merchant melakukan aksi status pesanan, dan sebaliknya.
  - **Alasan:** Next.js RSC menangkap _cache_ dengan sangat agresif. Tanpa invalidasi silang, Dasbor pesanan tidak akan ter-update secara _real-time_ kecuali Merchant me-refresh browser secara manual.
- **Role-Based Auth via Middleware Edge**: Perlindungan rute diproses via JWT token dan dicegat di `proxy.ts` (Middleware).
  - **Alasan:** Mencegah eskalasi peretasan. Customer tidak akan bisa menyusup ke `/merchant` (lewat modifikasi URL) karena middleware langsung memblokirnya di _edge network_ sebelum halaman mulai diproses oleh server, meningkatkan keamanan ganda.

---

## Log Masalah & Solusi (Knowledge Base)

> Catatan isu teknis kritis yang ditemui selama fase _development_ beserta cara mitigasinya, berguna sebagai dokumentasi teknis dan referensi jika _bug_ berulang.

| Isu Kritis & Gejala                                                    | Akar Masalah                                                                                                                                                                                            | Solusi & Mitigasi                                                                                                                                                                                                    |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PrismaClientValidationError** (Tabel DB tidak terbaca pasca migrasi) | Agresivitas _cache_ lokal milik Next.js 16 Turbopack (`.next`). Perubahan Prisma schema pasca `npx prisma db push` tidak dimuat ulang oleh server pengembangan.                                         | Mengalihkan sementara _output_ Prisma ke direktori baru (mis: `prisma_v2`), menghentikan _server_, menghapus folder `.next`, dan me-restart ulang `npm run dev`.                                                     |
| **Aplikasi Layar Putih (Crash)** saat menolak/membatalkan pesanan      | Kode Next.js secara _default_ akan melempar _Unhandled Error Boundary_ bila sebuah Server Action yang dijalankan di dalam `<form>` melempar _exception/throw Error()_.                                  | Mengubah _return type_ dari setiap Server Action menjadi `{ error: string }`. Aksi `<form>` diganti menjadi event interaktif klien (`useTransition`) yang menangkap objek `error` secara elegan tanpa meledakkan UI. |
| **Stale Data (Data Pesanan Usang)** di layar Dasbor                    | RSC Payload Next.js menangkap respons statis secara default. Mutasi status pesanan dari sisi _Customer_ tidak memaksa _router_ pada rute Merchant untuk disetel ulang.                                  | Implementasi invalidasi proaktif lewat `revalidatePath('/merchant/orders')` di dalam server action milik sisi _Customer_, begitupun sebaliknya (Cross-Invalidation Cache).                                           |
| **Overflow & Tombol Patah** di ukuran tablet (1024px - 1100px)         | _Grid 2 kolom_ membuat pembungkus Flexbox kekurangan ruang, diperburuk dengan karakter asli Flexbox yang menolak menyusut (_shrink_) jika menabrak teks statis (teks panjang yang tak bisa dipatahkan). | Menyuntikkan `min-w-0` pada induk _Flex_ untuk melemahkan batasan konten, mengganti _breakpoint grid_ dari `lg` ke `xl` (1280px), dan menetapkan utilitas `truncate`.                                                |
| **Peringatan: `params` should be awaited** pada Next.js 16             | Pada Next.js versi 15+ ke atas (App Router), `params` dan `searchParams` diubah secara fundamental menjadi operasi asinkron (_Promise_).                                                                | Merestrukturisasi tipe _props_ di setiap halaman dinamis menjadi asinkron (`props: { params: Promise<{ id: string }> }`) dan menyisipkan `const params = await props.params`.                                        |
| **Kebocoran Hard Delete** saat menghapus Merchant                      | Eksekusi penghapusan `User` (Merchant) oleh Admin memicu efek berantai (`CASCADE DELETE`) pada Prisma, yang secara permanen menghapus data `Order` dan `Review` yang terkait dengan merchant tersebut.  | Mengganti mekanisme menjadi _Soft Delete_. Menambahkan kolom `deletedAt` di tabel `User`. Alih-alih menghapus data utuh, profil hanya disembunyikan agar riwayat pesanan (Customer) tetap aman.                      |
| **Akses Rute Ilegal (Bypass Role)**                                    | Pengguna yang sudah login sebagai Customer berpotensi mencoba mengakses rute `/merchant` dengan mengetik URL secara manual di browser.                                                                  | Membangun proxy otorisasi di dalam `middleware` via `auth.config.ts`. Melakukan injeksi `role` ke dalam JWT, sehingga rute dilindungi secara absolut di level _edge network_ (sebelum halaman di-render).            |
