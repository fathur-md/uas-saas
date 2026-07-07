import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Package, Clock, CheckCircle, Truck, MapPin, CreditCard, XCircle, FileText, Store } from "lucide-react";
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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING": return { icon: <Clock className="h-5 w-5" />, color: "text-amber-600 bg-amber-50 border-amber-200", text: "Menunggu Konfirmasi", glow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]" };
      case "ACCEPTED": return { icon: <CheckCircle className="h-5 w-5" />, color: "text-blue-600 bg-blue-50 border-blue-200", text: "Pesanan Diterima", glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]" };
      case "PROCESSING": return { icon: <Package className="h-5 w-5" />, color: "text-indigo-600 bg-indigo-50 border-indigo-200", text: "Sedang Diproses", glow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]" };
      case "DELIVERING": return { icon: <Truck className="h-5 w-5" />, color: "text-orange-600 bg-orange-50 border-orange-200", text: "Sedang Diantar", glow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]" };
      case "COMPLETED": return { icon: <CheckCircle className="h-5 w-5" />, color: "text-emerald-600 bg-emerald-50 border-emerald-200", text: "Selesai", glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]" };
      case "REJECTED": return { icon: <XCircle className="h-5 w-5" />, color: "text-rose-600 bg-rose-50 border-rose-200", text: "Ditolak Merchant", glow: "" };
      case "CANCELLED": return { icon: <XCircle className="h-5 w-5" />, color: "text-neutral-500 bg-neutral-100 border-neutral-200", text: "Dibatalkan", glow: "" };
      default: return { icon: <Clock className="h-5 w-5" />, color: "text-neutral-600 bg-neutral-100 border-neutral-200", text: status, glow: "" };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="bg-white/50 backdrop-blur-md rounded-3xl p-4 md:p-6 border border-white/60 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">Pesanan Saya</h1>
          <p className="text-neutral-dark/80 mt-2 font-medium">
            Pantau status pesanan dan berikan ulasan Anda di sini.
          </p>
        </div>
        <div className="hidden md:flex w-16 h-16 bg-accent/10 rounded-2xl items-center justify-center">
          <FileText className="w-8 h-8 text-accent" />
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-16 text-center border border-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 z-0" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mb-6 shadow-inner relative">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-neutral-light/50 animate-[spin_10s_linear_infinite]" />
              <Package className="h-10 w-10 text-neutral-dark/40" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Belum ada pesanan</h3>
            <p className="text-neutral-dark/80 max-w-md mx-auto mb-8">
              Anda belum pernah melakukan pemesanan. Yuk mulai cari layanan di sekitar Anda!
            </p>
            <Link href="/customer/home" className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-accent/30 hover:scale-105 transition-all">
              Cari Layanan Sekarang
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            
            return (
              <div key={order.id} className="bg-white rounded-[2rem] shadow-xl shadow-neutral-light/20 border border-white/60 overflow-hidden relative group hover:shadow-2xl transition-all duration-500">
                
                {/* Header Card */}
                <div className={`px-4 md:px-6 py-4 md:py-5 flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-light/30 gap-4 bg-gradient-to-r from-neutral-50/80 to-white/50 backdrop-blur-sm`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl border ${statusConfig.color} ${statusConfig.glow} transition-all duration-300`}>
                      {statusConfig.icon}
                    </div>
                    <div>
                      <p className={`font-bold ${statusConfig.color.split(' ')[0]}`}>
                        {statusConfig.text}
                      </p>
                      <p className="text-xs font-medium text-neutral-dark/60 mt-0.5">
                        {order.createdAt.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-left md:text-right bg-white px-4 py-2 rounded-xl border border-neutral-light/20 shadow-sm">
                    <p className="text-[10px] text-neutral-dark/50 uppercase tracking-widest font-bold mb-0.5">Toko Pilihan</p>
                    <p className="font-bold text-primary flex items-center gap-1.5 md:justify-end">
                      <Store className="w-3.5 h-3.5 text-accent" />
                      {order.merchant.storeName}
                    </p>
                  </div>
                </div>

                {/* Body Card */}
                <div className="p-4 md:p-8 relative">
                  <div className="space-y-5">
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0 bg-background/50 p-4 rounded-2xl border border-neutral-light/20 group-hover:border-accent/10 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-white rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-neutral-light/30">
                            {item.product.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-neutral-50">
                                <Package className="h-6 w-6 text-neutral-dark/30" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-primary">{item.product.name}</p>
                            <p className="text-sm font-medium text-neutral-dark/70 bg-neutral-100 inline-block px-2 py-0.5 rounded-md mt-1">
                              {item.quantity} x Rp {item.price.toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-primary text-lg self-end md:self-auto">
                          Rp {(item.quantity * item.price).toLocaleString("id-ID")}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Rincian Tambahan */}
                  <div className="mt-8 pt-8 border-t border-neutral-light/30 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-neutral-50/80 rounded-2xl p-5 border border-neutral-light/20">
                      <h4 className="text-xs font-bold text-neutral-dark/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent" /> Alamat Pengiriman
                      </h4>
                      <p className="text-sm font-medium text-primary leading-relaxed">
                        {order.shippingAddress}
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-5 border border-neutral-light/20 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-neutral-dark font-medium">Ongkos Kirim</span>
                        <span className="font-semibold text-primary">Rp {order.shippingCost.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-neutral-dark font-medium">Metode Pembayaran</span>
                        <span className="font-bold px-2 py-0.5 bg-accent/10 text-accent rounded-md">{order.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between font-extrabold pt-4 border-t border-dashed border-neutral-light/50 text-lg">
                        <span className="text-primary">Total Belanja</span>
                        <span className="text-accent">Rp {order.totalAmount.toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Action Buttons */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {order.status === "PENDING" && (
                      <form action={cancelOrder.bind(null, order.id)}>
                        <button className="flex items-center gap-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200 px-6 py-3 rounded-xl transition-all shadow-sm">
                          <XCircle className="h-4 w-4" /> Batalkan Pesanan
                        </button>
                      </form>
                    )}
                    
                    {order.paymentMethod === "QRIS" && order.paymentStatus === "WAITING_CONFIRMATION" && order.status !== "CANCELLED" && order.status !== "REJECTED" && (
                      order.paymentProofUrl ? (
                        <Link href={`/customer/orders/${order.id}/payment`} className="flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-6 py-3 rounded-xl transition-all shadow-sm">
                          <CheckCircle className="h-4 w-4" /> Bukti Pembayaran Sedang Diproses
                        </Link>
                      ) : (
                        <Link href={`/customer/orders/${order.id}/payment`} className="flex items-center gap-2 text-sm font-bold text-white bg-accent hover:bg-accent/90 hover:scale-105 px-6 py-3 rounded-xl transition-all shadow-lg shadow-accent/30">
                          <CreditCard className="h-4 w-4" /> Unggah Bukti Pembayaran
                        </Link>
                      )
                    )}
                  </div>

                  {/* Form Ulasan muncul jika pesanan sudah selesai dan belum direview */}
                  {order.status === "COMPLETED" && !order.review && (
                    <div className="mt-8">
                      <ReviewForm orderId={order.id} />
                    </div>
                  )}
                  
                  {order.review && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-white rounded-2xl border border-amber-100 shadow-sm relative overflow-hidden">
                      <div className="absolute -right-6 -top-6 text-amber-500/10">
                        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                      </div>
                      <h4 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider relative z-10">Ulasan Anda</h4>
                      <div className="flex text-amber-400 mb-3 relative z-10 drop-shadow-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-xl ${i < order.review!.rating ? "" : "text-neutral-light/50"}`}>★</span>
                        ))}
                      </div>
                      {order.review.comment && (
                        <p className="text-neutral-dark/80 italic relative z-10 font-medium">&quot;{order.review.comment}&quot;</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
