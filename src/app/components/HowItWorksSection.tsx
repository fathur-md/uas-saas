import { Search, ClipboardList, CircleCheckBig } from "lucide-react";

const steps = [
  { icon: Search, label: "Temukan", desc: "Cari layanan di area sekitar Anda." },
  { icon: ClipboardList, label: "Pesan", desc: "Pilih produk dan tentukan pengiriman." },
  { icon: CircleCheckBig, label: "Terima", desc: "Pesanan diantar langsung ke rumah." },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Cara Kerja
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-dark/70">
            Tiga langkah mudah menuju kemudahan.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="relative flex flex-col items-center text-center p-8 group">
                <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-light/20 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
                  <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-md">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold leading-7 text-primary">
                  {s.label}
                </h3>
                <p className="mt-2 text-base leading-7 text-neutral-dark/70">
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
