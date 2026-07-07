import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import ConditionalFooter from "@/app/components/ConditionalFooter";
import ConditionalNavbar from "@/app/components/ConditionalNavbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "SiapSedia - Kebutuhan Rumah Tangga",
  description:
    "SiapSedia adalah platform SaaS marketplace kebutuhan rumah tangga yang memudahkan Anda berbelanja kebutuhan harian seperti galon, gas, dan laundry dari merchant terdekat secara online.",
  keywords: [
    "SiapSedia",
    "marketplace",
    "kebutuhan rumah tangga",
    "galon",
    "gas",
    "laundry",
    "belanja online",
    "SaaS"
  ],
  openGraph: {
    title: "SiapSedia - Marketplace Kebutuhan Rumah Tangga",
    description:
      "Pesan galon, gas, atau layanan laundry dari merchant terdekat. Semua kebutuhan harian rumah tangga dalam satu platform.",
    siteName: "SiapSedia",
    locale: "id_ID",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SiapSedia - Marketplace Kebutuhan Rumah Tangga",
    description:
      "Pesan galon, gas, atau layanan laundry dari merchant terdekat. Semua kebutuhan harian rumah tangga dalam satu platform."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased" style={{ colorScheme: 'light' }}>
      <body className={`${inter.className} min-h-dvh flex flex-col`}>
        <ConditionalNavbar>
          <Navbar />
        </ConditionalNavbar>
        <main className="flex-1 bg-background text-foreground flex-col flex">
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
