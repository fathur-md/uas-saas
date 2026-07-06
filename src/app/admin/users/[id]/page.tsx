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
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          merchant: { select: { storeName: true, id: true } }
        }
      }
    }
  });

  if (!user || user.role !== "CUSTOMER") {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Customer tidak ditemukan</h1>
        <Link href="/admin/users" className="text-accent hover:underline">Kembali ke Kelola User</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href="/admin/users" className="inline-flex items-center text-sm font-medium text-neutral-dark hover:text-primary mb-2 transition">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Kelola User
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Customer Profile Info */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-background border border-neutral-light rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">{user.name}</h1>
                <p className="text-sm text-neutral-dark">Terdaftar: {user.createdAt.toLocaleDateString("id-ID")}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <Phone className="h-4 w-4 text-neutral-dark mt-0.5" />
                <div>
                  <p className="text-primary font-medium">Telepon / WA</p>
                  <p className="text-neutral-dark">{user.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 text-neutral-dark mt-0.5" />
                <div>
                  <p className="text-primary font-medium">Email</p>
                  <p className="text-neutral-dark">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-neutral-dark mt-0.5" />
                <div>
                  <p className="text-primary font-medium">Alamat Default</p>
                  <p className="text-neutral-dark">{user.address}</p>
                </div>
              </div>
            </div>
            
            {user.deletedAt && (
              <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200 text-center font-medium">
                Akun ini telah dinonaktifkan (Soft Deleted).
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order History */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="bg-background border border-neutral-light rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2 mb-4">
              <ShoppingBag className="h-5 w-5" /> Riwayat Pesanan ({user.orders.length})
            </h2>

            {user.orders.length === 0 ? (
              <p className="text-neutral-dark text-sm">Customer ini belum pernah memesan.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-neutral-dark">
                  <thead className="bg-neutral-light/30 text-xs uppercase text-primary">
                    <tr>
                      <th className="px-4 py-2">ID / Tgl</th>
                      <th className="px-4 py-2">Merchant</th>
                      <th className="px-4 py-2">Total</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-light">
                    {user.orders.map(order => (
                      <tr key={order.id}>
                        <td className="px-4 py-3">
                          <div className="font-mono text-xs font-semibold">#{order.id.slice(0,8)}</div>
                          <div className="text-[11px] text-neutral-dark mt-0.5">{order.createdAt.toLocaleDateString("id-ID")}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Link href={`/admin/merchants/${order.merchant.id}`} className="font-medium text-accent hover:underline flex items-center gap-1">
                            {order.merchant.storeName} <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
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
