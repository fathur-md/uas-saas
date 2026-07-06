import { Droplets, Flame, Shirt } from "lucide-react";

const services = [
  { icon: Droplets, label: "Galon Air", desc: "Air minum isi ulang & merek pilihan, diantar ke depan pintu." },
  { icon: Flame, label: "Gas LPG", desc: "Berbagai ukuran tabung gas untuk kebutuhan dapur Anda." },
  { icon: Shirt, label: "Laundry", desc: "Layanan cuci bersih, wangi, dan rapi dalam waktu singkat." },
];

export default function ServicesSection() {
  return (
    <section className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Layanan Kami
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-dark/70">
            Penuhi kebutuhan harian Anda tanpa harus keluar rumah.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col bg-background/50 rounded-3xl p-8 ring-1 ring-neutral-light/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-neutral-light/20">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold leading-7 text-primary">
                    {s.label}
                  </h3>
                  <p className="mt-3 flex-auto text-base leading-7 text-neutral-dark/80">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
