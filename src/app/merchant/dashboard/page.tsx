import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShoppingCart, Clock, DollarSign, Star, TrendingUp, Store } from "lucide-react";

export const metadata = {
  title: "Dashboard | Merchant",
};

export default async function MerchantDashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Get merchant profile
  const merchant = await prisma.merchantProfile.findUnique({
    where: { userId: session.user.id },
    include: { reviews: true },
  });

  if (!merchant) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-primary">Profil Merchant Tidak Ditemukan</h1>
        <p className="mt-2 text-neutral-dark">Akun merchant Anda belum terdaftar.</p>
      </div>
    );
  }

  // Date helpers
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Parallel queries for stats
  const [ordersToday, ordersPending, ordersThisMonth, allOrders] = await Promise.all([
    prisma.order.count({
      where: { merchantId: merchant.id, createdAt: { gte: startOfDay } },
    }),
    prisma.order.count({
      where: { merchantId: merchant.id, status: "PENDING" },
    }),
    prisma.order.findMany({
      where: { merchantId: merchant.id, createdAt: { gte: startOfMonth } },
      select: { totalAmount: true },
    }),
    prisma.order.findMany({
      where: { merchantId: merchant.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { customer: { select: { name: true } } },
    }),
  ]);

  const revenueThisMonth = ordersThisMonth.reduce((sum, o) => sum + o.totalAmount, 0);
  const avgRating =
    merchant.reviews.length > 0
      ? (merchant.reviews.reduce((sum, r) => sum + r.rating, 0) / merchant.reviews.length).toFixed(1)
      : "—";

  const stats = [
    {
      label: "Pesanan Hari Ini",
      value: ordersToday,
      icon: ShoppingCart,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Pesanan Pending",
      value: ordersPending,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Pendapatan Bulan Ini",
      value: `Rp ${revenueThisMonth.toLocaleString("id-ID")}`,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Rata-rata Rating",
      value: avgRating,
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
          <p className="text-sm text-neutral-dark mt-1">
            Selamat datang, <span className="font-medium">{merchant.storeName}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Store className="h-4 w-4 text-neutral-dark" />
          <span className="text-sm text-neutral-dark">Status Toko:</span>
          {merchant.isOpen ? (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
              Buka
            </span>
          ) : (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
              Tutup
            </span>
          )}
          {!merchant.isApproved && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
              Menunggu Persetujuan Admin
            </span>
          )}
        </div>
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
          </div>
        ))}
      </div>

      {/* Subscription Info */}
      <div className="rounded-xl border border-neutral-light/30 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <h2 className="font-semibold text-primary">Langganan</h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-neutral-dark">
          <span>
            Status:{" "}
            <span className="font-medium text-primary">
              {merchant.subscriptionStatus === "PREMIUM" ? "Premium" : "Gratis"}
            </span>
          </span>
          <span>
            Pesanan bulan ini:{" "}
            <span className="font-medium text-primary">{merchant.monthlyOrderCount} / 10</span>
          </span>
          {merchant.subscriptionStatus === "FREE" && merchant.monthlyOrderCount >= 8 && (
            <span className="text-amber-600 font-medium">
              ⚠️ Mendekati batas pesanan gratis
            </span>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-neutral-light/30 bg-white shadow-xs">
        <div className="p-5 border-b border-neutral-light/30">
          <h2 className="font-semibold text-primary">Pesanan Terbaru</h2>
        </div>
        {allOrders.length === 0 ? (
          <div className="p-8 text-center text-neutral-dark text-sm">
            Belum ada pesanan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-light/30 text-left">
                  <th className="px-5 py-3 font-medium text-neutral-dark">Customer</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Total</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Status</th>
                  <th className="px-5 py-3 font-medium text-neutral-dark">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order) => {
                  const status = statusLabels[order.status] ?? {
                    text: order.status,
                    className: "bg-gray-100 text-gray-700",
                  };
                  return (
                    <tr key={order.id} className="border-b border-neutral-light/10 last:border-0">
                      <td className="px-5 py-3 text-primary">{order.customer.name}</td>
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
