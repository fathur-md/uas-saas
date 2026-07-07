"use client";
import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import { registerCustomer } from "@/app/actions/auth";
import { CheckCircle2 } from "lucide-react";

export default function RegisterCustomerPage() {
  const [state, action, isPending] = useActionState(registerCustomer, null);

  return (
    <div className="flex min-h-screen bg-white">
      {/* KIRI: Branding Visual (Hilang di Layar Kecil) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 text-4xl font-bold tracking-tight text-white transition-transform hover:scale-105 active:scale-95">
            <Image src="/logo.webp" alt="SiapSedia logo" width={40} height={40} className="rounded-lg shadow-sm" />
            <span>Siap<span className="text-accent font-medium">Sedia</span></span>
          </Link>
          <div className="mt-24 max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6 leading-tight">
              Kebutuhan Harian, <br />Lebih Dekat.
            </h1>
            <p className="text-lg text-neutral-light leading-relaxed">
              Bergabunglah dengan ratusan keluarga lainnya yang memercayakan kebutuhan galon, gas, dan laundry pada mitra lokal terpercaya.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-neutral-light"><CheckCircle2 className="text-accent w-6 h-6" /><span>Pesan dalam hitungan detik</span></div>
          <div className="flex items-center gap-3 text-neutral-light"><CheckCircle2 className="text-accent w-6 h-6" /><span>Dukung UMKM di sekitar Anda</span></div>
          <div className="flex items-center gap-3 text-neutral-light"><CheckCircle2 className="text-accent w-6 h-6" /><span>Pembayaran COD yang aman</span></div>
        </div>
      </div>

      {/* KANAN: Formulir Pendaftaran */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-primary transition-transform hover:scale-105 active:scale-95">
              <Image src="/logo.webp" alt="SiapSedia logo" width={32} height={32} className="rounded-md shadow-sm" />
              <span>Siap<span className="text-accent font-medium">Sedia</span></span>
            </Link>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-primary mb-2">Buat Akun Baru</h2>
          <p className="text-sm text-neutral-dark/70 mb-8">Lengkapi data Anda untuk mulai menikmati kemudahan.</p>

          <form className="space-y-5" action={action}>
            {state?.error && <div className="rounded-xl bg-red-50 p-4 border border-red-100 text-sm text-red-800">{state.error}</div>}

            <div>
              <label className="block text-sm font-medium leading-6 text-primary">Nama Lengkap</label>
              <input name="name" type="text" required className="mt-1 block w-full rounded-xl border-0 py-3 px-4 text-primary ring-1 ring-inset ring-neutral-light/50 bg-background/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-primary">Email</label>
              <input name="email" type="email" required className="mt-1 block w-full rounded-xl border-0 py-3 px-4 text-primary ring-1 ring-inset ring-neutral-light/50 bg-background/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-primary">No. Handphone (WA)</label>
              <input name="phone" type="tel" required className="mt-1 block w-full rounded-xl border-0 py-3 px-4 text-primary ring-1 ring-inset ring-neutral-light/50 bg-background/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-primary">Alamat Pengiriman Utama</label>
              <textarea name="address" rows={2} required className="mt-1 block w-full rounded-xl border-0 py-3 px-4 text-primary ring-1 ring-inset ring-neutral-light/50 bg-background/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-primary">Kata Sandi</label>
              <input name="password" type="password" required className="mt-1 block w-full rounded-xl border-0 py-3 px-4 text-primary ring-1 ring-inset ring-neutral-light/50 bg-background/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
            </div>

            <div className="pt-4">
              <button type="submit" disabled={isPending} className="w-full flex justify-center rounded-full bg-primary px-3 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-primary/90 transition-transform active:scale-[0.98]">
                {isPending ? "Memproses..." : "Daftar Sekarang"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-dark/70">
            Sudah punya akun? <Link href="/login" className="font-semibold text-accent hover:underline">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
