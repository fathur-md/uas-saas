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
    { label: "Autentikasi", value: "NextAuth v5 (Credentials + JWT)" },
  ];

  const dbStats = [
    { label: "Pengguna", value: totalUsers },
    { label: "Merchant", value: totalMerchants },
    { label: "Pesanan", value: totalOrders },
    { label: "Produk", value: totalProducts },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Pengaturan Platform</h1>
        <p className="text-neutral-500 mt-2 font-medium">
          Informasi sistem, status database, dan konfigurasi environment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Admin Info */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Shield className="h-5 w-5" strokeWidth={2} />
              </div>
              <h2 className="font-semibold text-neutral-900 tracking-tight text-lg">Informasi Sesi Admin</h2>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-neutral-50/50">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Nama Lengkap</span>
                <span className="font-semibold text-neutral-900">{session?.user?.name ?? "—"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-neutral-50/50">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Alamat Email</span>
                <span className="font-medium text-neutral-700">{session?.user?.email ?? "—"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-neutral-50/50">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Hak Akses</span>
                <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-purple-50 text-purple-600">
                  ADMINISTRATOR
                </span>
              </div>
            </div>
          </div>

          {/* Settings Note */}
          <div className="rounded-2xl bg-neutral-50 p-6 flex gap-4 items-start">
            <div className="p-2.5 bg-white text-neutral-400 rounded-xl shadow-sm">
              <Settings className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 tracking-tight mb-2">Catatan Sistem</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                Pengaturan utama seperti variabel lingkungan (Environment Variables), 
                URL Database, dan kunci rahasia JWT dikelola langsung melalui penyedia hosting (mis. Vercel). 
                Hubungi administrator DevOps untuk melakukan perubahan teknis.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Database Stats */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Database className="h-5 w-5" strokeWidth={2} />
              </div>
              <h2 className="font-semibold text-neutral-900 tracking-tight text-lg">Statistik Database</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {dbStats.map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-neutral-50/50 flex flex-col items-center justify-center text-center">
                  <p className="text-3xl font-bold text-neutral-900 tracking-tight">{stat.value}</p>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Info */}
          <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
              <div className="p-2.5 bg-neutral-100 text-neutral-600 rounded-xl">
                <Info className="h-5 w-5" strokeWidth={2} />
              </div>
              <h2 className="font-semibold text-neutral-900 tracking-tight text-lg">Spesifikasi Teknologi</h2>
            </div>
            <div className="space-y-3">
              {platformInfo.map((item) => (
                <div key={item.label} className="flex justify-between items-center p-3 rounded-xl hover:bg-neutral-50/50 transition-colors">
                  <span className="text-sm font-medium text-neutral-500">{item.label}</span>
                  <span className="text-sm font-semibold text-neutral-900 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
