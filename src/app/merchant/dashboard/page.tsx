import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShoppingCart, Clock, DollarSign, Star, TrendingUp, Store } from "lucide-react";
import SubscriptionManager from "../components/SubscriptionManager";

export const metadata = {
  title: "Dashboard | Merchant",
};

export default async function MerchantDashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Get merchant profile
  const merchant = await prisma.merchantProfile.findUnique({
    where: { userId: session.user.id },
    include: { reviews: true, subscriptionRequest: true },
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
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-100",
    },
    {
      label: "Pesanan Pending",
      value: ordersPending,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-100",
    },
    {
      label: "Pendapatan Bulan Ini",
      value: `Rp ${revenueThisMonth.toLocaleString("id-ID")}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100",
    },
    {
      label: "Rata-rata Rating",
      value: avgRating,
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-50 border-yellow-100",
    },
  ];

  const statusLabels: Record<string, { text: string; className: string }> = {
    PENDING: { text: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
    ACCEPTED: { text: "Diterima", className: "bg-blue-50 text-blue-700 border-blue-200" },
    PROCESSING: { text: "Diproses", className: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    DELIVERING: { text: "Dikirim", className: "bg-purple-50 text-purple-700 border-purple-200" },
    COMPLETED: { text: "Selesai", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    CANCELLED: { text: "Dibatalkan", className: "bg-neutral-50 text-neutral-600 border-neutral-200" },
    REJECTED: { text: "Ditolak", className: "bg-rose-50 text-rose-700 border-rose-200" },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-light/50 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-neutral-dark/70 mt-1">
            Selamat datang, <span className="font-semibold text-primary">{merchant.storeName}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-neutral-light/50 shadow-sm">
          <Store className="h-4 w-4 text-neutral-dark/70" />
          <span className="text-sm text-neutral-dark/80 font-medium mr-1">Status:</span>
          {merchant.isOpen ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Buka
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              Tutup
            </span>
          )}
          {!merchant.isApproved && (
            <span className="ml-2 px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded bg-amber-50 text-amber-700 border border-amber-200">
              Menunggu Review
            </span>
          )}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-light/50 bg-white p-5 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-dark/80">{stat.label}</span>
              <div className={`p-2 rounded-lg border ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-primary tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Subscription Info */}
      <div className="rounded-xl border border-neutral-light/50 bg-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-accent/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-accent" />
            </div>
            <h2 className="font-bold text-primary">Langganan</h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-neutral-dark/80">
            <span className="flex items-center gap-1.5">
              Status:{" "}
              <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                merchant.subscriptionStatus === "PREMIUM" 
                  ? "bg-accent text-white" 
                  : "bg-neutral-100 text-neutral-700"
              }`}>
                {merchant.subscriptionStatus === "PREMIUM" ? "Premium" : "Gratis"}
              </span>
            </span>
            <span>
              Pesanan bulan ini:{" "}
              <span className="font-bold text-primary">
                {merchant.subscriptionStatus === "PREMIUM" 
                  ? `${ordersThisMonth.length} (Tanpa Batas)` 
                  : `${ordersThisMonth.length} / 6`}
              </span>
            </span>
            {merchant.subscriptionStatus === "FREE" && ordersThisMonth.length >= 5 && (
              <span className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-xs">
                Kuota Menipis
              </span>
            )}
          </div>
        </div>
        
        {/* Kontrol Langganan */}
        <div className="mt-4 pt-4 border-t border-neutral-light/50">
          <SubscriptionManager 
            currentStatus={merchant.subscriptionStatus} 
            compact={true} 
            hasPendingRequest={merchant.subscriptionRequest?.status === "PENDING"}
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-neutral-light/50 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-light/50 bg-neutral-50/50">
          <h2 className="font-bold text-primary tracking-tight">Pesanan Terbaru</h2>
        </div>
        {allOrders.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
              <ShoppingCart className="h-5 w-5 text-neutral-dark/40" />
            </div>
            <p className="font-medium text-neutral-dark">Belum ada pesanan masuk.</p>
            <p className="text-sm text-neutral-dark/60 mt-1">Pesanan pelanggan akan muncul di sini.</p>
          </div>
        ) : (
            <table className="w-full text-sm block md:table">
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-neutral-light/50 bg-white text-left">
                  <th className="px-6 py-4 font-bold text-neutral-dark/60 uppercase tracking-wider text-[11px]">Customer</th>
                  <th className="px-6 py-4 font-bold text-neutral-dark/60 uppercase tracking-wider text-[11px]">Total Belanja</th>
                  <th className="px-6 py-4 font-bold text-neutral-dark/60 uppercase tracking-wider text-[11px]">Status</th>
                  <th className="px-6 py-4 font-bold text-neutral-dark/60 uppercase tracking-wider text-[11px] text-right">Tanggal</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group divide-y md:divide-y md:divide-neutral-light/30">
                {allOrders.map((order) => {
                  const status = statusLabels[order.status] ?? {
                    text: order.status,
                    className: "bg-neutral-100 text-neutral-700 border-neutral-200",
                  };
                  return (
                    <tr key={order.id} className="bg-white hover:bg-neutral-50/50 transition-colors group block md:table-row border-b border-neutral-light/30 md:border-none p-4 md:p-0">
                      <td className="px-0 md:px-6 py-1 md:py-4 block md:table-cell">
                        <div className="flex justify-between md:block">
                          <span className="font-semibold text-primary">{order.customer.name}</span>
                          <span className="text-neutral-dark/70 font-medium text-[10px] md:hidden">
                            {order.createdAt.toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-0 md:px-6 py-1 md:py-4 block md:table-cell mt-1 md:mt-0">
                        <div className="flex justify-between md:block">
                          <span className="md:hidden text-xs text-neutral-dark/60">Total:</span>
                          <span className="font-medium text-primary">Rp {order.totalAmount.toLocaleString("id-ID")}</span>
                        </div>
                      </td>
                      <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell mt-1 md:mt-0">
                        <div className="flex justify-between md:block">
                          <span className="md:hidden text-xs text-neutral-dark/60">Status:</span>
                          <span className={`inline-flex items-center px-2 py-0.5 text-[10px] md:text-xs font-bold rounded border ${status.className}`}>
                            {status.text}
                          </span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-neutral-dark/70 font-medium text-xs text-right">
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
        )}
      </div>
    </div>
  );
}
