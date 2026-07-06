import Link from "next/link";
import { LayoutDashboard, ShoppingCart, User, LogOut } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <aside className="hidden w-64 flex-col border-r border-neutral-light bg-background sm:flex justify-between">
        <nav className="flex flex-col gap-2 p-4">
          <Link
            href="/customer/home"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-neutral-light/30"
          >
            <LayoutDashboard className="h-4 w-4" />
            Beranda
          </Link>
          <Link
            href="/customer/orders"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-neutral-light/30"
          >
            <ShoppingCart className="h-4 w-4" />
            Pesanan Saya
          </Link>
          <Link
            href="/customer/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-neutral-light/30"
          >
            <User className="h-4 w-4" />
            Profil
          </Link>
        </nav>

        <div className="p-4 border-t border-neutral-light">
          <form action={logoutUser}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 bg-background text-foreground p-4 pb-24 sm:p-6 sm:pb-6">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-neutral-light shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <nav className="flex justify-around items-center h-16 pb-1">
          <Link
            href="/customer/home"
            className="flex flex-col items-center justify-center w-full h-full text-primary hover:text-accent transition-colors"
          >
            <LayoutDashboard className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Beranda</span>
          </Link>
          <Link
            href="/customer/orders"
            className="flex flex-col items-center justify-center w-full h-full text-primary hover:text-accent transition-colors"
          >
            <ShoppingCart className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Pesanan</span>
          </Link>
          <Link
            href="/customer/profile"
            className="flex flex-col items-center justify-center w-full h-full text-primary hover:text-accent transition-colors"
          >
            <User className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Profil</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
