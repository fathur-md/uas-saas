import { Metadata } from "next";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - SiapSedia",
  description: "Pertanyaan yang sering diajukan mengenai layanan SiapSedia.",
};

const faqCategories = [
  {
    title: "Umum",
    items: [
      {
        q: "Apa itu SiapSedia?",
        a: "SiapSedia adalah platform marketplace yang menghubungkan Anda dengan pedagang lokal (warung, agen, penatu) untuk memenuhi kebutuhan air galon, gas LPG, dan laundry harian Anda dengan cepat."
      },
      {
        q: "Apakah layanan SiapSedia berbayar?",
        a: "Pendaftaran sebagai Pelanggan maupun Mitra (Merchant) sepenuhnya gratis. Anda hanya membayar sesuai harga barang/jasa dan ongkos kirim yang ditetapkan oleh Mitra lokal."
      },
      {
        q: "Apakah area rumah saya sudah terjangkau?",
        a: "Jangkauan layanan kami bergantung pada ketersediaan Mitra di sekitar radius lokasi Anda. Jika belum ada yang muncul di aplikasi, Anda bisa merekomendasikan agen langganan Anda untuk bergabung bersama kami!"
      }
    ]
  },
  {
    title: "Untuk Pelanggan",
    items: [
      {
        q: "Bagaimana sistem pembayaran di SiapSedia?",
        a: "Saat ini, kami mengutamakan sistem Pembayaran di Tempat (COD/Cash on Delivery) langsung kepada kurir Mitra. Ini untuk memastikan Anda hanya membayar setelah barang diterima dengan aman."
      },
      {
        q: "Berapa lama estimasi pengiriman galon atau gas?",
        a: "Karena kami memprioritaskan pedagang di sekitar lokasi Anda (lokal), rata-rata pengiriman memakan waktu antara 15 hingga 45 menit, jauh lebih cepat daripada memesan dari tempat yang jauh."
      },
      {
        q: "Apakah saya harus menukar galon atau tabung gas kosong?",
        a: "Ya, skema pembelian galon air dan gas LPG di SiapSedia adalah sistem tukar kosong (isi ulang). Pastikan Anda memiliki tabung atau galon kosong dengan merek yang sesuai untuk ditukar saat kurir datang."
      }
    ]
  },
  {
    title: "Untuk Mitra (Merchant)",
    items: [
      {
        q: "Bagaimana cara mendaftarkan warung atau usaha laundry saya?",
        a: "Sangat mudah! Cukup klik tombol 'Daftar Sebagai Mitra' di halaman utama, lengkapi profil usaha Anda, dan Anda siap menerima pesanan pertama dari warga sekitar."
      },
      {
        q: "Apakah saya harus menyediakan kurir pengantar sendiri?",
        a: "Ya, untuk menjaga biaya operasional tetap rendah, Mitra diharapkan memberdayakan kurir internal (pegawai warung/laundry Anda sendiri) untuk melakukan pengantaran ke rumah pelanggan."
      },
      {
        q: "Apakah ada potongan pendapatan atau biaya admin per transaksi?",
        a: "Tidak ada potongan komisi per transaksi! SiapSedia menggunakan model berlangganan (SaaS Freemium). Setiap Mitra mendapatkan kuota 10 pesanan pertama secara GRATIS setiap bulannya. Jika pesanan Anda ramai dan melebihi kuota tersebut, Anda hanya perlu membayar biaya langganan bulanan tetap yang sangat terjangkau. 100% margin keuntungan pesanan tetap milik Anda."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* HEADER SECTION */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden bg-primary text-center isolate">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-primary to-primary -z-10" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent blur-[100px] opacity-40 rounded-full -z-10"></div>
        <div className="max-w-3xl mx-auto mt-8">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20 shadow-xl">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Pertanyaan Umum (FAQ)
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Temukan jawaban cepat mengenai cara menggunakan SiapSedia. Jika Anda tidak menemukan jawaban yang dicari, tim kami siap membantu Anda.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="px-4 -mt-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                {category.title}
              </h2>
              
              <div className="space-y-4">
                {category.items.map((faq, index) => (
                  <details 
                    key={index} 
                    className="group bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-neutral-light/20 open:bg-neutral-50/50 open:border-accent/30 transition-all duration-300"
                  >
                    <summary className="flex justify-between items-center gap-4 p-6 font-semibold text-primary cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span className="leading-snug">{faq.q}</span>
                      <span className="w-8 h-8 flex-shrink-0 bg-background rounded-full flex items-center justify-center group-open:bg-accent group-open:text-white transition-colors border border-neutral-light/20 group-open:border-accent">
                        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0 text-neutral-dark/70 leading-relaxed text-sm md:text-base">
                      <div className="pt-4 border-t border-neutral-light/20">
                        {faq.a}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {/* STILL HAVE QUESTIONS CARD */}
          <div className="mt-16 bg-gradient-to-br from-primary to-neutral-dark p-8 rounded-3xl text-center shadow-xl border border-neutral-light/20 relative overflow-hidden isolate">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] rounded-full -z-10"></div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Masih punya pertanyaan?</h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Tim dukungan (Customer Service) kami siap membantu memecahkan masalah atau kebingungan Anda.
            </p>
            <Link 
              href="/contact-us" 
              className="inline-flex items-center justify-center bg-white text-primary font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              Hubungi Kami Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
