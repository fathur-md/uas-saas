import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 text-center -mt-24 pt-24">
      {/* Latar belakang gradien lembut */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-white -z-10" />
      <div className="absolute top-0 w-full h-[500px] bg-accent/5 blur-[100px] rounded-full -translate-y-1/2 -z-10" />

      {/* Konten Utama */}
      <div className="z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-7xl md:text-8xl">
          Siap<span className="text-accent font-medium">Sedia</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-dark/80 sm:text-xl md:text-2xl leading-relaxed font-light">
          Kebutuhan rumah tangga dalam satu sentuhan. 
          <br className="hidden sm:block" />
          Pesan galon, gas, dan laundry dengan mudah.
        </p>
        
        {/* Tombol Aksi */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/register"
            className="w-full sm:w-auto rounded-full bg-primary px-8 py-3.5 text-sm sm:text-base font-medium text-white shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300"
          >
            Mulai Sekarang
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto rounded-full bg-white/80 backdrop-blur-md px-8 py-3.5 text-sm sm:text-base font-medium text-primary shadow-sm ring-1 ring-neutral-light/30 hover:bg-neutral-50 hover:scale-105 transition-all duration-300"
          >
            Masuk
          </Link>
        </div>
      </div>

      {/* Elemen Dekoratif Minimalis */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-neutral-light">
        <p className="text-xs uppercase tracking-widest font-medium mb-2">Scroll</p>
        <div className="w-px h-8 bg-neutral-light mx-auto" />
      </div>
    </section>
  );
}
