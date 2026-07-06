"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Sembunyikan footer jika berada di dalam area aplikasi/dashboard
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/merchant") ||
    pathname?.startsWith("/customer")
  ) {
    return null;
  }

  return <Footer />;
}
