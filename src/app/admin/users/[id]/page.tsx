import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Phone, Mail, MapPin, ShoppingBag, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Detail Customer | Admin",
};

export default async function AdminUserDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      merchantProfile: { select: { id: true } },
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          merchant: { select: { storeName: true, id: true } }
        }
      }
    }
  });

  if (!user) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Pengguna tidak ditemukan</h1>
        <Link href="/admin/users" className="text-blue-600 hover:underline">Kembali ke Kelola Pengguna</Link>
      </div>
    );
  }

  // Jika Merchant, alihkan ke halaman detail merchant
  if (user.role === "MERCHANT" && user.merchantProfile) {
    redirect(`/admin/merchants/${user.merchantProfile.id}`);
  }

  // Jika Admin, berikan pesan sederhana
  if (user.role === "ADMIN") {
    return (
      <div className="text-center p-10 max-w-lg mx-auto bg-white rounded-2xl border border-neutral-100 shadow-sm mt-10">
        <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">{user.name}</h1>
        <p className="text-neutral-500 mb-6">Akun ini memiliki hak akses Administrator tingkat sistem.</p>
        <Link href="/admin/users" className="px-6 py-2.5 bg-neutral-100 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-200 transition-colors">
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <Link href="/admin/users" className="inline-flex items-center text-sm font-semibold text-neutral-500 hover:text-neutral-900 mb-2 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2.5} />
        Kembali ke Kelola Pengguna
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Customer Profile Info */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
              <div className="h-14 w-14 bg-blue-50/50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                <User className="h-7 w-7" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900 tracking-tight leading-tight">{user.name}</h1>
                <p className="text-[11px] font-bold text-neutral-400 mt-1 uppercase tracking-widest">
                  Terdaftar: {user.createdAt.toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50/50">
                <Phone className="h-4 w-4 text-neutral-400 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Telepon / WA</p>
                  <p className="text-sm font-semibold text-neutral-900">{user.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50/50">
                <Mail className="h-4 w-4 text-neutral-400 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-sm font-medium text-neutral-700 break-all">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50/50">
                <MapPin className="h-4 w-4 text-neutral-400 mt-0.5" strokeWidth={2} />
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Alamat Default</p>
                  <p className="text-sm font-medium text-neutral-700">{user.address}</p>
                </div>
              </div>
            </div>
            
            {user.deletedAt && (
              <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 text-center font-medium">
                Akun ini telah dinonaktifkan (Soft Deleted).
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order History */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/30">
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <ShoppingBag className="h-4 w-4" strokeWidth={2} />
                </div>
                Riwayat Pesanan
              </h2>
              <span className="bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
                {user.orders.length}
              </span>
            </div>

            {user.orders.length === 0 ? (
              <div className="p-10 text-center flex flex-col items-center">
                <ShoppingBag className="h-10 w-10 text-neutral-300 mb-3" strokeWidth={1.5} />
                <p className="text-neutral-500 font-medium text-sm">Customer ini belum pernah memesan.</p>
              </div>
            ) : (
              <>
                {/* Desktop View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left text-sm text-neutral-600">
                    <thead className="bg-neutral-50/30 text-[10px] uppercase font-bold text-neutral-400 tracking-widest border-b border-neutral-100">
                      <tr>
                        <th className="px-6 py-4">ID Pesanan & Tanggal</th>
                        <th className="px-6 py-4">Merchant</th>
                        <th className="px-6 py-4">Total & Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {user.orders.map(order => (
                        <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors group">
                          <td className="px-6 py-4 align-top w-1/3">
                            <div className="font-mono text-xs font-bold text-neutral-900 mb-1">#{order.id.slice(0,8)}</div>
                            <div className="text-[11px] font-medium text-neutral-400">{order.createdAt.toLocaleDateString("id-ID")}</div>
                          </td>
                          <td className="px-6 py-4 align-top pt-5">
                            <Link href={`/admin/merchants/${order.merchant.id}`} className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 w-fit">
                              {order.merchant.storeName} <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </td>
                          <td className="px-6 py-4 align-top pt-4">
                            <div className="font-bold text-neutral-900 mb-2">Rp {order.totalAmount.toLocaleString("id-ID")}</div>
                            <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-neutral-100 text-neutral-600">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="block lg:hidden divide-y divide-neutral-100">
                  {user.orders.map(order => (
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
                        <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-neutral-100 text-neutral-600">
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm pt-1">
                        <div>
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">Dari Toko</span>
                          <Link href={`/admin/merchants/${order.merchant.id}`} className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 w-fit">
                            {order.merchant.storeName}
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
