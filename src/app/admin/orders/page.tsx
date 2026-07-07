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
    const baseClasses = "inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md";
    switch (status) {
      case "PENDING": return <span className={`${baseClasses} bg-amber-50 text-amber-600`}>Pending</span>;
      case "ACCEPTED": return <span className={`${baseClasses} bg-blue-50 text-blue-600`}>Diterima</span>;
      case "PROCESSING": return <span className={`${baseClasses} bg-indigo-50 text-indigo-600`}>Diproses</span>;
      case "DELIVERING": return <span className={`${baseClasses} bg-purple-50 text-purple-600`}>Diantar</span>;
      case "COMPLETED": return <span className={`${baseClasses} bg-emerald-50 text-emerald-600`}>Selesai</span>;
      case "REJECTED": return <span className={`${baseClasses} bg-red-50 text-red-600`}>Ditolak</span>;
      case "CANCELLED": return <span className={`${baseClasses} bg-neutral-50 text-neutral-500`}>Dibatalkan</span>;
      default: return <span className={baseClasses}>{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Monitoring Pesanan Lintas-Toko</h1>
        <p className="text-neutral-500 mt-2 font-medium">Pantau seluruh aktivitas transaksi di platform SiapSedia.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form className="flex-1 w-full flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" strokeWidth={2} />
            <input 
              type="text" 
              name="q" 
              defaultValue={query}
              placeholder="Cari ID, nama pelanggan, toko..." 
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <select 
              name="status" 
              defaultValue={statusFilter}
              className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="ALL">Semua Status</option>
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Diterima</option>
              <option value="PROCESSING">Diproses</option>
              <option value="DELIVERING">Diantar</option>
              <option value="COMPLETED">Selesai</option>
              <option value="CANCELLED">Dibatalkan</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 hover:shadow transition-all whitespace-nowrap">
              Cari
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-neutral-300" strokeWidth={1.5} />
            </div>
            <p className="text-neutral-900 font-medium">Tidak ada transaksi ditemukan.</p>
            {query || statusFilter !== "ALL" ? (
              <p className="text-sm text-neutral-500 mt-1">Coba ubah kata kunci pencarian atau filter status Anda.</p>
            ) : null}
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-600">
                <thead className="bg-neutral-50/30 text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100">
                  <tr>
                    <th className="px-6 py-4">Pesanan & Status</th>
                    <th className="px-6 py-4">Merchant (Toko)</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Pembayaran & Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors group">
                      <td className="px-6 py-4 align-top w-1/4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="font-mono text-xs font-bold text-neutral-900">
                            #{order.id.slice(0, 8)}
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-medium">
                          {order.createdAt.toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top pt-5">
                        <Link href={`/admin/merchants/${order.merchant.id}`} className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 w-fit">
                          {order.merchant.storeName} <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 align-top pt-5">
                        <Link href={`/admin/users/${order.customer.id}`} className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 w-fit">
                          {order.customer.name} <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 align-top pt-4">
                        <div className="font-semibold text-neutral-800">{order.paymentMethod}</div>
                        <div className="flex flex-col gap-1 mt-1">
                          {order.paymentStatus === "UNPAID" && <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">Unpaid</span>}
                          {order.paymentStatus === "PAID" && <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Paid</span>}
                          {order.paymentStatus === "WAITING_CONFIRMATION" && <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Waiting</span>}
                          <div className="font-bold text-neutral-900 mt-1">
                            Rp {order.totalAmount.toLocaleString("id-ID")}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="block lg:hidden divide-y divide-neutral-100">
              {orders.map((order) => (
                <div key={order.id} className="p-5 space-y-4 hover:bg-neutral-50/30 transition-colors">
                  {/* Card Header */}
                  <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                    <div>
                      <div className="font-mono text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-1 rounded-md inline-block mb-1">
                        #{order.id.slice(0, 8)}
                      </div>
                      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
                        {order.createdAt.toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Body Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">Dari Toko</span>
                      <Link href={`/admin/merchants/${order.merchant.id}`} className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 w-fit">
                        {order.merchant.storeName}
                        <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
                      </Link>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">Pemesan</span>
                      <Link href={`/admin/users/${order.customer.id}`} className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 w-fit">
                        {order.customer.name}
                        <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-neutral-50/80 rounded-xl p-3 flex justify-between items-center mt-2 border border-neutral-100/50">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Metode</span>
                      <div className="font-semibold text-neutral-700 flex items-center gap-2 mt-0.5">
                        {order.paymentMethod}
                        {order.paymentStatus === "UNPAID" && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                        {order.paymentStatus === "PAID" && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                        {order.paymentStatus === "WAITING_CONFIRMATION" && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Total Belanja</span>
                      <div className="font-bold text-neutral-900 mt-0.5">
                        Rp {order.totalAmount.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
