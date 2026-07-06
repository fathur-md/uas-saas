import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-light/20 bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-primary">
              <Image src="/logo.webp" alt="SiapSedia logo" width={24} height={24} className="rounded-md" />
              <span className="text-lg">Siap<span className="text-accent font-medium">Sedia</span></span>
            </Link>
            <p className="mt-4 text-sm text-neutral-dark/70 leading-relaxed">
              Platform SaaS marketplace kebutuhan rumah tangga Anda. Lebih dekat, lebih cepat.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-primary mb-4">Layanan</h3>
            <ul className="space-y-3 text-sm text-neutral-dark/70">
              <li><Link href="/register" className="hover:text-accent transition-colors">Pesan Galon</Link></li>
              <li><Link href="/register" className="hover:text-accent transition-colors">Pesan Gas</Link></li>
              <li><Link href="/register" className="hover:text-accent transition-colors">Layanan Laundry</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary mb-4">Perusahaan</h3>
            <ul className="space-y-3 text-sm text-neutral-dark/70">
              <li><Link href="/about" className="hover:text-accent transition-colors">Tentang Kami</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link href="/contact-us" className="hover:text-accent transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary mb-4">Merchant</h3>
            <ul className="space-y-3 text-sm text-neutral-dark/70">
              <li><Link href="/register/merchant" className="hover:text-accent transition-colors">Daftar Merchant</Link></li>
              <li><Link href="/login" className="hover:text-accent transition-colors">Masuk Merchant</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-neutral-light/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-dark/60">
          <p>&copy; {new Date().getFullYear()} SiapSedia. Hak cipta dilindungi.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
