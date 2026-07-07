import { CustomerSidebar, CustomerTopNav } from "@/app/components/CustomerNavigation";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-background">
      {/* Floating Sidebar untuk Desktop */}
      <aside className="hidden md:flex w-64 flex-col justify-between py-6 pl-6 pr-3 sticky top-0 h-screen self-start">
        <div className="flex-1 bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] flex flex-col overflow-hidden relative">
          {/* Latar Belakang Dekoratif Sidebar */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-2xl rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <CustomerSidebar />
        </div>
      </aside>

      {/* Top Nav untuk Mobile */}
      <CustomerTopNav />

      {/* Area Konten Utama */}
      <main className="flex-1 text-foreground p-4 pt-20 md:py-6 md:pr-6 md:pl-3 pb-8 md:pb-6 relative max-w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10" />
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
