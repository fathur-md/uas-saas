import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { updateOrderStatus } from "@/app/actions/order";
import { Check, X, Truck, Package, Clock, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Kelola Pesanan | Merchant",
};

export default async function MerchantOrdersPage() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "MERCHANT" || !session.user.id) {
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
      case "PENDING": return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Menunggu Respon</span>;
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Pesanan Masuk</h1>
        <p className="text-neutral-dark mt-1">
          Kelola semua pesanan dari pelanggan Anda.
        </p>
      </div>

      <div className="bg-background rounded-xl shadow-sm border border-neutral-light overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-neutral-dark mx-auto mb-4" />
            <p className="text-neutral-dark">Belum ada pesanan yang masuk.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-dark">
              <thead className="bg-neutral-light/30 text-xs uppercase text-primary border-b border-neutral-light">
                <tr>
                  <th className="px-6 py-4">ID / Tanggal</th>
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">Detail Pesanan</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-light">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-light/30 transition">
                    <td className="px-6 py-4 align-top">
                      <div className="font-mono text-xs text-neutral-dark truncate w-24" title={order.id}>
                        #{order.id.slice(0, 8)}
                      </div>
                      <div className="text-xs mt-1 text-neutral-dark">
                        {order.createdAt.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="font-medium text-primary">{order.customer.name}</div>
                      <div className="text-xs mt-1">{order.customer.phoneNumber}</div>
                      <div className="text-xs mt-1 bg-neutral-light/30 p-1 rounded break-words max-w-[200px]">
                        {order.shippingAddress}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <ul className="space-y-1">
                        {order.orderItems.map(item => (
                          <li key={item.id} className="text-sm">
                            <span className="font-medium">{item.quantity}x</span> {item.product.name}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 text-xs text-neutral-dark flex gap-2">
                        <span className="px-1.5 py-0.5 bg-neutral-light/30 rounded">Ongkir: Rp{order.shippingCost.toLocaleString("id-ID")}</span>
                        <span className="px-1.5 py-0.5 bg-neutral-light/30 rounded">{order.paymentMethod}</span>
                      </div>
                      {order.notes && (
                        <div className="mt-2 text-xs italic text-neutral-dark">
                          &quot; {order.notes} &quot;
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top font-bold text-primary">
                      Rp {order.totalAmount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 align-top space-y-2">
                      <div>{getStatusBadge(order.status)}</div>
                      {order.paymentStatus === "UNPAID" && (
                        <div className="text-xs text-red-500 font-medium mt-1">Belum Bayar</div>
                      )}
                      {order.paymentStatus === "WAITING_CONFIRMATION" && (
                        <div className="text-xs text-orange-500 font-medium mt-1">Cek Pembayaran QRIS</div>
                      )}
                      {order.paymentStatus === "PAID" && (
                        <div className="text-xs text-green-500 font-medium mt-1">Lunas</div>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                      {/* State Machine Aksi Merchant */}
                      <div className="flex flex-col gap-2 items-end">
                        
                        {order.status === "PENDING" && (
                          <>
                            <form action={updateOrderStatus.bind(null, order.id, "ACCEPTED", undefined)}>
                              <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition">
                                <Check className="h-3 w-3" /> Terima
                              </button>
                            </form>
                            <form action={updateOrderStatus.bind(null, order.id, "REJECTED", undefined)}>
                              <button className="flex items-center gap-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md text-xs font-medium transition">
                                <X className="h-3 w-3" /> Tolak
                              </button>
                            </form>
                          </>
                        )}

                        {order.status === "ACCEPTED" && (
                          <form action={updateOrderStatus.bind(null, order.id, "PROCESSING", undefined)}>
                            <button className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition">
                              <Package className="h-3 w-3" /> Proses Pesanan
                            </button>
                          </form>
                        )}

                        {order.status === "PROCESSING" && (
                          <form action={updateOrderStatus.bind(null, order.id, "DELIVERING", undefined)}>
                            <button className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition">
                              <Truck className="h-3 w-3" /> Antar Sekarang
                            </button>
                          </form>
                        )}

                        {order.status === "DELIVERING" && (
                          <form action={updateOrderStatus.bind(null, order.id, "COMPLETED", "PAID")}>
                            <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition" title="Tandai selesai & Lunas">
                              <Check className="h-3 w-3" /> Selesai & Lunas
                            </button>
                          </form>
                        )}

                        {/* Jika customer bayar via QRIS dan butuh konfirmasi */}
                        {(order.paymentStatus === "WAITING_CONFIRMATION" && order.status !== "COMPLETED") && (
                          <div className="flex flex-col gap-2 items-end">
                            {order.paymentProofUrl && (
                              <a href={order.paymentProofUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-neutral-light/50 hover:bg-neutral-light text-primary px-3 py-1.5 rounded-md text-xs font-medium transition border border-neutral-light">
                                <ExternalLink className="h-3 w-3" /> Lihat Bukti Bayar
                              </a>
                            )}
                            <form action={updateOrderStatus.bind(null, order.id, order.status, "PAID")}>
                              <button className="flex items-center gap-1 bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 px-3 py-1.5 rounded-md text-xs font-medium transition">
                                Konfirmasi Uang Masuk
                              </button>
                            </form>
                          </div>
                        )}
                        
                      </div>
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
