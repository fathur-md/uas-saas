import { Droplets, Flame, Shirt } from "lucide-react";

const services = [
  { icon: Droplets, label: "Galon Air", desc: "Air minum isi ulang & galon branded" },
  { icon: Flame, label: "Gas LPG", desc: "Gas 3 kg, 5.5 kg & 12 kg" },
  { icon: Shirt, label: "Laundry", desc: "Cuci kering, setrika & express" },
];

export default function ServicesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <h2 className="mb-3 text-center text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
        Layanan Kami
      </h2>
      <p className="mb-12 text-center text-sm text-neutral-dark sm:text-base">
        Kebutuhan rumah tangga yang bisa Anda pesan
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="group rounded-2xl border border-neutral-light/30 bg-white/40 p-6 backdrop-blur-xs transition-colors hover:border-accent/30"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
                <Icon className="size-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary">
                {s.label}
              </h3>
              <p className="mt-1.5 text-base text-neutral-dark">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mt-14 text-center text-sm font-light tracking-widest text-neutral-light">
        — dan masih banyak layanan lain yang akan hadir —
      </p>
    </section>
  );
}
