import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-neutral-light/20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-dark/60 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
        
        <h1 className="text-3xl font-bold text-primary mb-2">Syarat dan Ketentuan</h1>
        <p className="text-neutral-dark/60 mb-8">Pembaruan Terakhir: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="space-y-8 text-neutral-dark/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">1. Pendahuluan</h2>
            <p>Selamat datang di SiapSedia. Dengan mengakses atau menggunakan platform kami, Anda setuju untuk terikat dengan Syarat dan Ketentuan ini. SiapSedia adalah platform perantara (marketplace) yang menghubungkan Anda dengan penyedia jasa pihak ketiga (Merchant) untuk kebutuhan air galon, gas, dan laundry.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">2. Akun Pengguna</h2>
            <p>Untuk menggunakan layanan kami, Anda harus membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi Anda dan bertanggung jawab penuh atas semua aktivitas yang terjadi di bawah akun Anda. Pengguna wajib memberikan informasi yang akurat, lengkap, dan terkini.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">3. Transaksi dan Pembayaran</h2>
            <p>Harga barang dan jasa ditentukan langsung oleh Merchant. SiapSedia memfasilitasi penempatan pesanan, namun kesepakatan jual beli terjadi langsung antara Customer dan Merchant. Pembatalan pesanan mungkin tidak dapat dilakukan apabila Merchant telah memulai proses pengiriman atau pengerjaan.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">4. Hak dan Kewajiban Merchant</h2>
            <p>Merchant yang mendaftar di SiapSedia wajib menjamin kualitas barang dan jasanya (seperti kebersihan air galon, tabung gas yang aman, dan standar layanan laundry). Merchant bertanggung jawab untuk memastikan estimasi waktu pengiriman ditaati sebaik mungkin.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">5. Batasan Tanggung Jawab</h2>
            <p>SiapSedia hanya bertindak sebagai platform perantara. Kami tidak memproduksi, menyediakan, atau mengontrol langsung kualitas barang dan jasa dari Merchant. Oleh karena itu, SiapSedia tidak dapat dimintai pertanggungjawaban hukum atas kerusakan barang, keterlambatan pengiriman, atau kelalaian yang secara murni disebabkan oleh pihak Merchant, meskipun kami akan selalu membantu memfasilitasi penyelesaian keluhan Anda.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
