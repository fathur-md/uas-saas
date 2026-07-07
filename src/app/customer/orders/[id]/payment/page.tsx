import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PaymentClient from "./PaymentClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Pembayaran Pesanan | Customer",
};

export default async function PaymentPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const orderId = params.id;
  
  const session = await auth();
  if (!session?.user || session.user.role !== "CUSTOMER" || !session.user.id) {
    redirect("/login");
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId, customerId: session.user.id },
    include: {
      merchant: {
        select: { qrisImageUrl: true, storeName: true }
      }
    }
  });

  if (!order) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">Pesanan tidak ditemukan.</h1>
        <Link href="/customer/orders" className="text-accent hover:underline mt-4 inline-block">
          Kembali ke Riwayat Pesanan
        </Link>
      </div>
    );
  }

  if (order.paymentMethod !== "QRIS") {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold text-primary">Metode pembayaran pesanan ini bukan QRIS.</h1>
        <Link href="/customer/orders" className="text-accent hover:underline mt-4 inline-block">
          Kembali ke Riwayat Pesanan
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/customer/orders" className="inline-flex items-center text-sm font-medium text-neutral-dark hover:text-primary mb-6 transition">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Riwayat Pesanan
      </Link>
      
      <div>
        <h1 className="text-2xl font-bold text-primary">Pembayaran QRIS</h1>
        <p className="text-neutral-dark mt-1">
          Selesaikan pembayaran Anda untuk pesanan di toko <span className="font-semibold">{order.merchant.storeName}</span>.
        </p>
      </div>

      {!order.merchant.qrisImageUrl ? (
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl mt-6 text-center">
          <p className="text-red-700">Maaf, Merchant ini belum mengunggah gambar QRIS. Silakan hubungi Merchant atau batalkan pesanan.</p>
        </div>
      ) : (
        <PaymentClient 
          orderId={order.id} 
          qrisImageUrl={order.merchant.qrisImageUrl} 
          totalAmount={order.totalAmount}
          initialProofUrl={order.paymentProofUrl}
        />
      )}
    </div>
  );
}
