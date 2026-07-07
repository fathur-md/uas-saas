"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

interface MobileMenuProps {
  user: any;
  role: string | undefined;
  dashboardPath: string;
}

export default function NavbarMobileMenu({ user, role, dashboardPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center ml-2 relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 text-neutral-dark/70 hover:bg-neutral-100 rounded-full transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-[120%] right-0 w-56 bg-white shadow-xl rounded-2xl p-2 border border-neutral-light/20 flex flex-col gap-1 z-50">
            {/* Menu links */}
            <Link href="/about" onClick={() => setIsOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-neutral-dark hover:bg-neutral-50 rounded-xl transition-colors">Tentang</Link>
            <Link href="/faq" onClick={() => setIsOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-neutral-dark hover:bg-neutral-50 rounded-xl transition-colors">FAQ</Link>
            <Link href="/contact-us" onClick={() => setIsOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-neutral-dark hover:bg-neutral-50 rounded-xl transition-colors">Kontak</Link>
            
            <div className="h-px bg-neutral-light/30 my-1 mx-2" />
            
            {user && role ? (
              <>
                <Link href={dashboardPath} onClick={() => setIsOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-neutral-dark hover:bg-neutral-50 hover:text-accent rounded-xl transition-colors">Dashboard</Link>
                <form action={logoutUser} className="w-full">
                  <button type="submit" className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 transition-colors">
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/mitra" onClick={() => setIsOpen(false)} className="px-4 py-2.5 text-sm font-bold text-accent bg-accent/5 hover:bg-accent hover:text-white rounded-xl transition-colors">Jadi Mitra</Link>
                <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-primary hover:bg-neutral-50 rounded-xl flex items-center gap-2 transition-colors mt-1">
                  <LogIn className="w-4 h-4" /> Masuk / Daftar
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
