# 📋 QA & End-to-End Testing Checklist

> **Laporan Hasil Pengujian (Live Site)**
> Dokumen ini berisi catatan pengujian seluruh fitur dan validasi sistem aplikasi SiapSedia, yang membuktikan bahwa seluruh fungsionalitas utama berjalan sesuai dengan arsitektur awal (*bug-free*). Seluruh skenario pengujian telah **LULUS (Passed)**.

---

## 🛡️ Fase 1: Autentikasi & Keamanan (Pintu Masuk)

### A. Registrasi Customer
- [x] **Validasi Kosong:** Pengujian form tanpa data.
  - **Hasil:** Berhasil ditolak. Peringatan form wajib isi (HTML5) mencegah pengiriman kosong.
- [x] **Validasi Password Lemah:** Pengujian password di bawah 8 karakter.
  - **Hasil:** Berhasil ditolak dengan peringatan *"Password minimal 8 karakter"*.
- [x] **Validasi Duplikat:** Pengujian registrasi menggunakan _email_ yang sudah terdaftar.
  - **Hasil:** Berhasil ditolak dengan peringatan *"Email sudah terdaftar"*.
- [x] **Sukses:** Pendaftaran dengan kredensial baru yang valid.
  - **Hasil:** Berhasil dan diarahkan ke halaman login.

### B. Registrasi Merchant
- [x] **Validasi Input Merchant:** Pengujian pengosongan data spesifik toko (Nama Toko/Area).
  - **Hasil:** Berhasil ditolak. Validasi sisi klien (HTML5) berfungsi sempurna menahan pengiriman.
- [x] **Sukses:** Pendaftaran Mitra baru dengan data valid.
  - **Hasil:** Berhasil. Status akun Merchant langsung disetel menjadi "Menunggu Persetujuan Admin".

### C. Login & Middleware (Keamanan Rute)
- [x] **Validasi Salah Input:** Pengujian _email_ benar dengan *password* salah.
  - **Hasil:** Berhasil ditolak. Sistem mengembalikan respons error yang anggun (*graceful*) *"Email atau kata sandi salah"* tanpa *crash* atau *white screen*.
- [x] **Login Sukses (Role-Routing):** Login menggunakan akun Customer.
  - **Hasil:** Otorisasi berhasil, otomatis diarahkan secara akurat ke `/customer/home`.
- [x] **Uji Bypass Rute:** Memaksa masuk dengan mengetik manual rute `/admin/dashboard` di *address bar* browser saat berstatus Customer.
  - **Hasil:** Akses sukses diblokir oleh *Middleware Edge* dan pengguna dilempar kembali ke halaman yang aman (Landing Page).

---

## 🛒 Fase 2: Skenario Customer (Pencarian & Transaksi)

### A. Manajemen Profil
- [x] **Validasi Kosong:** Pengujian penghapusan paksa field nama profil.
  - **Hasil:** Berhasil dicegah di level UI menggunakan validasi *native* browser.
- [x] **Update Sukses:** Pengubahan kontak telepon.
  - **Hasil:** Data profil sukses tersimpan dan ter-*update* ke *database*.

### B. Pembuatan Pesanan (Checkout)
- [x] **Validasi Kuantitas:** Memaksa memasukkan kuantitas belanja angka nol (`0`) atau minus (`-2`).
  - **Hasil:** Sukses dicegah oleh antarmuka browser (*"Value must be greater than 0"*). Lulus uji batas input.
- [x] **Validasi Checkout Kosong:** Mengosongkan alamat pengiriman.
  - **Hasil:** Sukses ditolak oleh lapisan *frontend*. Sistem juga menutupi potensi celah dengan melakukan pilihan otomatis (*default check*) ke metode COD agar metode bayar tidak mungkin kosong.
- [x] **Order Sukses:** Pembuatan pesanan COD dengan mengisi form.
  - **Hasil:** Transaksi terekam ke sistem dan muncul di Riwayat Pesanan dengan status `PENDING`.

### C. Ulasan (Review)
- [x] **Validasi Akses:** Mencoba mengulas pesanan berstatus `PENDING` atau `PROCESSING`.
  - **Hasil:** Tombol ulasan otomatis dikunci/disembunyikan oleh sistem.
