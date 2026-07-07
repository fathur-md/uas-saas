"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Store, Settings, LogOut, ClipboardList, Menu, X, ShieldCheck, CreditCard } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Pengguna", icon: Users },
    { href: "/admin/orders", label: "Pesanan", icon: ClipboardList },
    { href: "/admin/merchants", label: "Merchant", icon: Store },
    { href: "/admin/subscriptions", label: "Langganan", icon: CreditCard },
    { href: "/admin/settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="flex min-h-dvh bg-white selection:bg-blue-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-neutral-100 bg-white justify-between z-10 sticky top-0 h-screen">
        <div>
          <Link href="/admin/dashboard" className="h-16 flex items-center px-8 border-b border-neutral-100 group cursor-pointer transition-colors hover:bg-neutral-50/50">
            <span className="font-semibold text-lg text-neutral-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              SiapSedia <span className="font-light text-neutral-400">Admin</span>
            </span>
          </Link>
          
          <nav className="flex flex-col gap-1 p-5 mt-2">
            <div className="px-3 mb-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              Platform
            </div>
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50/60 text-blue-700"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <Icon className={`h-[18px] w-[18px] ${isActive ? "text-blue-600" : "text-neutral-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-5">
          <form action={logoutUser}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors group"
            >
              <LogOut className="h-[18px] w-[18px] text-neutral-400 group-hover:text-red-500" strokeWidth={2} />
              Keluar Sesi
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-neutral-100 z-40 flex items-center justify-between px-4">
        <Link href="/admin/dashboard" className="font-semibold text-neutral-900 tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-blue-600" />
          <span>SiapSedia <span className="font-light text-neutral-400">Admin</span></span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900 transition-colors focus:outline-none"
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      {/* Slide-out Drawer for Mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-neutral-900/20 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="relative w-[280px] max-w-[80vw] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 h-16 border-b border-neutral-100">
              <span className="font-semibold text-neutral-900 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                Menu
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1 mt-2">
              <div className="px-3 mb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Platform
              </div>
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-blue-50/60 text-blue-700" 
                        : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    <Icon className={`h-[18px] w-[18px] ${isActive ? "text-blue-600" : "text-neutral-400"}`} strokeWidth={isActive ? 2.5 : 2} />
                    {link.label}
                  </Link>
                );
              })}
              
              <form action={logoutUser} className="mt-auto pt-4 pb-2">
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors group"
                >
                  <LogOut className="h-[18px] w-[18px] text-neutral-400 group-hover:text-red-500" strokeWidth={2} />
                  Keluar Sesi
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 text-neutral-900 p-6 pt-24 md:p-10 md:pt-10 w-full max-w-[100vw] overflow-x-hidden min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
