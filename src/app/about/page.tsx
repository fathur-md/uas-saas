import { Metadata } from "next";
import Image from "next/image";
import { Target, Zap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami - SiapSedia",
  description: "Kenali lebih dekat visi dan misi SiapSedia dalam mendigitalisasi layanan kebutuhan rumah tangga.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-background -z-10" />
        <div className="max-w-5xl mx-auto text-center mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6 leading-tight">
            Mendekatkan Kebutuhan Anda, <br className="hidden md:block" />
            <span className="text-accent">Memberdayakan Sekitar.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-dark/70 max-w-2xl mx-auto leading-relaxed mb-12">
            SiapSedia hadir dari masalah sederhana: susahnya mencari air galon, gas LPG, atau layanan laundry terdekat dengan cepat dan transparan.
          </p>
          
          {/* Hero Image */}
          <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl relative ring-1 ring-neutral-light/20 bg-neutral-200">
            {/* Menggunakan tag img standar dengan sumber Unsplash berkualitas tinggi. 
                Menggunakan gambar interaksi warung/komunitas lokal. */}
            <Image 
              src="/images/about_hero.jpg" 
              alt="Kurir SiapSedia mengantarkan galon dan gas" 
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* VISI & MISI SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg ring-1 ring-neutral-light/20 bg-neutral-200">
               {/* Gambar representasi kehidupan rumah tangga yang bersih dan rapi */}
               <Image 
                 src="/images/about_vision.jpg" 
                 alt="Kenyamanan dan kebersihan rumah tangga" 
                 fill
                 className="object-cover transition-transform duration-700 hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex items-end p-8">
                 <p className="text-white font-medium text-lg leading-relaxed">
                   Menciptakan ekosistem rumah tangga yang modern, bersih, dan bebas repot.
                 </p>
               </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-primary mb-8">Tujuan Mulia Kami</h2>
              <div className="space-y-8">
                <div className="bg-background/50 p-6 rounded-2xl border border-neutral-light/20">
                  <h3 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">1</span>
                    Visi
                  </h3>
                  <p className="text-neutral-dark/80 leading-relaxed">
                    Menjadi ekosistem digital terbesar di Indonesia yang memberdayakan UMKM lokal (warung, agen gas, dan penatu) untuk melayani komunitas mereka dengan lebih modern melalui teknologi.
                  </p>
                </div>
                <div className="bg-background/50 p-6 rounded-2xl border border-neutral-light/20">
                  <h3 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm">2</span>
                    Misi
                  </h3>
                  <ul className="space-y-3 text-neutral-dark/80">
                    <li className="flex gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      Menyediakan platform yang sangat mudah digunakan bagi pelanggan rumah tangga.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      Meningkatkan omzet dan digitalisasi pedagang kecil di tingkat kelurahan.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      Menjamin transparansi harga dan kepastian jadwal pengiriman.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NILAI UTAMA (CORE VALUES) */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Kenapa Memilih SiapSedia?</h2>
          <p className="text-neutral-dark/60 mb-16 max-w-2xl mx-auto">Kami merancang layanan kami berpusat pada kenyamanan pelanggan dan kesejahteraan mitra.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-neutral-light/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 text-left">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Lokal & Dekat</h3>
              <p className="text-neutral-dark/70 leading-relaxed">
                Kami tidak mengambil barang dari gudang jauh. Kami menghubungkan Anda langsung dengan pedagang terpercaya di sekitar tempat tinggal Anda.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-neutral-light/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all md:-translate-y-4 hover:-translate-y-5 text-left relative">
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-accent/5 rounded-full blur-xl"></div>
              <div className="w-14 h-14 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6 relative">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Cepat & Mudah</h3>
              <p className="text-neutral-dark/70 leading-relaxed relative">
                Tidak perlu berkeliling mencari agen yang buka. Cukup pesan dari gawai Anda, pesanan akan segera diantar ke depan pintu.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-neutral-light/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 text-left">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Transparan</h3>
              <p className="text-neutral-dark/70 leading-relaxed">
                Harga barang dan ongkos kirim ditampilkan dengan sangat jelas tanpa biaya tersembunyi. Status pesanan pun dapat dilacak.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
