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

| Simbol | Arti |
|--------|------|
| `[ ]` | Belum dikerjakan |
| `[/]` | Sedang dikerjakan |
| `[x]` | Selesai |
| `[-]` | Dibatalkan / tidak jadi |

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
- [/] 0.8 — Tentukan tech stack *(Menunggu keputusan akhir tentang ORM)*
- [ ] 0.9 — Desain database schema (tabel, relasi) → `database-schema.md`
- [ ] 0.10 — Review akhir: semua docs lengkap & konsisten

---

### Fase 1 — Project Setup

> **Tujuan:** Fondasi project siap, bisa langsung develop fitur.
> **Output:** Project berjalan di localhost, database terhubung.

- [x] 1.1 — Inisialisasi project (framework) ✅ Next.js 16 & Tailwind v4 terinstal
- [ ] 1.2 — Setup database & buat tabel
- [ ] 1.3 — Setup environment variables
- [ ] 1.4 — Setup design system (warna, font, layout dasar)
- [ ] 1.5 — Buat layout/template utama (navbar, sidebar, footer)
- [ ] 1.6 — Verifikasi: app jalan di localhost ✓

---

### Fase 2 — Core Development

> **Tujuan:** Semua fitur wajib berfungsi.
> **Output:** App bisa di-demo end-to-end.
>
> *Detail task diisi setelah Fase 0 selesai, berdasarkan fitur di `planning.md`.*

#### Auth & User Management
- [ ] 2.1 — Register (customer)
- [ ] 2.2 — Register (merchant, dengan approval flow)
- [ ] 2.3 — Login / Logout (semua role)
- [ ] 2.4 — Seed akun admin

#### Customer Features
- [ ] 2.5 — *Diisi setelah planning final*
- [ ] 2.6 — *Diisi setelah planning final*
- [ ] 2.7 — *Diisi setelah planning final*

#### Merchant Features
- [ ] 2.8 — *Diisi setelah planning final*
- [ ] 2.9 — *Diisi setelah planning final*
- [ ] 2.10 — *Diisi setelah planning final*

#### Admin Features
- [ ] 2.11 — *Diisi setelah planning final*
- [ ] 2.12 — *Diisi setelah planning final*

---

### Fase 3 — Polish & UX

> **Tujuan:** App terasa premium, tidak terlihat "tugas kuliah".
> **Output:** UI responsif, smooth, dan konsisten.

- [ ] 3.1 — Responsive design (mobile & tablet)
- [ ] 3.2 — Loading states & skeleton
- [ ] 3.3 — Error handling & pesan error user-friendly
- [ ] 3.4 — Animasi & micro-interactions
- [ ] 3.5 — SEO (meta tags, title, description)

---

### Fase 4 — Deployment

> **Tujuan:** Website bisa diakses online.
> **Output:** URL publik yang bisa dikasih ke dosen.

- [ ] 4.1 — Build production
- [ ] 4.2 — Deploy ke hosting (Vercel/Netlify/Cloudflare)
- [ ] 4.3 — Test semua fitur di production
- [ ] 4.4 — Pastikan semua fitur terbuka (tanpa paywall)

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
- [ ] ✅ Bisa diakses online (URL: _______)
- [ ] ✅ Pakai database
- [ ] ✅ Dokumentasi PDF
- [ ] ✅ Video presentasi (YouTube: _______)

---

## Log Keputusan

> Catat setiap keputusan penting atau perubahan arah di sini.
> Format: `[tanggal] — keputusan — alasan`

| Tanggal | Keputusan | Alasan |
|---------|-----------|--------|
| 2026-07-05 | Pilih Opsi C (2 sisi + admin) | Paling lengkap & realistis untuk SaaS, nilai presentasi tinggi |
| 2026-07-05 | Tema: marketplace kebutuhan rumah tangga (galon/gas/laundry) | Masalah nyata sehari-hari, relatable |
| 2026-07-05 | Docs structure: 4 dokumen utama | Lean & practical, tidak overkill untuk 1 orang |
| 2026-07-05 | Pencarian: pilih area/kecamatan (dropdown) | Simpel, cukup realistis |
| 2026-07-05 | Pembayaran: COD + QRIS statis | Realistis, tanpa payment gateway, wow factor tinggi |
| 2026-07-05 | Pesanan: 1 pesanan = 1 merchant | Simpel, sesuai use case (bukan e-commerce cart) |
| 2026-07-05 | Ongkir: merchant set sendiri (bisa gratis) | Fleksibel, realistis |
| 2026-07-05 | Rating: bintang + review teks | Nilai presentasi tinggi, informatif untuk customer |
| 2026-07-05 | Revenue model: langganan bulanan merchant | Implementasi simpel, terasa SaaS |
| 2026-07-05 | Batasan scope: 9 fitur dicoret | Fokus ke MVP, hindari scope creep |
| 2026-07-05 | Sitemap dibuat: 23 halaman | Public, Customer, Merchant, Admin terstruktur dengan baik |
| 2026-07-05 | Nama Brand: SiapSedia | Familiar, positif, deskriptif tentang layanan yang selalu siap ada |
| 2026-07-05 | Inisialisasi Next.js | Berhasil setup Next.js 16 + Tailwind v4 + React 19 secara manual. |

---

## Log Error & Solusi

> Catat error/masalah yang ditemukan selama development dan solusinya.
> Berguna sebagai referensi jika masalah serupa muncul lagi.

| Tanggal | Fase | Masalah | Solusi |
|---------|------|---------|-------|
| — | — | — | — |
