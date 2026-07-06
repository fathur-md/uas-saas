import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, Search, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Monitoring Semua Pesanan | Admin",
};

export default async function AdminOrdersPage(props: { searchParams: Promise<{ status?: string, q?: string }> }) {
  const searchParams = await props.searchParams;
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  const statusFilter = searchParams.status || "ALL";
  const query = searchParams.q || "";

  // Build the where clause dynamically
  const whereClause: any = {};
  
  if (statusFilter !== "ALL") {
    whereClause.status = statusFilter;
  }

  if (query) {
    whereClause.OR = [
      { id: { contains: query, mode: "insensitive" } },
      { customer: { name: { contains: query, mode: "insensitive" } } },
      { merchant: { storeName: { contains: query, mode: "insensitive" } } },
    ];
  }

  const orders = await prisma.order.findMany({
    where: whereClause,
    include: {
      customer: { select: { name: true, id: true } },
      merchant: { select: { storeName: true, id: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100, // Limit to recent 100 for performance
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING": return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>;
      case "ACCEPTED": return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Diterima</span>;
      case "PROCESSING": return <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">Diproses</span>;
      case "DELIVERING": return <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Diantar</span>;
      case "COMPLETED": return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Selesai</span>;
      case "REJECTED": return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Ditolak</span>;
      case "CANCELLED": return <span className="bg-neutral-light/30 text-primary text-xs px-2 py-1 rounded">Dibatalkan</span>;
      default: return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Monitoring Pesanan Lintas-Toko</h1>
        <p className="text-neutral-dark mt-1">Pantau seluruh aktivitas transaksi di platform SiapSedia.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-background p-4 rounded-xl shadow-sm border border-neutral-light flex flex-col md:flex-row gap-4 items-center justify-between">
        <form className="flex-1 w-full flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-dark h-4 w-4" />
            <input 
              type="text" 
              name="q" 
              defaultValue={query}
              placeholder="Cari ID, nama pelanggan, toko..." 
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-neutral-light bg-transparent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <select 
            name="status" 
            defaultValue={statusFilter}
            className="px-3 py-2 text-sm rounded-lg border border-neutral-light bg-transparent focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Diterima</option>
            <option value="PROCESSING">Diproses</option>
            <option value="DELIVERING">Diantar</option>
            <option value="COMPLETED">Selesai</option>
            <option value="CANCELLED">Dibatalkan</option>
          </select>
          <button type="submit" className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90">
            Cari
          </button>
        </form>
      </div>

      <div className="bg-background rounded-xl shadow-sm border border-neutral-light overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <Package className="h-12 w-12 text-neutral-dark mb-4 opacity-50" />
            <p className="text-neutral-dark font-medium">Tidak ada transaksi ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-dark">
              <thead className="bg-neutral-light/30 text-xs uppercase text-primary border-b border-neutral-light">
                <tr>
                  <th className="px-6 py-4">ID Pesanan & Waktu</th>
                  <th className="px-6 py-4">Merchant (Toko)</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Pembayaran</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-light">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-light/30 transition">
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs font-semibold text-primary">
                        #{order.id.slice(0, 8)}
                      </div>
                      <div className="text-[11px] text-neutral-dark mt-1">
                        {order.createdAt.toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/merchants/${order.merchant.id}`} className="font-medium text-accent hover:underline flex items-center gap-1">
                        {order.merchant.storeName} <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/users/${order.customer.id}`} className="font-medium text-accent hover:underline flex items-center gap-1">
                        {order.customer.name} <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">
                      Rp {order.totalAmount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{order.paymentMethod}</div>
                      {order.paymentStatus === "UNPAID" && <span className="text-xs text-red-500">Unpaid</span>}
                      {order.paymentStatus === "PAID" && <span className="text-xs text-green-500">Paid</span>}
                      {order.paymentStatus === "WAITING_CONFIRMATION" && <span className="text-xs text-orange-500">Waiting</span>}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
