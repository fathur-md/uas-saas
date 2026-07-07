import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ExternalLink, Store } from "lucide-react";
import MerchantActionButtons from "./MerchantActionButtons";

export const metadata = {
  title: "Persetujuan Merchant | Admin",
};

export default async function AdminMerchantsPage() {
  // Ambil semua merchant yang tidak di-soft-delete beserta data usernya
  const merchants = await prisma.merchantProfile.findMany({
    where: {
      user: { deletedAt: null }
    },
    include: {
      user: true,
    },
    orderBy: {
      user: {
        createdAt: "desc",
      },
    },
  });

  const pendingMerchants = merchants.filter((m) => !m.isApproved);
  const approvedMerchants = merchants.filter((m) => m.isApproved);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Persetujuan Merchant</h1>
        <p className="text-neutral-500 mt-2 font-medium">
          Kelola pendaftaran merchant baru yang ingin bergabung ke SiapSedia.
        </p>
      </div>

      {/* Menunggu Persetujuan */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
            Menunggu Persetujuan
          </h2>
          <span className="bg-amber-100 text-amber-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
            {pendingMerchants.length}
          </span>
        </div>
        
        {pendingMerchants.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center bg-white border border-neutral-100 rounded-2xl shadow-sm">
            <div className="h-16 w-16 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
              <Store className="h-6 w-6 text-neutral-300" strokeWidth={1.5} />
            </div>
            <p className="text-neutral-900 font-medium">Tidak ada pendaftaran merchant baru saat ini.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-600">
                <thead className="bg-neutral-50/30 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  <tr className="border-b border-neutral-100">
                    <th scope="col" className="px-6 py-4">Toko, Pemilik & Aksi</th>
                    <th scope="col" className="px-6 py-4">Lokasi / Area</th>
                    <th scope="col" className="px-6 py-4">Kontak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {pendingMerchants.map((merchant) => (
                    <tr key={merchant.id} className="hover:bg-neutral-50/50 transition-colors group">
                      <td className="px-6 py-4 w-1/3">
                        <div className="font-semibold text-neutral-900">{merchant.storeName}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 font-medium mb-3">{merchant.user.name}</div>
                        <div className="flex items-center gap-2">
                          <MerchantActionButtons merchantId={merchant.id} />
                          <Link href={`/admin/merchants/${merchant.id}`} className="flex items-center gap-1.5 font-semibold text-[11px] text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider ml-1">
                            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                            Detail
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top pt-5">
                        <div className="font-medium text-neutral-800">{merchant.area}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 font-medium truncate max-w-xs">{merchant.address}</div>
                      </td>
                      <td className="px-6 py-4 align-top pt-5">
                        <div className="font-medium text-neutral-800">{merchant.user.phoneNumber}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 font-medium">{merchant.user.email}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="block lg:hidden divide-y divide-neutral-100">
              {pendingMerchants.map((merchant) => (
                <div key={merchant.id} className="p-5 space-y-4">
                  <div>
                    <div className="font-bold text-neutral-900 text-base">{merchant.storeName}</div>
                    <div className="text-xs font-medium text-neutral-500 mt-0.5">Oleh: {merchant.user.name}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Area</div>
                      <div className="font-medium text-neutral-800">{merchant.area}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Kontak</div>
                      <div className="font-medium text-neutral-800">{merchant.user.phoneNumber}</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    <span className="font-semibold">Alamat:</span> {merchant.address}
                  </div>

                  <div className="pt-4 border-t border-neutral-50 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <MerchantActionButtons merchantId={merchant.id} />
                    </div>
                    <Link href={`/admin/merchants/${merchant.id}`} className="p-2 text-blue-600 bg-blue-50 rounded-lg">
                      <ExternalLink className="h-4 w-4" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Merchant Aktif */}
      <section className="pt-4">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
            Merchant Aktif
          </h2>
          <span className="bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
            {approvedMerchants.length}
          </span>
        </div>

        {approvedMerchants.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center bg-white border border-neutral-100 rounded-2xl shadow-sm">
            <div className="h-16 w-16 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
              <Store className="h-6 w-6 text-neutral-300" strokeWidth={1.5} />
            </div>
            <p className="text-neutral-900 font-medium">Belum ada merchant yang disetujui.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-600">
                <thead className="bg-neutral-50/30 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  <tr className="border-b border-neutral-100">
                    <th scope="col" className="px-6 py-4">Toko & Aksi</th>
                    <th scope="col" className="px-6 py-4">Area</th>
                    <th scope="col" className="px-6 py-4">Kontak</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {approvedMerchants.map((merchant) => (
                    <tr key={merchant.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="px-6 py-4 w-1/3">
                        <div className="font-semibold text-neutral-900 mb-3">{merchant.storeName}</div>
                        <Link href={`/admin/merchants/${merchant.id}`} className="inline-flex items-center gap-1.5 font-semibold text-[11px] text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider">
                          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                          Detail
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-medium text-neutral-800 align-top pt-5">{merchant.area}</td>
                      <td className="px-6 py-4 text-neutral-500 font-medium align-top pt-5">{merchant.user.phoneNumber}</td>
                      <td className="px-6 py-4 align-top pt-5">
                        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-600">
                          Aktif
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="block lg:hidden divide-y divide-neutral-100">
              {approvedMerchants.map((merchant) => (
                <div key={merchant.id} className="p-5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-neutral-900 text-sm mb-1">{merchant.storeName}</div>
                    <div className="text-xs font-medium text-neutral-500">
                      {merchant.area} • {merchant.user.phoneNumber}
                    </div>
                  </div>
                  <Link href={`/admin/merchants/${merchant.id}`} className="p-2.5 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <ExternalLink className="h-4 w-4" strokeWidth={2} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
