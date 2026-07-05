import Link from "next/link";
import { LayoutDashboard, Users, Store, ShoppingCart } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar Admin */}
      <aside className="hidden w-64 flex-col border-r bg-white sm:flex">
        <nav className="flex flex-1 flex-col gap-2 p-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/merchants"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <Store className="h-4 w-4" />
            Merchant
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <Users className="h-4 w-4" />
            Customer
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <ShoppingCart className="h-4 w-4" />
            Pesanan
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
