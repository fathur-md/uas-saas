import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - SiapSedia",
  description: "Pertanyaan yang sering diajukan mengenai layanan SiapSedia.",
};

const faqs = [
  {
    q: "Apakah layanan SiapSedia gratis?",
    a: "Pendaftaran sebagai Customer maupun Merchant di platform kami sepenuhnya gratis. Kami mungkin membebankan biaya layanan kecil pada transaksi untuk pemeliharaan sistem."
  },
  {
    q: "Bagaimana cara menjadi Merchant?",
    a: "Anda cukup klik tombol 'Daftar Merchant' di halaman pendaftaran, lengkapi profil toko Anda, dan Anda siap menerima pesanan pertama."
  },
  {
    q: "Apakah area saya sudah terjangkau?",
    a: "Jangkauan layanan kami bergantung pada merchant yang terdaftar di sekitar Anda. Jika belum ada, Anda bisa merekomendasikan warung langganan Anda untuk bergabung!"
  },
  {
    q: "Bagaimana sistem pembayarannya?",
    a: "Saat ini SiapSedia mendukung pembayaran di tempat (COD) agar memudahkan transaksi langsung dengan merchant lokal Anda."
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-6 w-full">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4">
          FAQ
        </h1>
        <p className="text-lg text-neutral-dark/70 mb-12">
          Pertanyaan yang paling sering ditanyakan oleh pengguna kami.
        </p>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl shadow-sm ring-1 ring-neutral-light/20 transition-all hover:shadow-md">
              <h3 className="text-lg font-semibold text-primary mb-2">{faq.q}</h3>
              <p className="text-neutral-dark/80 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
