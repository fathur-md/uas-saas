"use client";
import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import { registerMerchant } from "@/app/actions/auth";
import { Store, TrendingUp, Users, ArrowRight } from "lucide-react";
import PricingSection from "@/app/components/PricingSection";

export default function MitraLandingPage() {
  const [state, action, isPending] = useActionState(registerMerchant, null);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-16 pb-20 px-6 lg:px-8 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-white to-primary/5 -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Kiri: Teks */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 lg:mb-8">
              <Store className="w-4 h-4" />
              Platform #1 untuk UMKM Lokal
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-6 leading-tight">
              Tumbuhkan Bisnis Anda, <br className="hidden md:block" />
              <span className="text-accent">Jangkau Lebih Banyak Pelanggan.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-dark/70 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              Digitalisasi usaha warung, agen gas, atau penatu Anda. Kelola pesanan galon, gas, dan laundry dengan mudah serta terima pesanan secara real-time dari warga sekitar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <a 
                href="#register-form" 
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg w-full sm:w-auto"
              >
                Daftar Sekarang <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#pricing" 
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full border border-neutral-light/20 hover:bg-neutral-light/10 transition-colors shadow-sm w-full sm:w-auto"
              >
                Lihat Skema Harga
              </a>
            </div>
          </div>
          
          {/* Kanan: Gambar Visual */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-accent/10 rounded-[2.5rem] transform rotate-3 scale-105 -z-10 blur-xl"></div>
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] transform -rotate-2 scale-105 -z-10 blur-xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image 
                src="/images/mitra_hero.jpg" 
                alt="Pemilik warung menggunakan tablet untuk mengelola pesanan galon dan gas" 
                width={800} 
                height={533}
                priority
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-neutral-light/20 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs text-neutral-dark/60 font-semibold uppercase tracking-wider">Omzet Naik</p>
                <p className="text-lg font-bold text-primary">Pesanan Real-time</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-background border border-neutral-light/20 text-center hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Toko Online Mandiri</h3>
            <p className="text-neutral-dark/70 leading-relaxed">
              Dapatkan etalase digital Anda sendiri. Atur ketersediaan barang dan jam buka-tutup dengan sangat mudah.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-background border border-neutral-light/20 text-center hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Ekspansi Pasar Lokal</h3>
            <p className="text-neutral-dark/70 leading-relaxed">
              Aplikasi kami akan memprioritaskan toko Anda untuk pelanggan yang berada di radius pengiriman Anda.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-background border border-neutral-light/20 text-center hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Keuntungan 100%</h3>
            <p className="text-neutral-dark/70 leading-relaxed">
              Tanpa potongan komisi per transaksi. Anda berhak mendapatkan seluruh hasil jerih payah penjualan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <PricingSection />

      {/* REGISTRATION FORM SECTION */}
      <section id="register-form" className="py-24 px-6 lg:px-8 bg-neutral-light/10">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 xl:p-16 rounded-[2.5rem] shadow-xl border border-neutral-light/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-primary mb-3">Daftar Menjadi Mitra</h2>
            <p className="text-neutral-dark/70">Lengkapi profil usaha Anda di bawah ini dan mulai terima pesanan hari ini juga.</p>
          </div>

          <form className="space-y-10 relative z-10" action={action}>
            {state?.error && (
              <div className="rounded-2xl bg-red-50 p-5 text-sm text-red-800 border border-red-100 flex items-start gap-3">
                <span className="font-bold">Gagal:</span> {state.error}
              </div>
            )}

            {/* Bagian Akun */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-3 border-b border-neutral-light/30 pb-3">
                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">1</span>
                Informasi Pemilik
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold leading-6 text-primary mb-2">Nama Lengkap</label>
                  <input name="name" type="text" required className="block w-full rounded-xl bg-background border border-neutral-light/50 py-3.5 px-4 text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-all sm:text-sm shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold leading-6 text-primary mb-2">Alamat Email</label>
                  <input name="email" type="email" required className="block w-full rounded-xl bg-background border border-neutral-light/50 py-3.5 px-4 text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-all sm:text-sm shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold leading-6 text-primary mb-2">Nomor WhatsApp</label>
                  <input name="phone" type="tel" required className="block w-full rounded-xl bg-background border border-neutral-light/50 py-3.5 px-4 text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-all sm:text-sm shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold leading-6 text-primary mb-2">Kata Sandi</label>
                  <input name="password" type="password" required className="block w-full rounded-xl bg-background border border-neutral-light/50 py-3.5 px-4 text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-all sm:text-sm shadow-sm" />
                </div>
              </div>
            </div>

            {/* Bagian Toko */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-3 border-b border-neutral-light/30 pb-3">
                <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">2</span>
                Profil Usaha
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold leading-6 text-primary mb-2">Nama Usaha (Warung/Agen/Laundry)</label>
                  <input name="storeName" type="text" required placeholder="Misal: Warung Galon Pak Budi" className="block w-full rounded-xl bg-background border border-neutral-light/50 py-3.5 px-4 text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-all sm:text-sm shadow-sm" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-semibold leading-6 text-primary mb-2">Kecamatan/Area Layanan</label>
                  <input name="area" type="text" placeholder="Misal: Kebayoran Baru" required className="block w-full rounded-xl bg-background border border-neutral-light/50 py-3.5 px-4 text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-all sm:text-sm shadow-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold leading-6 text-primary mb-2">Alamat Lengkap Usaha</label>
                  <textarea name="address" rows={3} required placeholder="Jalan, RT/RW, Patokan..." className="block w-full rounded-xl bg-background border border-neutral-light/50 py-3.5 px-4 text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-all sm:text-sm resize-none shadow-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold leading-6 text-primary mb-2">Deskripsi Singkat (Opsional)</label>
                  <textarea name="description" rows={2} placeholder="Sedia galon merek apa saja? atau layanan laundry express?" className="block w-full rounded-xl bg-background border border-neutral-light/50 py-3.5 px-4 text-primary focus:ring-2 focus:ring-accent focus:border-accent transition-all sm:text-sm resize-none shadow-sm" />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-light/30">
              <button type="submit" disabled={isPending} className="flex w-full justify-center items-center gap-2 rounded-full bg-accent px-4 py-4 text-lg font-bold text-white shadow-xl hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100">
                {isPending ? "Memproses Pendaftaran..." : "Bergabung Sebagai Mitra"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-dark/70 relative z-10">
            Sudah terdaftar sebagai mitra? <Link href="/login" className="font-bold text-primary hover:text-accent transition-colors">Masuk ke Dasbor</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
