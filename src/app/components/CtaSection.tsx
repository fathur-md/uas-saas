import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-primary px-6 py-16 md:py-24 text-center shadow-2xl shadow-primary/20 isolate">
          {/* Latar belakang abstrak / Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent blur-[120px] opacity-70 rounded-full -z-10"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500 blur-[120px] opacity-40 rounded-full -z-10"></div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 max-w-2xl mx-auto leading-tight">
            Siap Mempermudah Urusan Rumah Tangga Anda?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto text-lg mb-10 leading-relaxed">
            Bergabunglah dengan ribuan pengguna lainnya. Pesan galon, gas, atau layanan laundry dari merchant terdekat sekarang juga tanpa ribet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/register" 
              className="flex w-full sm:w-auto justify-center text-center items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Mulai Sekarang Gratis
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/mitra" 
              className="flex w-full sm:w-auto justify-center text-center items-center gap-2 bg-white/5 text-white font-semibold px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              Daftar Sebagai Mitra
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
