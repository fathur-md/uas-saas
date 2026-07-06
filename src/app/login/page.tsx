"use client";

import Link from "next/link";
import { useActionState, Suspense } from "react";
import { loginUser } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const [state, action, isPending] = useActionState(loginUser, null);
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
          Masuk ke Akun Anda
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        {isRegistered && !state?.error && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200">
            <div className="text-sm text-green-700">
              Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.
            </div>
          </div>
        )}

        {state?.error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="text-sm text-red-700">{state.error}</div>
          </div>
        )}

        <form className="space-y-6" action={action}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary">
              Alamat Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-primary">
                Kata Sandi
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-lg border-0 py-2.5 text-base text-primary shadow-sm ring-1 ring-inset ring-neutral-light placeholder:text-neutral-light focus:ring-2 focus:ring-inset focus:ring-accent sm:py-2 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-lg bg-accent px-3 py-2.5 text-base sm:py-2 sm:text-sm font-semibold leading-6 text-white shadow-sm hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isPending ? "Memeriksa..." : "Masuk"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-neutral-dark">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold leading-6 text-accent hover:underline">
            Daftar Customer
          </Link>
          {" "}atau{" "}
          <Link href="/register/merchant" className="font-semibold leading-6 text-accent hover:underline">
            Daftar Merchant
          </Link>
        </p>
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
