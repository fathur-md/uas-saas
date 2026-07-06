import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { logoutUser } from "@/app/actions/auth";
import { LogOut, LayoutDashboard } from "lucide-react";

function getDashboardPath(role: string): string {
  switch (role) {
    case "CUSTOMER":
      return "/customer/home";
    case "MERCHANT":
      return "/merchant/dashboard";
    case "ADMIN":
      return "/admin/dashboard";
    default:
      return "/";
  }
}

function getRoleLabel(role: string): string {
  switch (role) {
    case "CUSTOMER":
      return "Customer";
    case "MERCHANT":
      return "Merchant";
    case "ADMIN":
      return "Admin";
    default:
      return "";
  }
}

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const role = (user as any)?.role as string | undefined;

  return (
    <header className="sticky top-0 p-2 z-50">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between pl-2 pr-4 rounded-2xl bg-white/50 border border-neutral-light/30 backdrop-blur-sm shadow-xs">
        <Link href="/" className="flex items-center font-bold tracking-tight">
          <Image
            src="/logo.webp"
            alt="SiapSedia logo"
            width={32}
            height={32}
            className="rounded-md mr-1"
          />
          <span className="brand-glass text-lg">SiapSedia</span>
        </Link>

        <nav className="flex items-center gap-3">
          {user && role ? (
            <>
              <Link
                href={getDashboardPath(role)}
                className="flex items-center gap-1.5 text-sm font-medium text-neutral-dark hover:text-accent transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-dark/70">
                <span className="px-1.5 py-0.5 rounded-md bg-accent/10 text-accent font-medium">
                  {getRoleLabel(role)}
                </span>
                <span className="truncate max-w-[120px]">{user.name}</span>
              </div>
              <form action={logoutUser}>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-dark hover:text-accent transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium px-3 py-1.5 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
              >
                Daftar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
