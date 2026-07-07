import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CreditCard, Store } from "lucide-react";
import SubscriptionActionButtons from "./SubscriptionActionButtons";

export const metadata = {
  title: "Verifikasi Langganan | Admin",
};

export default async function AdminSubscriptionsPage() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const requests = await prisma.subscriptionRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      merchant: {
        select: {
          storeName: true,
          subscriptionStatus: true,
          user: { select: { name: true, email: true } },
        },
      },
    },
  });

  const pendingRequests = requests.filter(r => r.status === "PENDING");
  const processedRequests = requests.filter(r => r.status !== "PENDING");

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "PENDING":
        return <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-md text-xs font-bold border border-amber-100">Menunggu</span>;
      case "APPROVED":
        return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-xs font-bold border border-emerald-100">Disetujui</span>;
      case "REJECTED":
        return <span className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-md text-xs font-bold border border-rose-100">Ditolak</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Verifikasi Langganan</h1>
        <p className="text-neutral-500 mt-2 font-medium">Kelola permohonan upgrade SiapSedia Pro dari merchant.</p>
      </div>

      {/* Menunggu Verifikasi */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-neutral-400" />
            Menunggu Verifikasi ({pendingRequests.length})
          </h2>
        </div>
        
        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center text-neutral-500 text-sm">Tidak ada permohonan baru.</div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {pendingRequests.map((req) => (
              <div key={req.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">{req.merchant.storeName}</h3>
                    <p className="text-sm text-neutral-500">{req.merchant.user.name} ({req.merchant.user.email})</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Diajukan pada: {req.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                <SubscriptionActionButtons requestId={req.id} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Riwayat Verifikasi */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <h2 className="font-semibold text-neutral-900 text-sm">Riwayat Verifikasi</h2>
        </div>
        
        {processedRequests.length === 0 ? (
          <div className="p-8 text-center text-neutral-500 text-sm">Belum ada riwayat.</div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {processedRequests.map((req) => (
              <div key={req.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm">{req.merchant.storeName}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Diproses pada: {req.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <StatusBadge status={req.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
