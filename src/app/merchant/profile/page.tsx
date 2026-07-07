import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MerchantProfileForm from "./ProfileForm";

export const metadata = {
  title: "Profil Toko | Merchant",
};

export default async function MerchantProfilePage() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "MERCHANT" || !session.user.id) {
    redirect("/login");
  }

  const merchant = await prisma.merchantProfile.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });

  if (!merchant) {
    return <div>Profil Merchant tidak ditemukan</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="border-b border-neutral-light/50 pb-6">
        <h1 className="text-2xl font-bold text-primary tracking-tight">Pengaturan Toko</h1>
        <p className="text-sm text-neutral-dark/70 mt-1">
          Kelola informasi toko, biaya pengiriman, dan status operasional Anda.
        </p>
      </div>

      <div className="bg-white border border-neutral-light/50 p-6 sm:p-8 rounded-xl shadow-sm">
        <MerchantProfileForm merchant={merchant} />
      </div>
    </div>
  );
}
