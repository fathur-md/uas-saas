"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, User, LogOut, Store, Menu, X } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/merchant/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/merchant/products", label: "Produk", icon: Package },
    { href: "/merchant/orders", label: "Pesanan", icon: ShoppingCart },
    { href: "/merchant/profile", label: "Profil", icon: User },
  ];

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-neutral-light/50 bg-white justify-between shadow-sm z-10">
        <div>
          <Link href="/merchant/dashboard" className="h-16 flex items-center px-6 border-b border-neutral-light/50 group cursor-pointer">
            <span className="font-bold text-lg text-primary tracking-tight flex items-center gap-2 group-hover:text-accent transition-colors">
              <div className="p-1 rounded-md bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Store className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
              </div>
              SiapSedia <span className="font-normal text-neutral-dark">Pro</span>
            </span>
          </Link>
          <nav className="flex flex-col gap-1 p-4">
            <div className="px-2 mb-2 text-xs font-bold text-neutral-dark/50 uppercase tracking-wider">
              Menu Utama
            </div>
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-neutral-dark hover:bg-neutral-50 hover:text-primary"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-accent" : "text-neutral-dark/70"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-neutral-light/50">
          <form action={logoutUser}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-light/50 shadow-sm z-40 flex items-center justify-between px-4">
        <Link href="/merchant/dashboard" className="font-bold text-primary tracking-tight flex items-center gap-2 group cursor-pointer">
          <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <Store className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
          </div>
          <span className="group-hover:text-accent transition-colors">SiapSedia Pro</span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-neutral-dark hover:text-primary transition-colors focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Slide-out Drawer for Mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="relative w-[280px] max-w-[80vw] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-neutral-light/50 h-16">
              <span className="font-bold text-primary flex items-center gap-2">
                <Store className="h-5 w-5 text-accent" />
                Menu
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-neutral-dark hover:bg-neutral-50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              <div className="px-2 mb-2 text-xs font-bold text-neutral-dark/50 uppercase tracking-wider">
                Menu Utama
              </div>
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-accent/10 text-accent font-semibold" 
                        : "text-neutral-dark hover:bg-neutral-50 hover:text-primary"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-accent" : "text-neutral-dark/70"}`} />
                    {link.label}
                  </Link>
                );
              })}
              
              <form action={logoutUser} className="mt-auto pt-4 border-t border-neutral-light/50">
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="h-5 w-5 text-rose-500" />
                  Keluar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 text-foreground p-4 pt-20 md:p-8 md:pt-8 w-full max-w-[100vw] mx-auto overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
