# 📋 QA & End-to-End Testing Checklist

> **Dokumen Panduan Pengujian (Live Site)**
> Gunakan dokumen ini untuk melacak proses pengujian semua fitur dan validasi sistem sebelum presentasi. Beri tanda `[x]` jika skenario berhasil dilewati tanpa _bug_.

---

## 🛡️ Fase 1: Autentikasi & Keamanan (Pintu Masuk)

### A. Registrasi Customer

- [x] **Validasi Kosong:** Buka halaman daftar Customer. Biarkan kosong dan klik Daftar. (Ekspektasi: Muncul peringatan form tidak boleh kosong).
- [x] **Validasi Password Lemah:** Isi semua data, tapi masukkan password `123`. (Ekspektasi: Ditolak dengan pesan "Password minimal 8 karakter").
- [x] **Validasi Duplikat:** Daftar menggunakan _email_ yang **sudah ada** di _database_. (Ekspektasi: Ditolak dengan pesan "Email sudah terdaftar").
- [x] **Sukses:** Daftar dengan data baru yang valid. (Ekspektasi: Berhasil dan dilempar ke halaman login).

### B. Registrasi Merchant

- [x] **Validasi Input Merchant:** Buka halaman daftar Mitra. Kosongkan "Nama Toko" atau "Area". (Ekspektasi: Form menolak pengiriman karena HTML5 Validation).
- [x] **Sukses:** Daftar Mitra baru secara valid. (Ekspektasi: Berhasil, status toko menunggu persetujuan Admin).

### C. Login & Middleware (Keamanan Rute)

- [x] **Validasi Salah Input:** Masukkan _email_ yang benar tapi password salah. (Ekspektasi: Muncul pesan error "Email atau kata sandi salah" dan aplikasi tidak _crash_).
- [x] **Login Sukses (Role-Routing):** Login sebagai Customer. (Ekspektasi: Otomatis diarahkan ke `/customer/home`).
- [x] **Uji Bypass Rute (PENTING):** Saat login sebagai Customer, ketik manual URL `/admin/dashboard` di browser. (Ekspektasi: Akses diblokir oleh Middleware dan dilempar kembali). note: kembali ke halaman landing page (tidak perlu perbaikan)

---

## 🛒 Fase 2: Skenario Customer (Pencarian & Transaksi)

### A. Manajemen Profil

- [x] **Validasi Kosong:** Buka Pengaturan Profil. Kosongkan nama Anda dan klik Simpan. (Ekspektasi: Ditolak). note: hanya validasi HTML5: fill out this field
- [x] **Update Sukses:** Ubah nomor telepon dan simpan. (Ekspektasi: Tersimpan dan data langsung berubah).

### B. Pembuatan Pesanan (Checkout)

- [x] **Validasi Kuantitas:** Masukkan produk ke keranjang, ubah jumlah pesanan jadi `0` atau `-2`. (Ekspektasi: Browser mencegahnya - _Value must be greater than 0_). note: validate ui/ux html5: berhasil
- [x] **Validasi Checkout Kosong:** Biarkan form **Alamat Pengiriman** atau **Metode Bayar** kosong, klik Buat Pesanan. (Ekspektasi: Pesan error wajib diisi muncul). note: metode bayar tidak bisa kosong otomatis checklist dalam skenario merchant hanya menerima cod. alamat pengiriman kosong berhasil validate HTML5 field out this field
- [x] **Order Sukses:** Pilih opsi COD, lengkapi alamat, klik Pesan. (Ekspektasi: Dialihkan ke Riwayat Pesanan dengan status `PENDING`).

### C. Ulasan (Review)

- [x] **Validasi Akses:** Coba cari tombol "Beri Ulasan" pada pesanan yang masih `PENDING` atau `PROCESSING`. (Ekspektasi: Tombol tidak ada / tidak bisa diklik).
- [x] **Validasi Rating Kosong:** Pada pesanan `COMPLETED`, klik Beri Ulasan lalu langsung submit tanpa memilih bintang 1-5. (Ekspektasi: Error validasi rating). note: rating secara default 5 dan tidak bisa di uncheck jadi 0, min 1
- [x] **Validasi Spam:** Kirim ulasan sukses. Lalu coba beri ulasan lagi di pesanan yang sama. (Ekspektasi: Tombol ulasan hilang).

---

## 🏪 Fase 3: Skenario Merchant (Toko & Layanan)

### A. Kelola Profil & Toko

- [x] **Validasi QRIS:** Unggah gambar QRIS. (Ekspektasi: Gambar sukses tersimpan ke _Vercel Blob_ dan tampil di halaman bayar Customer).
- [x] **Toggle Status:** Nyalakan dan matikan _toggle_ Buka/Tutup toko. (Ekspektasi: Perubahan status instan terlihat oleh Customer).

### B. Manajemen Produk

- [x] **Validasi Harga Minus:** Tambah produk baru, isi harga dengan `-15000`. (Ekspektasi: Form ditahan browser dengan pesan _"Value must be greater than 0"_).
- [-] **Hapus Produk:** Hapus salah satu produk. (Ekspektasi: Etalase di sisi Customer langsung terupdate - _Cross-invalidation_). note: tidak terupdate perlu refresh dulu

### C. Pemrosesan Pesanan Berjalan

- [x] **Update Status:** Buka Dasbor Pesanan. Ubah pesanan Customer tadi secara berurutan: `PENDING` ➡️ `ACCEPTED` ➡️ `PROCESSING` ➡️ `DELIVERING` ➡️ `COMPLETED`.
- [x] **Real-time Check:** Buka tab Customer. (Ekspektasi: Status pesanan ikut berubah sesuai yang disetel Merchant). note: tetap perlu refresh/navigasi ke dashboard lalu kembali ke pesanan baru status berubah (saya tidak yakin apakah memang didesain seperti ini saya lupa)

---

## 👑 Fase 4: Skenario Super Admin (Kendali Pusat)

### A. Approval Merchant

- [x] Buka menu Persetujuan Mitra. Setujui Merchant yang mendaftar di Fase 1. (Ekspektasi: Merchant tersebut sekarang bisa login dan berjualan).

### B. Keamanan Data (User Management)

- [x] **Soft-Delete:** Hapus (Nonaktifkan) satu Customer biasa. (Ekspektasi: Customer tersebut menjadi "Nonaktif", tidak bisa login lagi, namun transaksi lamanya tetap utuh di sistem). note: berhasil tidak bisa login lagi dengan informasi email/sandi salah. namun dalam skenario user masih login atau belum pernah logout dia masih bisa membuka profile edit profile dan navigasi ke dashboard

- [x] **Anti-Bunuh Diri (PENTING):** Klik tombol Nonaktifkan/Hapus pada **Akun Admin Anda Sendiri** yang sedang aktif digunakan. (Ekspektasi: Sistem kebal dan menolak: _"Tidak bisa menghapus akun sendiri."_). note: tidak ada tombol delete

note: pada beberapa sesi ada temuan terkadang loading lama, sepertinya berasal dari neondb free tier yang databasenya auto sleep butuh wake up time, ignore this
