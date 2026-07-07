"use client";

import { useTransition, useState } from "react";
import { requestSubscriptionUpgrade, cancelSubscription } from "@/app/actions/merchant";
import { Sparkles, CreditCard, Wallet, AlertTriangle, X } from "lucide-react";

export default function SubscriptionManager({ 
  currentStatus, 
  compact = false,
  hasPendingRequest = false,
}: { 
  currentStatus: "FREE" | "PREMIUM";
  compact?: boolean;
  hasPendingRequest?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpgrade = () => {
    startTransition(async () => {
      setMessage(null);
      const res = await requestSubscriptionUpgrade();
      if (res.error) {
        setMessage({ type: "error", text: res.error });
      } else {
        setMessage({ type: "success", text: "Pembayaran berhasil disubmit. Menunggu verifikasi admin." });
        setIsModalOpen(false);
      }
    });
  };

  const handleCancel = () => {
    if (!confirm("Yakin ingin berhenti berlangganan? Anda akan kembali ke batas 6 pesanan/bulan.")) return;
    
    startTransition(async () => {
      setMessage(null);
      const res = await cancelSubscription();
      if (res.error) {
        setMessage({ type: "error", text: res.error });
      } else {
        setMessage({ type: "success", text: "Langganan berhasil dibatalkan." });
      }
    });
  };

  if (currentStatus === "PREMIUM") {
    return (
      <div className={`rounded-xl border border-emerald-100 bg-emerald-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${compact ? 'p-4 mt-4' : 'p-5 mt-6'}`}>
        <div>
          <h3 className="font-bold text-emerald-800 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            SiapSedia Pro Aktif
          </h3>
          <p className="text-sm text-emerald-600 mt-1">Anda bebas menerima pesanan tanpa batas.</p>
        </div>
        <div className="flex flex-col gap-2 min-w-[140px]">
          <button
            onClick={handleCancel}
            disabled={isPending}
            className="whitespace-nowrap inline-flex items-center justify-center rounded-lg bg-white border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Memproses..." : "Berhenti Berlangganan"}
          </button>
        </div>
        
        {message && (
          <div className="absolute bottom-4 right-4 p-3 rounded-md text-sm border bg-white shadow-lg">
            {message.text}
          </div>
        )}
      </div>
    );
  }

  if (hasPendingRequest) {
    return (
      <div className={`rounded-xl border border-amber-200 bg-amber-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${compact ? 'p-4 mt-4' : 'p-5 mt-6'}`}>
        <div>
          <h3 className="font-bold text-amber-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Menunggu Verifikasi Admin
          </h3>
          <p className="text-sm text-amber-700 mt-1">
            Pembayaran Anda sedang kami tinjau. Akun Anda akan segera di-upgrade ke Pro setelah disetujui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`rounded-xl border border-accent/20 bg-accent/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${compact ? 'p-4 mt-4' : 'p-5 mt-6'}`}>
        <div>
          <h3 className="font-bold text-primary flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Upgrade ke SiapSedia Pro
          </h3>
          <p className="text-sm text-neutral-dark/80 mt-1">
            Dapatkan pesanan tanpa batas (lebih dari 6 pesanan/bulan) seharga Rp 29.000.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="whitespace-nowrap inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90 transition-colors shadow-sm hover:shadow"
        >
          Upgrade Sekarang
        </button>
        
        {message && !isModalOpen && (
          <div className={`mt-4 p-3 rounded-md text-sm border w-full sm:w-auto ${
            message.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"
          }`}>
            {message.text}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-neutral-light/50 bg-neutral-50/50">
              <h2 className="text-lg font-bold text-primary">Pembayaran Pro</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-dark/50 hover:text-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-accent/10 text-accent p-4 rounded-xl mb-6 text-center">
                <p className="text-sm font-medium mb-1">Total Tagihan Bulanan</p>
                <p className="text-3xl font-bold">Rp 29.000</p>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-sm font-medium text-neutral-dark">Pilih metode pembayaran (Transfer Manual):</p>
                
                <div className="border border-neutral-light/50 rounded-xl p-4 flex items-center gap-4 hover:border-accent/50 cursor-pointer transition-colors">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">BCA - 0123456789</p>
                    <p className="text-xs text-neutral-dark/70">a.n PT SiapSedia Teknologi</p>
                  </div>
                </div>

                <div className="border border-neutral-light/50 rounded-xl p-4 flex items-center gap-4 hover:border-accent/50 cursor-pointer transition-colors">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">GoPay - 081234567890</p>
                    <p className="text-xs text-neutral-dark/70">a.n SiapSedia Official</p>
                  </div>
                </div>
                
                <div className="border border-neutral-light/50 rounded-xl p-4 flex items-center gap-4 hover:border-accent/50 cursor-pointer transition-colors">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">ShopeePay - 081234567890</p>
                    <p className="text-xs text-neutral-dark/70">a.n SiapSedia Official</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-3 mb-6 border border-blue-100">
                <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  (Khusus versi Demo/UAS) Anda tidak perlu mengunggah bukti transfer. Cukup klik tombol di bawah ini dan akun akan langsung terverifikasi sebagai Pro.
                </p>
              </div>

              <button
                onClick={handleUpgrade}
                disabled={isPending}
                className="w-full bg-accent text-white font-bold py-3.5 rounded-xl hover:bg-accent/90 disabled:opacity-50 transition-colors shadow-lg shadow-accent/20"
              >
                {isPending ? "Memverifikasi Pembayaran..." : "Saya Sudah Transfer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
