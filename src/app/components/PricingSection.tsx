import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="pricing">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-light/30 via-white to-white -z-10" />
      
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4">
            Investasi Kecil, <br className="hidden md:block"/> Untung Maksimal
          </h2>
          <p className="text-lg text-neutral-dark/70 leading-relaxed">
            Pilih paket berlangganan yang sesuai dengan skala usaha warung atau agen Anda. 100% margin keuntungan pesanan tetap milik Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          
          {/* Card 1: Paket Pemula */}
          <div className="bg-white rounded-3xl p-8 xl:p-10 shadow-sm border border-neutral-light/20 hover:shadow-md transition-shadow relative">
            <h3 className="text-xl font-semibold text-primary mb-2">Paket Pemula</h3>
            <p className="text-neutral-dark/60 text-sm mb-6 h-10">Cocok untuk mencoba berjualan secara digital.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-primary">Rp 0</span>
              <span className="text-neutral-dark/50">/selamanya</span>
            </div>
            <ul className="space-y-4 mb-8 text-neutral-dark/80 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                <strong>10 Pesanan Gratis tiap bulan</strong>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                Profil toko di aplikasi
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-accent" />
                </div>
                Dasbor manajemen pesanan
              </li>
              <li className="flex items-center gap-3 opacity-50">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <span className="text-neutral-dark">-</span>
                </div>
                Pesanan dibatasi jika melebihi kuota
              </li>
            </ul>
            <a href="#register-form" className="block w-full py-3 px-4 bg-background text-primary font-semibold text-center rounded-xl border border-neutral-light/20 hover:bg-neutral-light/10 transition-colors">
              Mulai Gratis
            </a>
          </div>

          {/* Card 2: Mitra Pro (Rp 29k) */}
          <div className="bg-primary rounded-3xl p-8 xl:p-10 shadow-xl border border-primary relative transform md:scale-105 z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] rounded-full"></div>
            <div className="absolute -top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Paling Populer
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">Mitra Pro</h3>
            <p className="text-white/70 text-sm mb-6 h-10">Maksimalkan omzet warung/toko dengan pesanan tanpa batas.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">Rp 29<span className="text-2xl">.000</span></span>
              <span className="text-white/50">/bulan</span>
            </div>
            <ul className="space-y-4 mb-8 text-white/90 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <strong>Terima Pesanan Tanpa Batas</strong>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                Semua fitur di Paket Pemula
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                100% margin keuntungan milik Anda
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                Prioritas visibilitas di area sekitar
              </li>
            </ul>
            <a href="#register-form" className="block w-full py-3 px-4 bg-accent text-white font-bold text-center rounded-xl hover:scale-105 transition-transform shadow-lg">
              Daftar Sebagai Mitra Pro
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