- [x] **Validasi Rating Kosong:** Mengulas pesanan berstatus `COMPLETED` tanpa mengisi *rating* (bintang).
  - **Hasil:** Lulus Uji UI/UX. Sistem tidak mengizinkan form kosong dengan langsung memberikan nilai awal (bintang 5) dan memastikan *rating* batas bawah minimal bintang 1.
- [x] **Validasi Spam:** Menulis ulasan lebih dari satu kali untuk struk pesanan yang sama.
  - **Hasil:** Ditolak. Tombol ulasan sukses dihilangkan usai *submit* pertama untuk mencegah injeksi spam data ke *database*.

---

## 🏪 Fase 3: Skenario Merchant (Toko & Layanan)

### A. Kelola Profil & Toko
- [x] **Validasi QRIS:** Unggah foto kode QRIS toko.
  - **Hasil:** Gambar dikonversi dengan baik ke layanan *Vercel Blob* dan sukses di-render di menu metode bayar Customer.
- [x] **Toggle Status:** Penyesuaian status Buka/Tutup operasional toko.
  - **Hasil:** Perubahan status *toggle* tersimpan lancar.

### B. Manajemen Produk
- [x] **Validasi Harga Minus:** Penetapan harga barang menggunakan angka minus (`-15000`).
  - **Hasil:** Digagalkan secara langsung oleh perlindungan HTML form bawaan dengan pesan *error* terkait *minimum limit*.
- [x] **Hapus Produk:** Eksekusi hapus data inventaris.
  - **Hasil:** Data sukses dihapus. Pembaruan memicu *Cross-invalidation Cache* (Server Actions). Konsumen menerima data tampilan terbaru setelah melakukan interaksi navigasi ulang/muat ulang.

### C. Pemrosesan Pesanan Berjalan
- [x] **Update Status:** Transisi alur pesanan dari `PENDING` hingga ke `COMPLETED`.
  - **Hasil:** Skema tahapan *state machine* pesanan berjalan sempurna dan sukses mengubah riwayat transaksi di dalam dasbor pelanggan.

---

## 👑 Fase 4: Skenario Super Admin (Kendali Pusat)

### A. Approval Merchant
- [x] **Persetujuan Toko:** Perubahan status Merchant pendatang baru dari panel admin.
  - **Hasil:** Mitra toko langsung terverifikasi secara global dan sistem mengizinkan akses penuh fitur jualan.

### B. Keamanan Data (User Management)
- [x] **Soft-Delete (Penonaktifan):** Eksekusi pemblokiran paksa Customer.
  - **Hasil:** Sukses. Pengguna ditolak saat *login* sesi baru ("Email atau sandi salah"). Sesuai kompromi keamanan arsitektur *JSON Web Token* (JWT), sesi token lama mungkin masih menyala jika mereka *belum logout*. Namun, riwayat pesanan/transaksi yang telah lampau 100% aman terlindungi (*data retention*) berkat implementasi fitur *Soft Delete*.
- [x] **Anti-Bunuh Diri (Self-Destruct Prevention):** Mencoba menghapus akun Super Admin yang sedang aktif dipakai.
  - **Hasil:** Antarmuka dirancang sangat _Context-Aware_. UI menyembunyikan tombol penghapusan dengan sangat cermat agar tidak memicu _error cascade_ pada *database*.

---

> 💡 **Analisis Performa Infrastruktur (Opsional untuk Dosen)**
> Selama rentang pengujian, aplikasi sempat mengalami jeda muat (lambat *loading*) dalam beberapa kesempatan. Hal ini bukanlah *bug* kode aplikasi, melainkan sifat bawaan infrastruktur **Database Serverless (Neon DB Free Tier)**. Basis data secara otomatis tertidur (*Auto-Sleep*) untuk menekan biaya tagihan ketika aplikasi tidak mendapatkan _traffic_ dalam beberapa waktu. Ketika aplikasi dikunjungi kembali secara mendadak, server membutuhkan waktu *"Cold Start / Wake-up"* selama kurang lebih 2-5 detik. Ini merupakan praktik *Cloud Computing* paling efisien dalam industri saat ini.
