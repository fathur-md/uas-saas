import Link from "next/link";
import { LayoutDashboard, Users, Store, Settings, LogOut, ClipboardList } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <aside className="hidden w-64 flex-col border-r border-neutral-light bg-background sm:flex justify-between">
        <nav className="flex flex-col gap-2 p-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-neutral-light/30"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-neutral-light/30"
          >
            <Users className="h-4 w-4" />
            Kelola Pengguna
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-neutral-light/30"
          >
            <ClipboardList className="h-4 w-4" />
            Semua Pesanan
          </Link>
          <Link
            href="/admin/merchants"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-neutral-light/30"
          >
            <Store className="h-4 w-4" />
            Persetujuan Merchant
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-neutral-light/30"
          >
            <Settings className="h-4 w-4" />
            Pengaturan
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

      <main className="flex-1 bg-background text-foreground p-4 sm:p-6 w-full max-w-[100vw]">
        {/* Mobile Navigation (HTML5 Details) */}
        <div className="sm:hidden mb-6 relative">
          <details className="group z-40">
            <summary className="flex justify-between items-center bg-background border border-neutral-light p-3 rounded-xl shadow-sm cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="font-semibold text-primary flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" /> Menu Admin
              </span>
              <div className="p-1.5 bg-neutral-light/20 text-primary rounded-lg">
                <svg className="h-5 w-5 group-open:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                <svg className="h-5 w-5 hidden group-open:block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </div>
            </summary>
            
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-neutral-light rounded-xl shadow-lg p-4 flex flex-col gap-2 z-50">
              <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-primary hover:bg-neutral-light/30">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
              <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-primary hover:bg-neutral-light/30">
                <Users className="h-4 w-4" /> Kelola Pengguna
              </Link>
              <Link href="/admin/orders" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-primary hover:bg-neutral-light/30">
                <ClipboardList className="h-4 w-4" /> Semua Pesanan
              </Link>
              <Link href="/admin/merchants" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-primary hover:bg-neutral-light/30">
                <Store className="h-4 w-4" /> Persetujuan Merchant
              </Link>
              <Link href="/admin/settings" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-primary hover:bg-neutral-light/30">
                <Settings className="h-4 w-4" /> Pengaturan
              </Link>
              <div className="border-t border-neutral-light mt-2 pt-2">
                <form action={logoutUser}>
                  <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" /> Keluar
                  </button>
                </form>
              </div>
            </div>
          </details>
        </div>

        {children}
      </main>
    </div>
  );
}
