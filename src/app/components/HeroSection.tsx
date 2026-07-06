import Link from "next/link";
import { Droplets, Flame, Shirt } from "lucide-react";

const floaters = [
  {
    Icon: Droplets,
    className: "top-20 left-10 sm:left-20 size-10 sm:size-14 rotate-12"
  },
  {
    Icon: Flame,
    className: "bottom-32 right-10 sm:right-20 size-11 sm:size-16 -rotate-12"
  },
  {
    Icon: Shirt,
    className: "top-40 right-12 sm:right-28 size-9 sm:size-12 rotate-45"
  }
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-1/3 left-1/2 -translate-x-1/2 size-120 rounded-full bg-accent/5 blur-3xl" />
      {floaters.map(({ Icon, className }) => (
        <div
          key={className}
          className={`pointer-events-none absolute text-accent/10 ${className}`}
        >
          <Icon className="size-full" />
        </div>
      ))}
      <h1 className="relative text-6xl font-semibold tracking-tight sm:text-8xl brand-glass">
        Siap<span className="font-light">Sedia</span>
      </h1>
      <p className="relative mt-8 max-w-2xl text-xl leading-relaxed text-neutral-dark sm:text-2xl">
        Marketplace lokal untuk kebutuhan harian rumah tangga Anda. Pesan galon,
        gas, atau layanan laundry dari merchant terdekat.
      </p>
      <div className="relative mt-12 flex items-center justify-center gap-4">
        <Link
          href="/register"
          className="rounded-xl bg-accent px-6 py-3 text-base font-semibold text-white shadow-sm hover:brightness-110 transition-all"
        >
          Daftar Gratis
        </Link>
        <Link
          href="/login"
          className="rounded-xl border border-neutral-light bg-white/60 px-6 py-3 text-base font-semibold text-primary shadow-sm hover:bg-white/80 transition-all"
        >
          Masuk
        </Link>
      </div>
    </section>
  );
}
