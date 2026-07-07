"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ConditionalNavbar({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Sembunyikan navbar di halaman auth dan dashboard
  if (
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/merchant") ||
    pathname?.startsWith("/customer")
  ) {
    return null;
  }

  return <>{children}</>;
}
