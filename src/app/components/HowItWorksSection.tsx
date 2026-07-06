import { Search, ClipboardList, CircleCheckBig } from "lucide-react";

const steps = [
  { icon: Search, label: "Cari", desc: "Pilih area & kategori layanan yang Anda butuhkan" },
  { icon: ClipboardList, label: "Pesan", desc: "Pilih merchant, tentukan produk & atur pengiriman" },
  { icon: CircleCheckBig, label: "Selesai", desc: "Merchant proses & antar pesanan ke rumah Anda" },
];

export default function HowItWorksSection() {
  return (
    <section className="border-t border-neutral-light/20 bg-white/30 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-3 text-center text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          Bagaimana Cara Kerjanya?
        </h2>
        <p className="mb-12 text-center text-sm text-neutral-dark sm:text-base">
          Tiga langkah mudah untuk memesan kebutuhan rumah tangga
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="relative text-center">
                <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent/5">
                  <Icon className="size-7 text-accent" />
                </div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 flex size-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-primary">
                  {s.label}
                </h3>
                <p className="mt-1.5 text-base text-neutral-dark">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
