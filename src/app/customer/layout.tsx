import Link from "next/link";
import { LayoutDashboard, ShoppingCart, User } from "lucide-react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar Customer (Opsional/Bisa diubah ke Top Nav jika mau) */}
      <aside className="hidden w-64 flex-col border-r bg-white sm:flex">
        <nav className="flex flex-1 flex-col gap-2 p-4">
          <Link
            href="/customer/home"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <LayoutDashboard className="h-4 w-4" />
            Beranda
          </Link>
          <Link
            href="/customer/orders"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <ShoppingCart className="h-4 w-4" />
            Pesanan Saya
          </Link>
          <Link
            href="/customer/profile"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <User className="h-4 w-4" />
            Profil
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
