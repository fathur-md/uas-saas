"use client";
import Link from "next/link";
import { useActionState } from "react";
import { registerMerchant } from "@/app/actions/auth";
import { Store, TrendingUp, Users } from "lucide-react";

export default function RegisterMerchantPage() {
  const [state, action, isPending] = useActionState(registerMerchant, null);

  return (
    <div className="flex min-h-screen bg-white">
      {/* KIRI: Branding Merchant */}
      <div className="hidden lg:flex lg:w-[45%] bg-accent relative flex-col justify-between p-12 overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="text-3xl font-bold tracking-tight text-white">Siap<span className="text-primary">Sedia</span></Link>
          <div className="mt-24 max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6 leading-tight">
              Tumbuhkan Bisnis <br/>Anda Bersama Kami.
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Kelola pesanan galon, gas, dan laundry dengan mudah. Jangkau pelanggan baru di sekitar area Anda.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4 text-white">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"><Store className="w-6 h-6"/></div>
            <div><h4 className="font-semibold text-lg">Kelola Toko Online</h4><p className="text-white/70 text-sm">Terima pesanan secara real-time.</p></div>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"><TrendingUp className="w-6 h-6"/></div>
            <div><h4 className="font-semibold text-lg">Tanpa Biaya Tersembunyi</h4><p className="text-white/70 text-sm">10 pesanan pertama gratis tiap bulan.</p></div>
          </div>
        </div>
      </div>

      {/* KANAN: Formulir Merchant */}
      <div className="flex w-full lg:w-[55%] flex-col justify-center items-center px-6 py-12 bg-background">
        <div className="w-full max-w-2xl">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="text-3xl font-bold tracking-tight text-primary">
              Siap<span className="text-accent">Sedia</span>
            </Link>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-primary mb-2">Daftar Mitra Merchant</h2>
          <p className="text-sm text-neutral-dark/70 mb-10">Lengkapi profil usaha Anda untuk mulai menerima pesanan.</p>

          <form className="space-y-10" action={action}>
            {state?.error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-800">{state.error}</div>}

            {/* Bagian Akun */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1 border-b border-neutral-light/30 pb-2">1. Informasi Pemilik</h3>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium leading-6 text-primary">Nama Pemilik</label>
                  <input name="name" type="text" required className="mt-1 block w-full rounded-xl bg-white border-0 py-3 px-4 ring-1 ring-inset ring-neutral-light/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-primary">Alamat Email</label>
                  <input name="email" type="email" required className="mt-1 block w-full rounded-xl bg-white border-0 py-3 px-4 ring-1 ring-inset ring-neutral-light/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-primary">Nomor Handphone</label>
                  <input name="phone" type="tel" required className="mt-1 block w-full rounded-xl bg-white border-0 py-3 px-4 ring-1 ring-inset ring-neutral-light/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-primary">Kata Sandi</label>
                  <input name="password" type="password" required className="mt-1 block w-full rounded-xl bg-white border-0 py-3 px-4 ring-1 ring-inset ring-neutral-light/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
                </div>
              </div>
            </div>

            {/* Bagian Toko */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1 border-b border-neutral-light/30 pb-2">2. Profil Usaha</h3>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-primary">Nama Toko</label>
                  <input name="storeName" type="text" required className="mt-1 block w-full rounded-xl bg-white border-0 py-3 px-4 ring-1 ring-inset ring-neutral-light/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium leading-6 text-primary">Kecamatan/Area</label>
                  <input name="area" type="text" placeholder="Misal: Kebayoran Baru" required className="mt-1 block w-full rounded-xl bg-white border-0 py-3 px-4 ring-1 ring-inset ring-neutral-light/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-primary">Alamat Lengkap Toko</label>
                  <textarea name="address" rows={2} required className="mt-1 block w-full rounded-xl bg-white border-0 py-3 px-4 ring-1 ring-inset ring-neutral-light/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm resize-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium leading-6 text-primary">Deskripsi Singkat (Opsional)</label>
                  <textarea name="description" rows={2} className="mt-1 block w-full rounded-xl bg-white border-0 py-3 px-4 ring-1 ring-inset ring-neutral-light/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm resize-none" />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" disabled={isPending} className="flex w-full justify-center rounded-full bg-accent px-3 py-4 text-base font-semibold text-white shadow-lg hover:bg-accent/90 active:scale-[0.99] transition-transform">
                {isPending ? "Mendaftarkan..." : "Bergabung Sekarang"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-dark/70">
            Sudah terdaftar sebagai mitra? <Link href="/login" className="font-semibold text-primary hover:underline">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
