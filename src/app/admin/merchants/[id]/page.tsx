import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Store, Package, ShoppingBag, MapPin, Phone, Mail, Clock } from "lucide-react";

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
          customer: { select: { name: true } }
        }
      }
    }
  });

  if (!merchant) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Merchant tidak ditemukan</h1>
        <Link href="/admin/merchants" className="text-accent hover:underline">Kembali ke Daftar Merchant</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link href="/admin/merchants" className="inline-flex items-center text-sm font-medium text-neutral-dark hover:text-primary mb-2 transition">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Daftar Merchant
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Merchant Profile Info */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-background border border-neutral-light rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <Store className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">{merchant.storeName}</h1>
                <p className="text-sm text-neutral-dark">{merchant.isApproved ? "Disetujui" : "Menunggu Persetujuan"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-neutral-dark mt-0.5" />
                <div>
                  <p className="text-primary font-medium">Alamat</p>
                  <p className="text-neutral-dark">{merchant.address} ({merchant.area})</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-sm">
                <Phone className="h-4 w-4 text-neutral-dark mt-0.5" />
                <div>
                  <p className="text-primary font-medium">Telepon / WA</p>
                  <p className="text-neutral-dark">{merchant.user.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 text-neutral-dark mt-0.5" />
                <div>
                  <p className="text-primary font-medium">Email Pemilik</p>
                  <p className="text-neutral-dark">{merchant.user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Clock className="h-4 w-4 text-neutral-dark mt-0.5" />
                <div>
                  <p className="text-primary font-medium">Status Buka</p>
                  <p className={merchant.isOpen ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {merchant.isOpen ? "Buka (Menerima Pesanan)" : "Tutup"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-neutral-light">
              <p className="text-sm text-neutral-dark mb-2">QRIS Merchant</p>
              {merchant.qrisImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={merchant.qrisImageUrl} alt="QRIS" className="w-full h-auto border rounded-lg p-2 bg-white" />
              ) : (
                <div className="p-4 bg-neutral-light/30 rounded-lg text-center text-sm text-neutral-dark">
                  Belum mengunggah QRIS
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Products & Orders */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Products List */}
          <div className="bg-background border border-neutral-light rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2 mb-4">
              <Package className="h-5 w-5" /> Daftar Produk ({merchant.products.length})
            </h2>
            
            {merchant.products.length === 0 ? (
              <p className="text-neutral-dark text-sm">Toko ini belum memiliki produk.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {merchant.products.map(product => (
                  <div key={product.id} className="border border-neutral-light rounded-lg p-3 flex gap-3">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded bg-neutral-light/50 flex items-center justify-center text-xs text-neutral-dark">No Img</div>
                    )}
                    <div>
                      <p className="font-semibold text-primary text-sm line-clamp-1">{product.name}</p>
                      <p className="text-xs text-neutral-dark">{product.category}</p>
                      <p className="text-sm font-medium mt-1 text-accent">Rp {product.price.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Orders List */}
          <div className="bg-background border border-neutral-light rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2 mb-4">
              <ShoppingBag className="h-5 w-5" /> Pesanan Terakhir
            </h2>

            {merchant.orders.length === 0 ? (
              <p className="text-neutral-dark text-sm">Toko ini belum menerima pesanan.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-neutral-dark">
                  <thead className="bg-neutral-light/30 text-xs uppercase text-primary">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Customer</th>
                      <th className="px-4 py-2">Total</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-light">
                    {merchant.orders.map(order => (
                      <tr key={order.id}>
                        <td className="px-4 py-3 font-mono text-xs">#{order.id.slice(0,8)}</td>
                        <td className="px-4 py-3 font-medium text-primary">{order.customer.name}</td>
                        <td className="px-4 py-3">Rp {order.totalAmount.toLocaleString("id-ID")}</td>
                        <td className="px-4 py-3">{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
