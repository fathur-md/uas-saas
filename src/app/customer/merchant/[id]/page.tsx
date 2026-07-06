import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Store, Clock } from "lucide-react";
import OrderForm from "./OrderForm";
import { auth } from "@/auth";

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const merchant = await prisma.merchantProfile.findUnique({
    where: { id: params.id },
  });
  return {
    title: merchant ? `${merchant.storeName} | Pesan` : "Toko Tidak Ditemukan",
  };
}

export default async function MerchantDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const session = await auth();
  const customerId = session?.user?.id;

  const merchant = await prisma.merchantProfile.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: { name: true, phoneNumber: true },
      },
      products: {
        where: { isAvailable: true },
      },
    },
  });

  if (!merchant || !merchant.isApproved) {
    notFound();
  }

  // Get current user address if possible
  let defaultAddress = "";
  if (customerId) {
    const cust = await prisma.user.findUnique({ where: { id: customerId } });
    if (cust) defaultAddress = cust.address;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link href="/customer/home" className="inline-flex items-center text-sm font-medium text-neutral-dark hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Pencarian
      </Link>

      <div className="bg-background rounded-2xl shadow-sm border border-neutral-light overflow-hidden">
        <div className="h-32 bg-accent"></div>
        <div className="px-6 sm:px-10 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="h-24 w-24 bg-background rounded-xl shadow-md flex items-center justify-center border-4 border-background">
              <Store className="h-10 w-10 text-neutral-dark" />
            </div>
            <div className={`px-3 py-1.5 rounded-md text-sm font-bold ${merchant.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {merchant.isOpen ? 'Buka Sekarang' : 'Sedang Tutup'}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-primary mb-2">{merchant.storeName}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-neutral-dark mb-6">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5 text-neutral-dark" />
              {merchant.address} ({merchant.area})
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-neutral-dark" />
              Ongkir: Rp {merchant.deliveryFee.toLocaleString("id-ID")}
            </div>
          </div>

          {merchant.description && (
            <p className="text-primary mb-6 leading-relaxed">
              {merchant.description}
            </p>
          )}

          <div className="border-t border-neutral-light pt-8">
            <h2 className="text-xl font-bold text-primary mb-6">Produk Tersedia</h2>
            
            {merchant.products.length === 0 ? (
              <p className="text-neutral-dark italic">Merchant ini belum memiliki produk yang tersedia saat ini.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {merchant.products.map((product) => (
                  <div key={product.id} className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl border border-neutral-light hover:border-accent/30 transition">
                    <div className="sm:w-1/4 h-40 bg-neutral-light/30 rounded-lg overflow-hidden flex-shrink-0">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-dark">No Image</div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-primary">{product.name}</h3>
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-xl font-bold text-primary mt-2">
                          Rp {product.price.toLocaleString("id-ID")}
                        </p>
                        {product.description && (
                          <p className="text-sm text-neutral-dark mt-2 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-neutral-light/50">
                        {merchant.isOpen ? (
                          <OrderForm 
                            product={product} 
                            merchant={merchant} 
                            defaultAddress={defaultAddress}
                          />
                        ) : (
                          <button disabled className="w-full sm:w-auto px-4 py-2 bg-neutral-light/50 text-neutral-dark rounded-lg cursor-not-allowed font-medium text-sm">
                            Toko Tutup
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
