import { prisma } from "@/lib/prisma";
import { approveMerchant, rejectMerchant } from "@/app/actions/admin";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

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
        <h1 className="text-2xl font-bold text-primary">Persetujuan Merchant</h1>
        <p className="text-neutral-dark mt-1">
          Kelola pendaftaran merchant baru yang ingin bergabung ke SiapSedia.
        </p>
      </div>

      {/* Tabel Menunggu Persetujuan */}
      <section>
        <h2 className="text-lg font-semibold text-primary mb-4 border-b border-neutral-light pb-2">
          Menunggu Persetujuan ({pendingMerchants.length})
        </h2>
        {pendingMerchants.length === 0 ? (
          <p className="text-neutral-dark text-sm">Tidak ada pendaftaran merchant baru saat ini.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-neutral-light bg-background">
            <table className="w-full text-left text-sm text-neutral-dark">
              <thead className="bg-neutral-light/30 text-xs uppercase text-primary">
                <tr>
                  <th scope="col" className="px-6 py-3">Toko & Pemilik</th>
                  <th scope="col" className="px-6 py-3">Lokasi / Area</th>
                  <th scope="col" className="px-6 py-3">Kontak</th>
                  <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pendingMerchants.map((merchant) => (
                  <tr key={merchant.id} className="border-b border-neutral-light">
                    <td className="px-6 py-4">
                      <div className="font-medium text-primary">{merchant.storeName}</div>
                      <div className="text-xs">{merchant.user.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-primary">{merchant.area}</div>
                      <div className="text-xs truncate max-w-xs">{merchant.address}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{merchant.user.phoneNumber}</div>
                      <div className="text-xs">{merchant.user.email}</div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <form className="inline-block" action={approveMerchant.bind(null, merchant.id)}>
                        <button type="submit" className="font-medium text-green-600 hover:underline bg-green-50 px-3 py-1 rounded-md">
                          Approve
                        </button>
                      </form>
                      <form className="inline-block" action={rejectMerchant.bind(null, merchant.id)}>
                        <button type="submit" className="font-medium text-red-600 hover:underline bg-red-50 px-3 py-1 rounded-md">
                          Tolak
                        </button>
                      </form>
                      <Link href={`/admin/merchants/${merchant.id}`} className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline bg-blue-50 px-3 py-1 rounded-md">
                        <ExternalLink className="h-3 w-3" />
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Tabel Sudah Disetujui */}
      <section>
        <h2 className="text-lg font-semibold text-primary mb-4 border-b border-neutral-light pb-2">
          Merchant Aktif ({approvedMerchants.length})
        </h2>
        {approvedMerchants.length === 0 ? (
          <p className="text-neutral-dark text-sm">Belum ada merchant yang disetujui.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-neutral-light bg-background">
            <table className="w-full text-left text-sm text-neutral-dark">
              <thead className="bg-neutral-light/30 text-xs uppercase text-primary">
                <tr>
                  <th scope="col" className="px-6 py-3">Toko</th>
                  <th scope="col" className="px-6 py-3">Area</th>
                  <th scope="col" className="px-6 py-3">Kontak</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {approvedMerchants.map((merchant) => (
                  <tr key={merchant.id} className="border-b border-neutral-light">
                    <td className="px-6 py-4 font-medium text-primary">
                      {merchant.storeName}
                    </td>
                    <td className="px-6 py-4">{merchant.area}</td>
                    <td className="px-6 py-4">{merchant.user.phoneNumber}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Aktif
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/merchants/${merchant.id}`} className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline bg-blue-50 px-3 py-1 rounded-md">
                        <ExternalLink className="h-3 w-3" />
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
