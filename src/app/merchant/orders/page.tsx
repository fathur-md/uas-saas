import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import MerchantOrderActionButtons from "./MerchantOrderActionButtons";

export const metadata = {
  title: "Kelola Pesanan | Merchant",
};

export default async function MerchantOrdersPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "MERCHANT" || !session.user.id) {
    redirect("/login");
  }

  const merchant = await prisma.merchantProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!merchant) {
    return <div className="p-6">Profil tidak ditemukan.</div>;
  }

  const orders = await prisma.order.findMany({
    where: { merchantId: merchant.id },
    include: {
      customer: {
        select: { name: true, phoneNumber: true },
      },
      orderItems: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING": return <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded border bg-amber-50 text-amber-700 border-amber-200">Menunggu Respon</span>;
      case "ACCEPTED": return <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded border bg-blue-50 text-blue-700 border-blue-200">Diterima</span>;
      case "PROCESSING": return <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded border bg-indigo-50 text-indigo-700 border-indigo-200">Diproses</span>;
      case "DELIVERING": return <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded border bg-purple-50 text-purple-700 border-purple-200">Diantar</span>;
      case "COMPLETED": return <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded border bg-emerald-50 text-emerald-700 border-emerald-200">Selesai</span>;
      case "REJECTED": return <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded border bg-rose-50 text-rose-700 border-rose-200">Ditolak</span>;
      case "CANCELLED": return <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded border bg-neutral-50 text-neutral-600 border-neutral-200">Dibatalkan</span>;
      default: return <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded border bg-neutral-100 text-neutral-700 border-neutral-200">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-neutral-light/50 pb-6">
        <h1 className="text-2xl font-bold text-primary tracking-tight">Pesanan Masuk</h1>
        <p className="text-sm text-neutral-dark/70 mt-1">
          Kelola semua pesanan dari pelanggan Anda.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-light/50 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
              <Package className="h-5 w-5 text-neutral-dark/40" />
            </div>
            <p className="font-medium text-neutral-dark">Belum ada pesanan yang masuk.</p>
            <p className="text-sm text-neutral-dark/60 mt-1">Pesanan pelanggan akan muncul di sini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto lg:overflow-visible">
            <table className="w-full text-left text-sm text-neutral-dark block lg:table">
              <thead className="bg-neutral-50/50 border-b border-neutral-light/50 hidden lg:table-header-group">
                <tr>
                  <th className="px-6 py-4 font-bold text-neutral-dark/60 uppercase tracking-wider text-[11px]">ID / Tanggal</th>
                  <th className="px-6 py-4 font-bold text-neutral-dark/60 uppercase tracking-wider text-[11px]">Pelanggan</th>
                  <th className="px-6 py-4 font-bold text-neutral-dark/60 uppercase tracking-wider text-[11px]">Detail Pesanan</th>
                  <th className="px-6 py-4 font-bold text-neutral-dark/60 uppercase tracking-wider text-[11px]">Total</th>
                  <th className="px-6 py-4 font-bold text-neutral-dark/60 uppercase tracking-wider text-[11px]">Status</th>
                  <th className="px-6 py-4 font-bold text-neutral-dark/60 uppercase tracking-wider text-[11px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="block lg:table-row-group divide-y lg:divide-y lg:divide-neutral-light/30">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors group block lg:table-row border-b border-neutral-light/30 lg:border-none mb-4 lg:mb-0 pb-4 lg:pb-0">
                    
                    {/* Header on Mobile, Column 1 on Desktop */}
                    <td className="px-4 lg:px-6 py-3 lg:py-4 align-top block lg:table-cell bg-neutral-50/50 lg:bg-transparent mb-2 lg:mb-0 rounded-t-lg lg:rounded-none">
                      <div className="flex justify-between lg:block items-center">
                        <div className="lg:hidden font-bold text-[11px] text-neutral-dark/60 uppercase">Pesanan</div>
                        <div className="text-right lg:text-left">
                          <div className="font-mono text-xs font-bold text-primary lg:font-medium lg:text-neutral-dark/80" title={order.id}>
                            #{order.id.slice(0, 8)}
                          </div>
                          <div className="text-[11px] font-medium mt-1 text-neutral-dark/60">
                            {order.createdAt.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-2 lg:py-4 align-top block lg:table-cell">
                      <div className="flex flex-col lg:block">
                        <span className="lg:hidden font-bold text-[11px] text-neutral-dark/60 uppercase mb-1">Pelanggan</span>
                        <div className="font-medium text-primary">{order.customer.name}</div>
                        <div className="text-xs mt-1">{order.customer.phoneNumber}</div>
                        <div className="text-xs mt-1 bg-neutral-light/30 p-1.5 rounded max-w-full lg:max-w-[200px] break-words">
                          {order.shippingAddress}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-2 lg:py-4 align-top block lg:table-cell">
                      <div className="flex flex-col lg:block">
                        <span className="lg:hidden font-bold text-[11px] text-neutral-dark/60 uppercase mb-1">Detail</span>
                        <ul className="space-y-1">
                          {order.orderItems.map(item => (
                            <li key={item.id} className="text-sm">
                              <span className="font-medium">{item.quantity}x</span> {item.product.name}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 text-xs text-neutral-dark flex flex-wrap gap-2">
                          <span className="px-1.5 py-0.5 bg-neutral-light/30 rounded">Ongkir: Rp{order.shippingCost.toLocaleString("id-ID")}</span>
                          <span className="px-1.5 py-0.5 bg-neutral-light/30 rounded font-medium">{order.paymentMethod}</span>
                        </div>
                        {order.notes && (
                          <div className="mt-2 text-xs italic text-neutral-dark/80 bg-yellow-50/50 p-1.5 rounded border border-yellow-100">
                            Catatan: &quot;{order.notes}&quot;
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-2 lg:py-4 align-top block lg:table-cell">
                      <div className="flex justify-between lg:block items-center">
                        <span className="lg:hidden font-bold text-[11px] text-neutral-dark/60 uppercase">Total Belanja</span>
                        <div className="font-bold text-primary text-base lg:text-sm">
                          Rp {order.totalAmount.toLocaleString("id-ID")}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4 align-top block lg:table-cell border-t border-neutral-light/30 lg:border-none mt-2 lg:mt-0">
                      <div className="flex justify-between lg:flex-col items-center lg:items-start">
                        <span className="lg:hidden font-bold text-[11px] text-neutral-dark/60 uppercase">Status</span>
                        <div className="flex flex-col items-end lg:items-start gap-1">
                          {getStatusBadge(order.status)}
                          {order.paymentStatus === "UNPAID" && (
                            <div className="text-[10px] lg:text-xs text-red-500 font-medium">Belum Bayar</div>
                          )}
                          {order.paymentStatus === "WAITING_CONFIRMATION" && (
                            <div className="text-[10px] lg:text-xs text-orange-500 font-medium">Cek Pembayaran</div>
                          )}
                          {order.paymentStatus === "PAID" && (
                            <div className="text-[10px] lg:text-xs text-green-500 font-medium">Lunas</div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-3 lg:py-4 align-top block lg:table-cell bg-neutral-50/30 lg:bg-transparent mt-2 lg:mt-0">
                      <MerchantOrderActionButtons
                        orderId={order.id}
                        status={order.status}
                        paymentStatus={order.paymentStatus}
                        paymentProofUrl={order.paymentProofUrl}
                      />
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
