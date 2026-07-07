import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, MapPin, Store, ChevronRight, Droplets, Flame, Shirt } from "lucide-react";

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
    <div className="space-y-12">
      {/* Premium Hero Search Banner */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-primary shadow-2xl p-6 md:p-12 border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/80 via-primary to-[#0f172a] opacity-90" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/40 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/30 blur-[100px] rounded-full" />
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl md:text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Pesan Cepat, <br />
            <span className="text-accent-light text-emerald-300">Langsung Diantar.</span>
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-lg font-light leading-relaxed">
            Temukan agen galon, gas, atau laundry terdekat di sekitar Anda dalam hitungan detik.
          </p>
          
          {/* Glassmorphism Search Form */}
          <form className="flex flex-col md:flex-row gap-3 bg-white/10 backdrop-blur-md p-3 rounded-3xl border border-white/20 shadow-xl">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="text"
                name="area"
                defaultValue={area}
                placeholder="Lokasi atau Kecamatan..."
                className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-transparent rounded-2xl focus:bg-white/10 focus:border-white/30 text-white placeholder-white/50 md:text-sm transition-all focus:outline-none focus:ring-0"
              />
            </div>
            
            <div className="md:w-48 relative group">
              <select
                name="category"
                defaultValue={category || "ALL"}
                className="block w-full py-3.5 px-4 bg-white/5 border border-transparent rounded-2xl focus:bg-white/10 focus:border-white/30 text-white md:text-sm transition-all focus:outline-none focus:ring-0 appearance-none cursor-pointer"
              >
                <option value="ALL" className="text-primary">Semua Kategori</option>
                <option value="GALON" className="text-primary">Galon Air</option>
                <option value="GAS" className="text-primary">Gas LPG</option>
                <option value="LAUNDRY" className="text-primary">Layanan Laundry</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-white text-primary py-3.5 px-8 rounded-2xl font-bold hover:bg-neutral-50 hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              <Search className="h-4 w-4" />
              Cari
            </button>
          </form>
        </div>
      </div>

      {/* Daftar Merchant dengan Card Premium */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            Hasil Pencarian
            <span className="flex items-center justify-center bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
              {merchants.length} Toko
            </span>
          </h2>
        </div>
        
        {merchants.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-light/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[80px] rounded-full" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                <Store className="h-10 w-10 text-neutral-dark/40" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Toko Tidak Ditemukan</h3>
              <p className="text-neutral-dark/70 max-w-sm mx-auto">
                Coba gunakan kata kunci area lain atau pilih semua kategori untuk memperluas pencarian Anda.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchants.map((merchant) => {
              const categories = Array.from(new Set(merchant.products.map(p => p.category)));
              
              return (
                <Link key={merchant.id} href={`/customer/merchant/${merchant.id}`} className="group">
                  <div className="bg-white rounded-[2rem] p-5 md:p-6 border border-neutral-light/20 shadow-sm hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                    {/* Glowing effect on hover */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/0 group-hover:bg-accent/10 blur-[50px] rounded-full transition-all duration-500" />
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-light/30 rounded-2xl flex items-center justify-center shadow-inner">
                          <Store className="h-7 w-7 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors line-clamp-1">
                            {merchant.storeName}
                          </h3>
                          <p className="text-xs font-medium text-neutral-dark/50 uppercase tracking-wider">{merchant.user.name}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start text-sm text-neutral-dark/80 mb-6 bg-background rounded-xl p-3 relative z-10">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-neutral-dark/50 mt-0.5" />
                      <span className="line-clamp-2 leading-relaxed">
                        <span className="font-semibold text-primary">{merchant.area}</span> — {merchant.address}
                      </span>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between relative z-10">
                      <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                          <span key={cat} className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent border border-accent/20" title={cat}>
                            {cat === 'GALON' && <Droplets className="w-4 h-4" />}
                            {cat === 'GAS' && <Flame className="w-4 h-4" />}
                            {cat === 'LAUNDRY' && <Shirt className="w-4 h-4" />}
                          </span>
                        ))}
                        {categories.length === 0 && (
                          <span className="text-xs text-neutral-dark/50 italic py-1">Belum ada produk</span>
                        )}
                      </div>
                      
                      <div className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-2 ${
                        merchant.isOpen 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${merchant.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        {merchant.isOpen ? 'BUKA' : 'TUTUP'}
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shadow-lg">
                        <ChevronRight className="w-5 h-5" />
                      </div>
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
