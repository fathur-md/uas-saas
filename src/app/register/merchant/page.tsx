"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerMerchant } from "@/app/actions/auth";

export default function RegisterMerchantPage() {
  const [state, action, isPending] = useActionState(registerMerchant, null);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
          Daftar sebagai Mitra Merchant
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-dark">
          Bergabunglah dengan SiapSedia dan kembangkan bisnis Anda. (Mendapatkan 10 kuota pesanan gratis setiap bulan)
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl bg-background p-8 shadow-sm rounded-xl border border-neutral-light">
        <form className="space-y-8" action={action}>

          {state?.error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <div className="text-sm text-red-700">{state.error}</div>
            </div>
          )}

          {/* Akun Section */}
          <div>
            <h3 className="text-base font-semibold leading-7 text-primary">Informasi Akun</h3>
            <p className="mt-1 text-sm leading-6 text-neutral-dark">Digunakan untuk masuk ke dalam aplikasi.</p>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-primary">Nama Pemilik</label>
                <input id="name" name="name" type="text" required className="mt-2 block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary">Alamat Email</label>
                <input id="email" name="email" type="email" required className="mt-2 block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-primary">Nomor Handphone Pemilik</label>
                <input id="phone" name="phone" type="tel" required className="mt-2 block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-primary">Kata Sandi</label>
                <input id="password" name="password" type="password" required className="mt-2 block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
              </div>
            </div>
          </div>

          <hr className="border-neutral-light" />

          {/* Toko Section */}
          <div>
            <h3 className="text-base font-semibold leading-7 text-primary">Profil Toko</h3>
            <p className="mt-1 text-sm leading-6 text-neutral-dark">Informasi ini akan ditampilkan kepada calon pelanggan Anda.</p>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="storeName" className="block text-sm font-medium leading-6 text-primary">Nama Toko</label>
                <input id="storeName" name="storeName" type="text" required className="mt-2 block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="area" className="block text-sm font-medium leading-6 text-primary">Kecamatan / Area</label>
                <input id="area" name="area" type="text" placeholder="Misal: Kebayoran Baru" required className="mt-2 block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-primary">Alamat Lengkap Toko</label>
                <textarea id="address" name="address" rows={3} required className="mt-2 block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-primary">Deskripsi Singkat (Opsional)</label>
                <textarea id="description" name="description" rows={2} className="mt-2 block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-lg bg-accent px-3 py-2.5 text-base sm:py-2 sm:text-sm font-semibold leading-6 text-white shadow-sm hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isPending ? "Mengirim Pendaftaran..." : "Kirim Pendaftaran Merchant"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-dark">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold leading-6 text-accent hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
