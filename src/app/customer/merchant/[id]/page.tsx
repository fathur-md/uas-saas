import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Store,
  Clock,
  Info,
  PackageOpen
} from "lucide-react";
import OrderForm from "./OrderForm";
import { auth } from "@/auth";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const merchant = await prisma.merchantProfile.findUnique({
    where: { id: params.id }
  });
  return {
    title: merchant ? `${merchant.storeName} | Pesan` : "Toko Tidak Ditemukan"
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
        select: { name: true, phoneNumber: true }
      },
      products: {
        where: { isAvailable: true }
      }
    }
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
    <div className="max-w-5xl mx-auto space-y-6 relative">
      <Link
        href="/customer/home"
        className="inline-flex items-center text-sm font-bold text-neutral-dark/60 hover:text-primary transition-colors bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white shadow-sm mb-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Beranda
      </Link>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-neutral-light/20 border border-white/60 overflow-hidden relative">
        {/* Banner Section */}
        <div className="h-48 md:h-64 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-accent/90 via-primary to-[#0f172a]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/40 blur-[100px] rounded-full" />

          {/* Decorative Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-size-[24px_24px]" />
        </div>

        <div className="px-4 md:px-10 pb-10">
          {/* Elemen yang menimpa banner (Logo Toko & Status) */}
          <div className="relative flex justify-between items-end -mt-12 md:-mt-20 mb-5 z-10">
            <div className="h-32 w-32 bg-white rounded-3xl shadow-xl flex items-center justify-center border-[6px] border-white relative group overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-linear-to-br from-neutral-50 to-neutral-100 z-0" />
              <Store className="h-12 w-12 text-accent relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <div
              className={`px-4 md:px-5 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold shadow-lg flex items-center gap-2 leading-normal mb-2 ${
                merchant.isOpen
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-emerald-500/20"
                  : "bg-rose-50 text-rose-700 border border-rose-200 shadow-rose-500/20"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${merchant.isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
              />
              <span className="whitespace-nowrap">
                {merchant.isOpen ? "Buka Sekarang" : "Sedang Tutup"}
              </span>
            </div>
          </div>

          {/* Info Toko (Aman di area putih, tidak menimpa banner) */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-extrabold text-primary tracking-tight mb-2 leading-normal">
              {merchant.storeName}
            </h1>
            <p className="text-sm font-bold text-neutral-dark/50 uppercase tracking-widest leading-relaxed">
              Dikelola oleh {merchant.user.name}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm font-medium mb-8 bg-neutral-50/80 p-5 rounded-2xl border border-neutral-light/50">
            <div className="flex items-start text-neutral-dark/80">
              <MapPin className="h-5 w-5 mr-3 text-accent shrink-0" />
              <span className="leading-relaxed">
                <span className="font-bold text-primary">{merchant.area}</span>{" "}
                — {merchant.address}
              </span>
            </div>
            <div className="hidden md:block w-px bg-neutral-light/50 self-stretch" />
            <div className="flex items-center text-neutral-dark/80 whitespace-nowrap">
              <Clock className="h-5 w-5 mr-3 text-accent" />
              Ongkir:{" "}
              <span className="font-bold text-primary ml-1">
                Rp {merchant.deliveryFee.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {merchant.description && (
            <div className="mb-10 text-neutral-dark/80 leading-relaxed bg-white/50 border border-neutral-light/30 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 font-bold text-primary">
                <Info className="w-4 h-4 text-accent" /> Tentang Toko
              </div>
              {merchant.description}
            </div>
          )}

          <div className="border-t border-neutral-light/50 pt-10">
            <h2 className="text-2xl font-extrabold text-primary mb-8 flex items-center gap-3">
              <PackageOpen className="w-6 h-6 text-accent" />
              Layanan & Produk
            </h2>

            {merchant.products.length === 0 ? (
              <div className="bg-neutral-50/50 rounded-2xl p-10 text-center border border-dashed border-neutral-light/80">
                <PackageOpen className="w-12 h-12 text-neutral-dark/30 mx-auto mb-4" />
                <p className="font-bold text-primary">Belum Ada Produk</p>
                <p className="text-sm text-neutral-dark/60 mt-1">
                  Merchant ini belum menambahkan produk yang tersedia saat ini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {merchant.products.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white flex flex-col md:flex-row gap-0 md:gap-6 p-2 rounded-4xl border border-neutral-light/50 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                  >
                    <div className="w-full md:w-2/5 h-48 md:h-auto min-h-50 rounded-3xl overflow-hidden shrink-0 relative">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-neutral-50 to-neutral-100 flex items-center justify-center border border-neutral-light/50 rounded-3xl m-2">
                          <PackageOpen className="w-10 h-10 text-neutral-dark/20" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-accent shadow-sm border border-white">
                        {product.category}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between p-4 md:py-6 md:pr-6">
                      <div>
                        <h3 className="text-xl font-extrabold text-primary group-hover:text-accent transition-colors line-clamp-3 pb-1">
                          {product.name}
                        </h3>
                        <p className="text-2xl font-black text-accent mt-2">
                          Rp {product.price.toLocaleString("id-ID")}
                        </p>
                        {product.description && (
                          <p className="text-sm text-neutral-dark/70 mt-3 line-clamp-3 pb-1 leading-normal">
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-6">
                        {merchant.isOpen ? (
                          <OrderForm
                            product={product}
                            merchant={merchant}
                            defaultAddress={defaultAddress}
                          />
                        ) : (
                          <div className="w-full text-center px-4 py-3 bg-neutral-100 text-neutral-dark/50 rounded-xl font-bold text-sm">
                            Toko Sedang Tutup
                          </div>
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
