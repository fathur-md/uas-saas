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
      sub: `${totalCustomers} customer, ${totalMerchants} merchant`,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Merchant",
      value: approvedMerchants,
      sub: `${pendingMerchants} menunggu persetujuan`,
      icon: Store,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Pesanan",
      value: totalOrders,
      sub: `${completedOrders} selesai`,
      icon: ShoppingCart,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Total Pendapatan",
      value: `Rp ${totalRevenue.toLocaleString("id-ID")}`,
      sub: "Seluruh platform",
      icon: DollarSign,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const statusLabels: Record<string, { text: string; className: string }> = {
    PENDING: { text: "Pending", className: "bg-amber-100 text-amber-700" },
    ACCEPTED: { text: "Diterima", className: "bg-blue-100 text-blue-700" },
    PROCESSING: { text: "Diproses", className: "bg-indigo-100 text-indigo-700" },
    DELIVERING: { text: "Dikirim", className: "bg-purple-100 text-purple-700" },
    COMPLETED: { text: "Selesai", className: "bg-emerald-100 text-emerald-700" },
    CANCELLED: { text: "Dibatalkan", className: "bg-red-100 text-red-700" },
    REJECTED: { text: "Ditolak", className: "bg-red-100 text-red-700" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Dashboard Admin</h1>
        <p className="text-sm text-neutral-dark mt-1">
          Pantau seluruh aktivitas platform SiapSedia.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-light/30 bg-white p-5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-dark">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-primary">{stat.value}</p>
            <p className="mt-1 text-xs text-neutral-dark">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      {pendingMerchants > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <div>
                <h2 className="font-semibold text-primary">Merchant Menunggu Persetujuan</h2>
                <p className="text-sm text-neutral-dark">
                  Ada {pendingMerchants} merchant yang perlu ditinjau.
                </p>
              </div>
            </div>
            <Link
              href="/admin/merchants"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
            >
              Tinjau
            </Link>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="rounded-xl border border-neutral-light/30 bg-white shadow-xs">
        <div className="p-5 border-b border-neutral-light/30 flex items-center justify-between">
          <h2 className="font-semibold text-primary">Pesanan Terbaru</h2>
          <CheckCircle className="h-4 w-4 text-neutral-dark" />
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-neutral-dark text-sm">
            Belum ada pesanan di platform.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-light/30 text-left">
                  <th className="px-5 py-3 font-medium text-neutral-dark">Customer</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Merchant</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Total</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Status</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const status = statusLabels[order.status] ?? {
                    text: order.status,
                    className: "bg-gray-100 text-gray-700",
                  };
                  return (
                    <tr key={order.id} className="border-b border-neutral-light/10 last:border-0">
                      <td className="px-5 py-3 text-primary">{order.customer.name}</td>
                      <td className="px-5 py-3 text-primary">{order.merchant.storeName}</td>
                      <td className="px-5 py-3 text-primary">
                        Rp {order.totalAmount.toLocaleString("id-ID")}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${status.className}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-neutral-dark">
                        {order.createdAt.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
