import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AddProductForm from "./AddProductForm";
import { deleteProduct, toggleProductStatus } from "@/app/actions/product";
import { Package } from "lucide-react";
import SubmitButton from "@/app/components/SubmitButton";

export const metadata = {
  title: "Kelola Produk | Merchant",
};

export default async function MerchantProductsPage() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "MERCHANT" || !session.user.id) {
    redirect("/login");
  }

  // Cari MerchantProfile
  const merchant = await prisma.merchantProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!merchant) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Profil Merchant tidak ditemukan.</p>
      </div>
    );
  }

  // Cek apakah merchant sudah di-approve
  if (!merchant.isApproved) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Toko Anda Sedang Menunggu Persetujuan</h2>
        <p>Anda belum dapat menambahkan produk hingga Admin menyetujui pendaftaran toko Anda. Harap bersabar menunggu.</p>
      </div>
    );
  }

  // Ambil produk milik merchant ini
  const products = await prisma.product.findMany({
    where: { merchantId: merchant.id },
    orderBy: { category: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-neutral-light/50 pb-6">
        <h1 className="text-2xl font-bold text-primary tracking-tight">Kelola Produk & Layanan</h1>
        <p className="text-sm text-neutral-dark/70 mt-1">
          Tambahkan atau perbarui produk galon, gas, atau layanan laundry Anda di sini.
        </p>
      </div>

      <AddProductForm />

      <div className="mt-8">
        <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-neutral-light/50 tracking-tight">
          Daftar Produk ({products.length})
        </h2>

        {products.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl shadow-sm border border-neutral-light/50 flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
              <Package className="h-6 w-6 text-neutral-dark/40" />
            </div>
            <p className="font-medium text-neutral-dark">Belum ada produk.</p>
            <p className="text-sm text-neutral-dark/60 mt-1">Gunakan formulir di atas untuk menambahkan produk pertama Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-neutral-light/50 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
                {product.imageUrl ? (
                  <div className="h-40 w-full bg-neutral-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-40 w-full bg-neutral-50/50 flex items-center justify-center border-b border-neutral-light/30">
                    <span className="text-xs font-medium text-neutral-dark/40 uppercase tracking-wider">No Image</span>
                  </div>
                )}
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-primary tracking-tight line-clamp-1">{product.name}</h3>
                    <span className="inline-flex items-center rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider border border-blue-200">
                      {product.category}
                    </span>
                  </div>
                  
                  <p className="text-lg font-bold text-primary mb-2">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  
                  {product.description && (
                    <p className="text-xs text-neutral-dark/70 mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-light/50">
                    <form action={toggleProductStatus.bind(null, product.id, !product.isAvailable)}>
                      <SubmitButton 
                        className={`text-[11px] font-bold px-2 py-1 rounded border uppercase tracking-wider transition-colors ${
                          product.isAvailable 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                            : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                        }`}
                        loadingText="..."
                      >
                        {product.isAvailable ? "Tersedia" : "Kosong"}
                      </SubmitButton>
                    </form>
                    
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/merchant/products/${product.id}/edit`}
                        className="text-xs font-bold text-accent hover:text-accent-dark transition-colors"
                      >
                        Edit
                      </Link>

                      <form action={deleteProduct.bind(null, product.id)}>
                        <SubmitButton 
                          confirmMessage={`Yakin ingin menghapus produk "${product.name}" secara permanen?`}
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
                          loadingText="Hapus..."
                        >
                          Hapus
                        </SubmitButton>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
