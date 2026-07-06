import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tentang Kami - SiapSedia",
  description: "Kenali lebih dekat visi dan misi SiapSedia dalam mendigitalisasi layanan kebutuhan rumah tangga.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-6 w-full">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-8">
          Tentang SiapSedia
        </h1>
        <div className="prose prose-lg prose-neutral">
          <p className="text-xl text-neutral-dark/80 leading-relaxed font-light mb-8">
            SiapSedia hadir dari masalah sederhana: susahnya mencari air galon, gas LPG, atau layanan laundry terdekat dengan cepat dan transparan.
          </p>
          <div className="w-full h-64 bg-white rounded-3xl mb-10 shadow-sm ring-1 ring-neutral-light/20 flex items-center justify-center overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-primary/5" />
             {/* Fallback image incase logo.webp changes */}
             <div className="text-3xl font-bold text-primary opacity-50">SiapSedia</div>
          </div>
          <h2 className="text-2xl font-semibold text-primary mb-4">Visi Kami</h2>
          <p className="text-neutral-dark/80 leading-relaxed mb-6">
            Menjadi ekosistem digital terbesar yang memberdayakan UMKM lokal (warung, agen, dan penatu) untuk melayani komunitas mereka dengan lebih baik melalui teknologi.
          </p>
          <h2 className="text-2xl font-semibold text-primary mb-4">Kenapa SiapSedia?</h2>
          <ul className="space-y-4 text-neutral-dark/80 mb-8 list-none pl-0">
            <li className="flex gap-3"><span className="text-accent font-bold">✓</span> <span className="block"><strong>Lokal & Dekat:</strong> Kami menghubungkan Anda dengan pedagang di sekitar Anda.</span></li>
            <li className="flex gap-3"><span className="text-accent font-bold">✓</span> <span className="block"><strong>Cepat & Mudah:</strong> Tidak perlu berkeliling mencari, cukup pesan dari gawai Anda.</span></li>
            <li className="flex gap-3"><span className="text-accent font-bold">✓</span> <span className="block"><strong>Transparan:</strong> Harga jelas, status pesanan dapat dilacak.</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
