"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerCustomer } from "@/app/actions/auth";

export default function RegisterCustomerPage() {
  const [state, action, isPending] = useActionState(registerCustomer, null);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
          Daftar sebagai Customer
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" action={action}>

          {state?.error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <div className="text-sm text-red-700">{state.error}</div>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-primary">
              Nama Lengkap
            </label>
            <div className="mt-2">
              <input id="name" name="name" type="text" required className="block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary">
              Alamat Email
            </label>
            <div className="mt-2">
              <input id="email" name="email" type="email" required className="block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-primary">
              Nomor Handphone (WA)
            </label>
            <div className="mt-2">
              <input id="phone" name="phone" type="tel" required className="block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-primary">
              Alamat Pengiriman Utama
            </label>
            <div className="mt-2">
              <textarea id="address" name="address" rows={3} required className="block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-primary">
              Kata Sandi
            </label>
            <div className="mt-2">
              <input id="password" name="password" type="password" required className="block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-lg bg-accent px-3 py-2.5 text-base sm:py-2 sm:text-sm font-semibold leading-6 text-white shadow-sm hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isPending ? "Mendaftarkan..." : "Daftar Sekarang"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-neutral-dark">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold leading-6 text-accent hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
