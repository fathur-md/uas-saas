import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Package, Clock, CheckCircle, Truck, MapPin, CreditCard, XCircle } from "lucide-react";
import ReviewForm from "./ReviewForm";
import Link from "next/link";
import { cancelOrder } from "@/app/actions/order";

export const metadata = {
  title: "Pesanan Saya | Customer",
};

export default async function CustomerOrdersPage() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "CUSTOMER" || !session.user.id) {
    redirect("/login");
  }

  const customerId = session.user.id;

  const orders = await prisma.order.findMany({
    where: { customerId },
    include: {
      merchant: {
        select: { storeName: true, area: true }
      },
      orderItems: {
        include: { product: true },
      },
      review: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="h-5 w-5 text-yellow-500" />;
      case "ACCEPTED": return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "PROCESSING": return <Package className="h-5 w-5 text-indigo-500" />;
      case "DELIVERING": return <Truck className="h-5 w-5 text-orange-500" />;
      case "COMPLETED": return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Clock className="h-5 w-5 text-neutral-dark" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING": return "Menunggu Konfirmasi";
      case "ACCEPTED": return "Pesanan Diterima";
      case "PROCESSING": return "Sedang Diproses";
      case "DELIVERING": return "Sedang Diantar";
      case "COMPLETED": return "Selesai";
      case "REJECTED": return "Ditolak Merchant";
      case "CANCELLED": return "Dibatalkan";
      default: return status;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Riwayat Pesanan Saya</h1>
        <p className="text-neutral-dark mt-1">
          Pantau status pesanan dan berikan ulasan Anda di sini.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-neutral-light/30 rounded-xl p-12 text-center border border-dashed border-neutral-light">
          <Package className="h-12 w-12 text-neutral-dark mx-auto mb-4" />
          <h3 className="text-lg font-medium text-primary">Belum ada pesanan</h3>
          <p className="mt-1 text-neutral-dark">
            Anda belum pernah melakukan pemesanan. Yuk mulai cari layanan!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-background rounded-xl shadow-sm border border-neutral-light overflow-hidden">
              <div className="bg-neutral-light/30 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-light gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-background p-2 rounded-full shadow-sm">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      {getStatusText(order.status)}
                    </p>
                    <p className="text-xs text-neutral-dark">
                      {order.createdAt.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                
                <div className="text-left sm:text-right">
                  <p className="text-xs text-neutral-dark uppercase tracking-wider">Merchant</p>
                  <p className="font-medium text-primary">{order.merchant.storeName}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-light/30 rounded-md overflow-hidden flex-shrink-0">
                          {item.product.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-dark">IMG</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-primary">{item.product.name}</p>
                          <p className="text-sm text-neutral-dark">{item.quantity} x Rp {item.price.toLocaleString("id-ID")}</p>
                        </div>
                      </div>
                      <p className="font-medium text-primary">
                        Rp {(item.quantity * item.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-light/50 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-neutral-dark" /> Alamat Pengiriman
                    </h4>
                    <p className="text-sm text-neutral-dark bg-neutral-light/30 p-3 rounded-lg border border-neutral-light">
                      {order.shippingAddress}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-dark">Ongkos Kirim</span>
                      <span className="text-primary">Rp {order.shippingCost.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-dark">Metode Pembayaran</span>
                      <span className="text-primary font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t border-neutral-light">
                      <span className="text-primary">Total Belanja</span>
                      <span className="text-primary">Rp {order.totalAmount.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Action Buttons */}
                <div className="mt-4 pt-4 border-t border-neutral-light flex flex-wrap gap-3">
                  {order.status === "PENDING" && (
                    <form action={cancelOrder.bind(null, order.id)}>
                      <button className="flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition">
                        <XCircle className="h-4 w-4" /> Batalkan Pesanan
                      </button>
                    </form>
                  )}
                  
                  {order.paymentMethod === "QRIS" && order.paymentStatus === "WAITING_CONFIRMATION" && order.status !== "CANCELLED" && order.status !== "REJECTED" && (
                    order.paymentProofUrl ? (
                      <Link href={`/customer/orders/${order.id}/payment`} className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition border border-green-200">
                        <CheckCircle className="h-4 w-4" /> Bukti Pembayaran Terkirim
                      </Link>
                    ) : (
                      <Link href={`/customer/orders/${order.id}/payment`} className="flex items-center gap-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 px-4 py-2 rounded-lg transition shadow-sm">
                        <CreditCard className="h-4 w-4" /> Selesaikan Pembayaran
                      </Link>
                    )
                  )}
                </div>

                {/* Form Ulasan muncul jika pesanan sudah selesai dan belum direview */}
                {order.status === "COMPLETED" && !order.review && (
                  <ReviewForm orderId={order.id} merchantId={order.merchantId} />
                )}
                
                {order.review && (
                  <div className="mt-4 p-4 bg-neutral-light/30 rounded-lg border border-neutral-light">
                    <h4 className="font-semibold text-primary mb-2 text-sm">Ulasan Anda</h4>
                    <div className="flex text-yellow-400 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < order.review!.rating ? "" : "text-neutral-dark"}>★</span>
                      ))}
                    </div>
                    {order.review.comment && (
                      <p className="text-sm text-neutral-dark italic">&quot;{order.review.comment}&quot;</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
