import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AddProductForm from "./AddProductForm";
import { deleteProduct, toggleProductStatus } from "@/app/actions/product";

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
      <div>
        <h1 className="text-2xl font-bold text-primary">Kelola Produk & Layanan</h1>
        <p className="text-neutral-dark mt-1">
          Tambahkan atau perbarui produk galon, gas, atau layanan laundry Anda di sini.
        </p>
      </div>

      <AddProductForm />

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-primary mb-4 border-b border-neutral-light pb-2">
          Daftar Produk ({products.length})
        </h2>

        {products.length === 0 ? (
          <p className="text-neutral-dark text-sm">Anda belum menambahkan produk apa pun.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-background border border-neutral-light rounded-lg shadow-sm overflow-hidden flex flex-col">
                {product.imageUrl ? (
                  <div className="h-48 w-full bg-neutral-light/30 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-neutral-light/30 flex items-center justify-center">
                    <span className="text-neutral-dark">Tidak ada gambar</span>
                  </div>
                )}
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary">{product.name}</h3>
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {product.category}
                    </span>
                  </div>
                  
                  <p className="text-lg font-bold text-primary mb-2">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  
                  {product.description && (
                    <p className="text-sm text-neutral-dark mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-light/50">
                    <form action={toggleProductStatus.bind(null, product.id, !product.isAvailable)}>
                      <button 
                        type="submit"
                        className={`text-sm font-medium ${product.isAvailable ? "text-green-600" : "text-gray-500"}`}
                      >
                        {product.isAvailable ? "Tersedia" : "Kosong"}
                      </button>
                    </form>
                    
                    <Link
                      href={`/merchant/products/${product.id}/edit`}
                      className="text-sm font-medium text-accent hover:text-accent/80"
                    >
                      Edit
                    </Link>

                    <form action={deleteProduct.bind(null, product.id)}>
                      <button 
                        type="submit"
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Hapus
                      </button>
                    </form>
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
