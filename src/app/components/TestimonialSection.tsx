import { Star } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Ayah 2 Anak",
      content: "Sejak pakai SiapSedia, nggak pernah lagi kehabisan air galon di tengah malam. Pengirimannya super cepat dan harganya transparan!",
      initials: "BS",
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Siti Aminah",
      role: "Ibu Rumah Tangga",
      content: "Laundry kiloan sekarang gampang banget. Tinggal pesan dari aplikasi, kurir datang ambil. Pakaian kembali bersih, rapi, dan wangi.",
      initials: "SA",
      color: "bg-pink-100 text-pink-700"
    },
    {
      name: "Andi Wijaya",
      role: "Pemilik Kos",
      content: "Sangat terbantu untuk pesan gas elpiji jumlah banyak untuk anak kos. Merchant lokal merespon dengan cepat. Aplikasi yang wajib ada!",
      initials: "AW",
      color: "bg-emerald-100 text-emerald-700"
    }
  ];

  return (
    <section className="py-24 bg-white px-4 relative overflow-hidden">
      {/* Dekorasi Latar */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/3 -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
            Dipercaya oleh Ribuan Keluarga
          </h2>
          <p className="text-neutral-dark/70 max-w-2xl mx-auto text-lg">
            Jangan hanya dengar dari kami. Lihat apa kata mereka yang sudah merasakan kemudahan layanan SiapSedia setiap harinya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, i) => (
            <div key={i} className="bg-background rounded-2xl p-8 border border-neutral-light/20 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative flex flex-col">
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-neutral-dark/80 mb-8 leading-relaxed flex-1">
                &quot;{testi.content}&quot;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ${testi.color}`}>
                  {testi.initials}
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">{testi.name}</h4>
                  <p className="text-xs text-neutral-dark/50 font-medium">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
