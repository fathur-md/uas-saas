import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CustomerProfileForm from "./ProfileForm";

export const metadata = {
  title: "Profil Saya | Customer",
};

export default async function CustomerProfilePage() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "CUSTOMER" || !session.user.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return <div>User tidak ditemukan</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Profil Saya</h1>
        <p className="text-neutral-dark mt-1">
          Kelola informasi pribadi dan alamat pengiriman Anda.
        </p>
      </div>

      <div className="bg-background border border-neutral-light p-6 rounded-xl shadow-sm">
        <CustomerProfileForm user={user} />
      </div>
    </div>
  );
}
