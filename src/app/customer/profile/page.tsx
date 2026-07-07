import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CustomerProfileForm from "./ProfileForm";
import { UserCircle2 } from "lucide-react";

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
    <div className="max-w-2xl mx-auto space-y-8 relative">
      {/* Background Decorative Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="bg-white/50 backdrop-blur-md rounded-3xl p-4 md:p-6 border border-white/60 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">Profil Saya</h1>
          <p className="text-neutral-dark/80 mt-2 font-medium">
            Kelola informasi pribadi dan alamat pengiriman Anda.
          </p>
        </div>
        <div className="hidden md:flex w-16 h-16 bg-accent/10 rounded-2xl items-center justify-center">
          <UserCircle2 className="w-8 h-8 text-accent" />
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-neutral-light/20 p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden">
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <CustomerProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
