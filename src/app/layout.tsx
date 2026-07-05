import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "SiapSedia - SaaS Kebutuhan Rumah Tangga",
  description: "Marketplace kebutuhan harian Anda."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className={`${inter.className} min-h-dvh flex flex-col`}>
        {/* Navbar Publik */}
        <header className="border-b bg-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold tracking-tight">
              SiapSedia
            </Link>
            <nav className="flex gap-4">
              <Link
                href="/login"
                className="text-sm font-medium hover:underline"
              >
                Masuk
              </Link>
            </nav>
          </div>
        </header>

        {/* Konten Utama */}
        <main className="flex-1 bg-background text-foreground flex-col flex">
          {children}
        </main>
      </body>
    </html>
  );
}
