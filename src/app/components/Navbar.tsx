import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { logoutUser } from "@/app/actions/auth";
import { LogOut, LayoutDashboard, LogIn } from "lucide-react";

function getDashboardPath(role: string): string {
  switch (role) {
    case "CUSTOMER": return "/customer/home";
    case "MERCHANT": return "/merchant/dashboard";
    case "ADMIN": return "/admin/dashboard";
    default: return "/";
  }
}

function getRoleLabel(role: string): string {
  switch (role) {
    case "CUSTOMER": return "Customer";
    case "MERCHANT": return "Merchant";
    case "ADMIN": return "Admin";
    default: return "";
  }
}

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const role = (user as any)?.role as string | undefined;

  return (
    <header className="sticky top-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <div className="pointer-events-auto flex w-full max-w-4xl items-center justify-between rounded-full bg-white/70 px-4 py-3 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 ring-1 ring-neutral-light/20">
        
        {/* KIRI: LOGO */}
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-primary transition-transform hover:scale-105 active:scale-95 ml-2">
          <Image src="/logo.webp" alt="SiapSedia logo" width={24} height={24} className="rounded-md" />
          <span className="text-base sm:text-lg">Siap<span className="text-accent font-medium">Sedia</span></span>
        </Link>

        {/* KANAN: NAVIGASI & AKSI */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* TAUTAN NAVIGASI (Rapat ke Kanan) */}
          <nav className="hidden md:flex items-center gap-4 text-[13px] font-semibold text-neutral-dark/50 uppercase tracking-widest">
            <Link href="/about" className="hover:text-primary transition-colors">Tentang</Link>
            <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link href="/contact-us" className="hover:text-primary transition-colors">Kontak</Link>
          </nav>

          {/* Pemisah antara Navigasi & Ikon Auth */}
          <div className="w-px h-5 bg-neutral-light/40 hidden md:block" />

          {/* AKSI KANAN */}
          <div className="flex items-center gap-1">
          {user && role ? (
            <>
              <Link href={getDashboardPath(role)} className="hidden sm:flex items-center px-4 py-2 text-sm font-semibold text-neutral-dark hover:text-accent transition-colors rounded-full hover:bg-neutral-50">
                Dashboard
              </Link>
              <div className="w-px h-4 bg-neutral-light/40 mx-2 hidden sm:block" />
              <form action={logoutUser}>
                <button type="submit" className="flex items-center justify-center rounded-full p-2 text-neutral-dark/50 hover:bg-red-50 hover:text-red-600 transition-colors" title="Keluar">
                  <LogOut className="h-5 w-5" />
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/mitra" className="hidden sm:flex items-center justify-center rounded-full px-4 py-1.5 text-[13px] font-bold text-accent bg-accent/10 hover:bg-accent hover:text-white transition-colors mr-2 shadow-sm">
                Jadi Mitra
              </Link>
              <Link href="/login" className="flex items-center justify-center rounded-full p-2 text-neutral-dark/60 hover:bg-neutral-100 hover:text-primary transition-colors" title="Masuk / Daftar">
                <LogIn className="h-5 w-5" />
              </Link>
            </>
          )}
        </div>
      </div>
      </div>
    </header>
  );
}
