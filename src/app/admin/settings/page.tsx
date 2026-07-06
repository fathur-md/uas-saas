import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Settings, Database, Shield, Info } from "lucide-react";

export const metadata = {
  title: "Pengaturan | Admin",
};

export default async function AdminSettingsPage() {
  const session = await auth();

  const [totalUsers, totalMerchants, totalOrders, totalProducts] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.merchantProfile.count(),
    prisma.order.count(),
    prisma.product.count(),
  ]);

  const platformInfo = [
    { label: "Nama Platform", value: "SiapSedia" },
    { label: "Versi", value: "1.0.0" },
    { label: "Framework", value: "Next.js 16 + React 19" },
    { label: "Database", value: "PostgreSQL + Prisma v7" },
    { label: "Auth", value: "NextAuth v5 (Credentials + JWT)" },
  ];

  const dbStats = [
    { label: "Total Pengguna", value: totalUsers },
    { label: "Total Merchant", value: totalMerchants },
    { label: "Total Pesanan", value: totalOrders },
    { label: "Total Produk", value: totalProducts },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Pengaturan</h1>
        <p className="text-sm text-neutral-dark mt-1">
          Informasi platform dan konfigurasi sistem.
        </p>
      </div>

      {/* Admin Info */}
      <div className="rounded-xl border border-neutral-light/30 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-accent" />
          <h2 className="font-semibold text-primary">Informasi Admin</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-neutral-dark">Nama:</span>
            <span className="ml-2 font-medium text-primary">{session?.user?.name ?? "—"}</span>
          </div>
          <div>
            <span className="text-neutral-dark">Email:</span>
            <span className="ml-2 font-medium text-primary">{session?.user?.email ?? "—"}</span>
          </div>
          <div>
            <span className="text-neutral-dark">Role:</span>
            <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
              ADMIN
            </span>
          </div>
        </div>
      </div>

      {/* Platform Info */}
      <div className="rounded-xl border border-neutral-light/30 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-blue-500" />
          <h2 className="font-semibold text-primary">Informasi Platform</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {platformInfo.map((item) => (
            <div key={item.label} className="flex justify-between py-2 px-3 rounded-lg bg-neutral-light/10">
              <span className="text-neutral-dark">{item.label}</span>
              <span className="font-medium text-primary">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Database Stats */}
      <div className="rounded-xl border border-neutral-light/30 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Database className="h-5 w-5 text-emerald-500" />
          <h2 className="font-semibold text-primary">Statistik Database</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {dbStats.map((stat) => (
            <div key={stat.label} className="text-center py-3 px-2 rounded-lg bg-neutral-light/10">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-neutral-dark mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Note */}
      <div className="rounded-xl border border-neutral-light/30 bg-neutral-light/5 p-5">
        <div className="flex items-start gap-3">
          <Settings className="h-5 w-5 text-neutral-dark mt-0.5" />
          <div className="text-sm text-neutral-dark">
            <p className="font-medium text-primary mb-1">Catatan</p>
            <p>
              Konfigurasi platform saat ini dikelola melalui environment variables dan file konfigurasi. 
              Untuk perubahan konfigurasi, hubungi developer atau edit langsung di Vercel Dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
