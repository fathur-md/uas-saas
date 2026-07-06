import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { logoutUser } from "@/app/actions/auth";
import { LogOut, LayoutDashboard } from "lucide-react";

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
    <header className="sticky top-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full bg-white/70 px-4 py-2.5 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 ring-1 ring-neutral-light/20">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-primary transition-opacity hover:opacity-80">
          <Image src="/logo.webp" alt="SiapSedia logo" width={28} height={28} className="rounded-md" />
          <span className="text-lg">Siap<span className="text-accent font-medium">Sedia</span></span>
        </Link>

        {/* Tautan Halaman Baru (Hanya tampil di Desktop agar rapi) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-dark/80">
          <Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link>
          <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
          <Link href="/contact-us" className="hover:text-primary transition-colors">Hubungi Kami</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user && role ? (
            <>
              <Link href={getDashboardPath(role)} className="flex items-center gap-1.5 text-sm font-medium text-neutral-dark hover:text-accent transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-dark/70 bg-background/50 px-2 py-1 rounded-full ring-1 ring-neutral-light/20">
                <span className="text-accent font-semibold">{getRoleLabel(role)}</span>
                <span className="w-px h-3 bg-neutral-light/50" />
                <span className="truncate max-w-[100px]">{user.name}</span>
              </div>
              <form action={logoutUser}>
                <button type="submit" className="flex items-center justify-center rounded-full p-2 text-neutral-dark hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer" title="Keluar">
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/register/merchant" className="hidden md:block text-sm font-medium text-accent hover:text-accent/80 transition-colors px-2">
                Jadi Mitra
              </Link>
              <div className="hidden md:block w-px h-4 bg-neutral-light/50 mx-1" />
              <Link href="/login" className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors px-2">
                Masuk
              </Link>
              <Link href="/register" className="text-sm font-medium px-5 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all shadow-sm hover:shadow-md">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
