"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

export function CustomerSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/customer/home", label: "Beranda", icon: LayoutDashboard },
    { href: "/customer/orders", label: "Pesanan Saya", icon: ShoppingCart },
    { href: "/customer/profile", label: "Profil", icon: User },
  ];

  return (
    <nav className="flex flex-col gap-2 p-4">
      {/* Logo Desktop */}
      <div className="mb-6 px-2 pt-2">
        <Link href="/customer/home" className="flex items-center gap-2 group cursor-pointer w-fit">
          <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center shadow-md shadow-accent/20 group-hover:scale-105 group-hover:shadow-accent/40 transition-all duration-300">
            <User className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg text-primary tracking-tight group-hover:text-accent transition-colors duration-300">SiapSedia</span>
        </Link>
      </div>

      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname?.startsWith(link.href);
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
              isActive 
                ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105" 
                : "text-primary hover:bg-white hover:shadow-sm hover:text-accent"
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-neutral-dark group-hover:text-accent"}`} />
            {link.label}
          </Link>
        );
      })}
      
      {/* Logout Button */}
      <form action={logoutUser} className="mt-2 pt-2 border-t border-neutral-light/30">
        <button
          type="submit"
          className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 hover:shadow-sm transition-all duration-300 group"
        >
          <LogOut className="h-5 w-5 text-rose-500 group-hover:text-rose-600" />
          Keluar
        </button>
      </form>
    </nav>
  );
}

export function CustomerTopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/customer/home", label: "Beranda", icon: LayoutDashboard },
    { href: "/customer/orders", label: "Pesanan Saya", icon: ShoppingCart },
    { href: "/customer/profile", label: "Profil", icon: User },
  ];

  return (
    <>
      {/* Top Bar - Mobile Only */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-b border-neutral-light/50 shadow-sm z-40 flex items-center justify-between px-4">
        <Link href="/customer/home" className="flex items-center gap-2 group cursor-pointer">
          <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center shadow-md shadow-accent/20 group-hover:scale-105 group-hover:shadow-accent/40 transition-all duration-300">
            <User className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-primary tracking-tight group-hover:text-accent transition-colors duration-300">SiapSedia</span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-neutral-dark hover:text-primary transition-colors focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Slide-out Drawer & Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Drawer Content */}
          <div className="relative w-[280px] max-w-[80vw] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-neutral-light/30">
              <span className="font-bold text-primary">Menu</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-neutral-dark hover:bg-neutral-light/30 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname?.startsWith(link.href);
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? "bg-accent/10 text-accent" 
                        : "text-primary hover:bg-neutral-50 hover:text-accent"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-accent" : "text-neutral-dark"}`} />
                    {link.label}
                  </Link>
                );
              })}
              
              <form action={logoutUser} className="mt-auto pt-4 border-t border-neutral-light/30">
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all duration-300"
                >
                  <LogOut className="h-5 w-5 text-rose-500" />
                  Keluar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
