import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, MapPin, Store } from "lucide-react";

export const metadata = {
  title: "Cari Layanan | Customer",
};

export default async function CustomerHomePage(props: {
  searchParams: Promise<{ area?: string; category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const { area, category } = searchParams;

  const whereClause: any = {
    isApproved: true,
    user: { deletedAt: null },
  };

  if (area) {
    whereClause.area = { contains: area, mode: "insensitive" };
  }

  if (category && category !== "ALL") {
    whereClause.products = {
      some: { category: category as any },
    };
  }

  const merchants = await prisma.merchantProfile.findMany({
    where: whereClause,
    include: {
      products: {
        select: { category: true }
      },
      user: {
        select: { name: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      {/* Header & Filter */}
      <div className="bg-background border border-neutral-light p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-primary mb-2">Mau pesan apa hari ini?</h1>
        <p className="text-neutral-dark mb-6">Cari agen galon, gas, atau laundry terdekat di area Anda.</p>
        
        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-neutral-dark" />
            </div>
            <input
              type="text"
              name="area"
              defaultValue={area}
              placeholder="Masukkan kecamatan/area Anda..."
              className="block w-full pl-10 pr-3 py-3 border border-neutral-light rounded-lg focus:ring-accent focus:border-accent sm:text-sm bg-background text-foreground placeholder-neutral-dark"
            />
          </div>
          
          <div className="sm:w-48">
            <select
              name="category"
              defaultValue={category || "ALL"}
              className="block w-full py-3 px-3 border border-neutral-light rounded-lg focus:ring-accent focus:border-accent sm:text-sm bg-background text-foreground"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="GALON">Galon Air</option>
              <option value="GAS">Gas LPG</option>
              <option value="LAUNDRY">Layanan Laundry</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            <Search className="h-4 w-4" />
            Cari
          </button>
        </form>
      </div>

      {/* Daftar Merchant */}
      <div>
        <h2 className="text-lg font-semibold text-primary mb-4">
          Hasil Pencarian ({merchants.length})
        </h2>
        
        {merchants.length === 0 ? (
          <div className="bg-neutral-light/30 rounded-xl p-8 text-center border border-dashed border-neutral-light">
            <Store className="h-10 w-10 text-neutral-dark mx-auto mb-3" />
            <h3 className="text-sm font-medium text-primary">Tidak ditemukan</h3>
            <p className="mt-1 text-sm text-neutral-dark">
              Coba gunakan kata kunci area lain atau pilih semua kategori.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchants.map((merchant) => {
              const categories = Array.from(new Set(merchant.products.map(p => p.category)));
              
              return (
                <Link key={merchant.id} href={`/customer/merchant/${merchant.id}`} className="group block">
                  <div className="bg-background border border-neutral-light rounded-xl shadow-sm p-5 transition hover:shadow-md hover:border-accent/30">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">
                          {merchant.storeName}
                        </h3>
                        <p className="text-sm text-neutral-dark">{merchant.user.name}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${merchant.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {merchant.isOpen ? 'Buka' : 'Tutup'}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-neutral-dark mb-4">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{merchant.area} — {merchant.address}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <span key={cat} className="inline-flex items-center rounded-md bg-neutral-light/30 px-2 py-1 text-xs font-medium text-primary">
                          {cat}
                        </span>
                      ))}
                      {categories.length === 0 && (
                        <span className="text-xs text-neutral-dark italic">Belum ada produk</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
