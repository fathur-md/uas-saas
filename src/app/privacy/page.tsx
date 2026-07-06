import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-neutral-light/20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-dark/60 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
        
        <h1 className="text-3xl font-bold text-primary mb-2">Kebijakan Privasi</h1>
        <p className="text-neutral-dark/60 mb-8">Pembaruan Terakhir: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="space-y-8 text-neutral-dark/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">1. Data yang Kami Kumpulkan</h2>
            <p>Saat Anda menggunakan SiapSedia, kami dapat mengumpulkan informasi pribadi yang Anda berikan secara langsung, termasuk namun tidak terbatas pada: Nama lengkap, alamat email, nomor telepon, dan detail alamat pengiriman atau titik lokasi.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">2. Penggunaan Data</h2>
            <p>Informasi yang kami kumpulkan digunakan murni untuk memproses pesanan Anda, mengelola akun Anda, meningkatkan operasional platform, serta memberikan dukungan pelanggan yang efektif.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">3. Pembagian Data kepada Pihak Ketiga</h2>
            <p>Untuk memastikan pesanan Anda dapat diselesaikan, <strong>kami harus membagikan informasi tertentu (seperti Nama, Nomor Telepon, dan Alamat Pengiriman Anda) kepada Merchant</strong> yang menerima pesanan tersebut. Kami tidak akan menjual atau menyewakan data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran tanpa persetujuan eksplisit dari Anda.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">4. Keamanan Data</h2>
            <p>Kami menerapkan langkah-langkah keamanan yang ketat untuk melindungi data Anda. Kata sandi pengguna dienkripsi dengan standar industri (hashing) dan kami terus memantau kerentanan sistem untuk mencegah akses yang tidak sah.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mb-3">5. Hak Pengguna</h2>
            <p>Anda memiliki hak penuh untuk memperbarui informasi profil Anda atau meminta penghapusan akun beserta data terkait dari sistem kami dengan menghubungi tim dukungan kami.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
