import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import EditProductForm from "./EditProductForm";

export const metadata = {
  title: "Edit Produk | Merchant",
};

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "MERCHANT" || !session.user.id) {
    redirect("/login");
  }

  const merchant = await prisma.merchantProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!merchant || !merchant.isApproved) {
    redirect("/merchant/products");
  }

  const product = await prisma.product.findFirst({
    where: { id, merchantId: merchant.id },
  });

  if (!product) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Edit Produk</h1>
        <p className="text-neutral-dark mt-1">
          Perbarui informasi produk atau layanan Anda.
        </p>
      </div>

      <div className="bg-background border border-neutral-light p-6 sm:p-8 rounded-xl shadow-sm">
        <EditProductForm product={product} />
      </div>
    </div>
  );
}
