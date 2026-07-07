import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Store, Package, ShoppingBag, MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Detail Merchant | Admin",
};

export default async function AdminMerchantDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  const merchant = await prisma.merchantProfile.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      products: true,
      orders: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          customer: { select: { name: true, id: true } }
        }
      }
    }
  });

  if (!merchant) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Merchant tidak ditemukan</h1>
        <Link href="/admin/merchants" className="text-blue-600 hover:underline">Kembali ke Daftar Merchant</Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md";
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
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <Link href="/admin/merchants" className="inline-flex items-center text-sm font-semibold text-neutral-500 hover:text-neutral-900 mb-2 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2.5} />
        Kembali ke Daftar Merchant
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Merchant Profile Info */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
              <div className="h-14 w-14 bg-blue-50/50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                <Store className="h-7 w-7" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900 tracking-tight leading-tight">{merchant.storeName}</h1>
                <p className={`text-[11px] font-bold mt-1 uppercase tracking-widest ${merchant.isApproved ? "text-emerald-500" : "text-amber-500"}`}>
                  {merchant.isApproved ? "Disetujui" : "Menunggu Persetujuan"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50/50 text-sm">
                <MapPin className="h-4 w-4 text-neutral-400 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Alamat</p>
                  <p className="font-semibold text-neutral-900">{merchant.address} ({merchant.area})</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50/50 text-sm">
                <Phone className="h-4 w-4 text-neutral-400 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Telepon / WA</p>
                  <p className="font-semibold text-neutral-900">{merchant.user.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50/50 text-sm">
                <Mail className="h-4 w-4 text-neutral-400 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Email Pemilik</p>
                  <p className="font-medium text-neutral-700 break-all">{merchant.user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50/50 text-sm">
                <Clock className="h-4 w-4 text-neutral-400 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Status Buka</p>
                  <p className={`font-bold ${merchant.isOpen ? "text-emerald-600" : "text-red-600"}`}>
                    {merchant.isOpen ? "Buka (Menerima Pesanan)" : "Tutup"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-neutral-100">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">QRIS Merchant</p>
              {merchant.qrisImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={merchant.qrisImageUrl} alt="QRIS" className="w-full h-auto border border-neutral-200 rounded-xl p-2 bg-white" />
              ) : (
                <div className="p-4 bg-neutral-50 rounded-xl text-center text-sm font-medium text-neutral-500 border border-neutral-100 border-dashed">
                  Belum mengunggah QRIS
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Products & Orders */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Products List */}
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/30">
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Package className="h-4 w-4" strokeWidth={2} />
                </div>
                Daftar Produk
              </h2>
              <span className="bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
                {merchant.products.length}
              </span>
            </div>
            
            <div className="p-6">
              {merchant.products.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-neutral-500 font-medium text-sm">Toko ini belum memiliki produk.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {merchant.products.map(product => (
                    <div key={product.id} className="border border-neutral-100 rounded-xl p-3 flex gap-3 hover:border-blue-100 hover:shadow-sm transition-all bg-neutral-50/30 hover:bg-white">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-cover border border-neutral-100" />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-neutral-400 uppercase">No Img</div>
                      )}
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-neutral-900 text-sm line-clamp-1">{product.name}</p>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase mt-0.5">{product.category}</p>
                        </div>
                        <p className="text-sm font-bold text-blue-600">Rp {product.price.toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders List */}
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/30">
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <ShoppingBag className="h-4 w-4" strokeWidth={2} />
                </div>
                Pesanan Terakhir
              </h2>
            </div>

            {merchant.orders.length === 0 ? (
              <div className="p-10 text-center flex flex-col items-center">
                <ShoppingBag className="h-10 w-10 text-neutral-300 mb-3" strokeWidth={1.5} />
                <p className="text-neutral-500 font-medium text-sm">Toko ini belum menerima pesanan.</p>
              </div>
            ) : (
              <>
                {/* Desktop View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left text-sm text-neutral-600">
                    <thead className="bg-neutral-50/30 text-[10px] uppercase font-bold text-neutral-400 tracking-widest border-b border-neutral-100">
                      <tr>
                        <th className="px-6 py-4">ID Pesanan & Status</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Total Belanja</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {merchant.orders.map(order => (
                        <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors group">
                          <td className="px-6 py-4 align-top w-1/3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="font-mono text-xs font-bold text-neutral-900">#{order.id.slice(0,8)}</div>
                              {getStatusBadge(order.status)}
                            </div>
                            <div className="text-[11px] font-medium text-neutral-400 mt-1">{order.createdAt.toLocaleDateString("id-ID")}</div>
                          </td>
                          <td className="px-6 py-4 align-top pt-5">
                            <Link href={`/admin/users/${order.customer.id}`} className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 w-fit">
                              {order.customer.name} <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </td>
                          <td className="px-6 py-4 font-bold text-neutral-900 align-top pt-5">
                            Rp {order.totalAmount.toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="block lg:hidden divide-y divide-neutral-100">
                  {merchant.orders.map(order => (
                    <div key={order.id} className="p-5 space-y-3">
                      <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                        <div>
                          <div className="font-mono text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-1 rounded-md inline-block mb-1">
                            #{order.id.slice(0, 8)}
                          </div>
                          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
                            {order.createdAt.toLocaleDateString("id-ID")}
                          </div>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm pt-1">
                        <div>
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">Pemesan</span>
                          <Link href={`/admin/users/${order.customer.id}`} className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 w-fit">
                            {order.customer.name}
                            <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
                          </Link>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">Total</span>
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
      </div>
    </div>
  );
}
