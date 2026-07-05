import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white sm:flex dark:border-gray-700 dark:bg-gray-800">
        <nav className="flex flex-1 flex-col gap-2 p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <Package className="h-4 w-4" />
            Produk
          </Link>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ShoppingCart className="h-4 w-4" />
            Pesanan
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <User className="h-4 w-4" />
            Profil
          </Link>
        </nav>
      </aside>

      {/* Konten Dashboard */}
      <main className="flex-1 bg-background text-foreground p-6">
        {children}
      </main>
    </div>
  );
}
