import { prisma } from "@/lib/prisma";
import { Users, Store, ShoppingCart, DollarSign, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | Admin",
};

export default async function AdminDashboard() {
  // Parallel queries for platform stats
  const [
    totalUsers,
    totalCustomers,
    totalMerchants,
    pendingMerchants,
    approvedMerchants,
    totalOrders,
    completedOrders,
    allOrders,
    recentOrders,
  ] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.user.count({ where: { role: "CUSTOMER", deletedAt: null } }),
    prisma.user.count({ where: { role: "MERCHANT", deletedAt: null } }),
    prisma.merchantProfile.count({ where: { isApproved: false } }),
    prisma.merchantProfile.count({ where: { isApproved: true } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "COMPLETED" } }),
    prisma.order.findMany({ select: { totalAmount: true } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        customer: { select: { name: true } },
        merchant: { select: { storeName: true } },
      },
    }),
  ]);

  const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    {
      label: "Total Pengguna",
      value: totalUsers,
      sub: `${totalCustomers} Customer / ${totalMerchants} Merchant`,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50/50",
    },
    {
      label: "Merchant Aktif",
      value: approvedMerchants,
      sub: `${pendingMerchants} Menunggu Persetujuan`,
      icon: Store,
      color: "text-blue-600",
      bg: "bg-blue-50/50",
    },
    {
      label: "Total Pesanan",
      value: totalOrders,
      sub: `${completedOrders} Selesai Dikerjakan`,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50/50",
    },
    {
      label: "Total Pendapatan",
      value: `Rp ${totalRevenue.toLocaleString("id-ID")}`,
      sub: "Seluruh Transaksi Platform",
      icon: DollarSign,
      color: "text-blue-600",
      bg: "bg-blue-50/50",
    },
  ];

  const statusLabels: Record<string, { text: string; className: string }> = {
    PENDING: { text: "Pending", className: "bg-amber-50 text-amber-600" },
    ACCEPTED: { text: "Diterima", className: "bg-blue-50 text-blue-600" },
    PROCESSING: { text: "Diproses", className: "bg-indigo-50 text-indigo-600" },
    DELIVERING: { text: "Dikirim", className: "bg-purple-50 text-purple-600" },
    COMPLETED: { text: "Selesai", className: "bg-emerald-50 text-emerald-600" },
    CANCELLED: { text: "Dibatalkan", className: "bg-neutral-50 text-neutral-500" },
    REJECTED: { text: "Ditolak", className: "bg-red-50 text-red-600" },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-neutral-500 mt-2 font-medium">
          Pantau seluruh aktivitas platform SiapSedia secara real-time.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-neutral-500 tracking-wide">{stat.label}</span>
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} strokeWidth={2} />
              </div>
            </div>
            <p className="text-3xl font-bold text-neutral-900 tracking-tight">{stat.value}</p>
            <p className="mt-2 text-xs font-medium text-neutral-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      {pendingMerchants > 0 && (
        <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Clock className="h-6 w-6 text-amber-600" strokeWidth={2} />
            </div>
            <div>
              <h2 className="font-semibold text-neutral-900 text-lg tracking-tight">Merchant Menunggu Persetujuan</h2>
              <p className="text-sm text-neutral-500 mt-1">
                Ada <span className="font-bold text-amber-600">{pendingMerchants}</span> merchant baru yang perlu ditinjau segera.
              </p>
            </div>
          </div>
          <Link
            href="/admin/merchants"
            className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-amber-500 text-white hover:bg-amber-600 shadow-sm transition-colors whitespace-nowrap"
          >
            Tinjau Sekarang
          </Link>
        </div>
      )}

      {/* Recent Orders */}
      <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/30">
          <h2 className="font-semibold text-neutral-900 text-lg tracking-tight">Pesanan Terbaru</h2>
          <CheckCircle className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
        </div>
        
        {recentOrders.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-neutral-50 flex items-center justify-center mb-3">
              <ShoppingCart className="h-5 w-5 text-neutral-300" />
            </div>
            <p className="font-medium text-neutral-900">Belum ada pesanan masuk.</p>
            <p className="text-sm text-neutral-500 mt-1">Pesanan pelanggan di seluruh platform akan muncul di sini.</p>
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-neutral-50/30">
                  <tr className="border-b border-neutral-100">
                    <th className="px-6 py-4 font-bold text-neutral-400 uppercase tracking-widest text-[10px]">Toko & Pemesan</th>
                    <th className="px-6 py-4 font-bold text-neutral-400 uppercase tracking-widest text-[10px]">Total Belanja</th>
                    <th className="px-6 py-4 font-bold text-neutral-400 uppercase tracking-widest text-[10px]">Status & Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {recentOrders.map((order) => {
                    const status = statusLabels[order.status] ?? {
                      text: order.status,
                      className: "bg-neutral-50 text-neutral-600",
                    };
                    return (
                      <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-6 py-4 align-top w-1/2">
                          <div className="font-bold text-neutral-900 mb-1">{order.merchant.storeName}</div>
                          <div className="text-[11px] font-medium text-neutral-500">Oleh: <span className="text-neutral-900">{order.customer.name}</span></div>
                        </td>
                        <td className="px-6 py-4 align-top pt-5">
                          <div className="font-bold text-neutral-900">
                            Rp {order.totalAmount.toLocaleString("id-ID")}
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top pt-4">
                          <div className="mb-2">
                            <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${status.className}`}>
                              {status.text}
                            </span>
                          </div>
                          <div className="text-[11px] font-medium text-neutral-400">
                            {order.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="block lg:hidden divide-y divide-neutral-100">
              {recentOrders.map((order) => {
                const status = statusLabels[order.status] ?? {
                  text: order.status,
                  className: "bg-neutral-50 text-neutral-600",
                };
                return (
                  <div key={order.id} className="p-5 space-y-3">
                    <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                      <div>
                        <div className="font-bold text-neutral-900 text-sm mb-0.5">{order.merchant.storeName}</div>
                        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
                          {order.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${status.className}`}>
                        {status.text}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm pt-1">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">Pemesan</span>
                        <span className="font-medium text-neutral-800 flex items-center gap-1 w-fit">
                          {order.customer.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">Total</span>
                        <div className="font-bold text-neutral-900 mt-0.5">
                          Rp {order.totalAmount.toLocaleString("id-ID")}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
