"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState, Suspense } from "react";
import { loginUser } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";

function LoginForm() {
  const [state, action, isPending] = useActionState(loginUser, null);
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  return (
    <div className="flex min-h-screen bg-white">
      {/* KIRI: Branding Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-dark relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 text-4xl font-bold tracking-tight text-white transition-transform hover:scale-105 active:scale-95">
            <Image src="/logo.webp" alt="SiapSedia logo" width={40} height={40} className="rounded-lg shadow-sm" />
            <span>Siap<span className="text-accent font-medium">Sedia</span></span>
          </Link>
          <div className="mt-24 max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6 leading-tight">
              Selamat Datang Kembali.
            </h1>
            <p className="text-lg text-neutral-light leading-relaxed">
              Masuk ke akun Anda untuk melanjutkan aktivitas pemesanan, atau kelola toko Anda jika Anda seorang Mitra.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-neutral-light">
            <LogIn className="text-accent w-6 h-6" />
            <span>Akses cepat ke riwayat pesanan Anda</span>
          </div>
        </div>
      </div>

      {/* KANAN: Formulir Login */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-primary transition-transform hover:scale-105 active:scale-95">
              <Image src="/logo.webp" alt="SiapSedia logo" width={32} height={32} className="rounded-md shadow-sm" />
              <span>Siap<span className="text-accent font-medium">Sedia</span></span>
            </Link>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-primary mb-2">Masuk</h2>
          <p className="text-sm text-neutral-dark/70 mb-8">Silakan isi email dan kata sandi Anda.</p>

          <form className="space-y-5" action={action}>
            {isRegistered && !state?.error && (
              <div className="rounded-xl bg-green-50 p-4 border border-green-100 text-sm font-medium text-green-800 mb-4">
                Pendaftaran berhasil! Silakan masuk.
              </div>
            )}
            
            {state?.error && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-100 text-sm text-red-800 mb-4">
                {state.error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium leading-6 text-primary">Alamat Email</label>
              <input name="email" type="email" required className="mt-1 block w-full rounded-xl border-0 py-3 px-4 text-primary ring-1 ring-inset ring-neutral-light/50 bg-background/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-primary">Kata Sandi</label>
              </div>
              <input name="password" type="password" required className="mt-1 block w-full rounded-xl border-0 py-3 px-4 text-primary ring-1 ring-inset ring-neutral-light/50 bg-background/50 focus:ring-2 focus:ring-accent transition-all sm:text-sm" />
            </div>

            <div className="pt-4">
              <button type="submit" disabled={isPending} className="flex w-full justify-center rounded-full bg-primary px-3 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-primary/90 transition-transform active:scale-[0.98]">
                {isPending ? "Memeriksa..." : "Masuk"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-dark/70 flex flex-col gap-2">
            <p>
              Belum punya akun? <Link href="/register" className="font-semibold text-accent hover:underline">Daftar Customer</Link>
            </p>
            <p>
              Ingin berjualan? <Link href="/mitra" className="font-semibold text-accent hover:underline">Daftar Merchant</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
