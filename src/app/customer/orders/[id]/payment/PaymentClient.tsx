"use client";

import { useEffect, useRef, useState } from "react";
import { uploadPaymentProof } from "@/app/actions/payment";
import { Upload, CheckCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentClient({ 
  orderId, 
  qrisImageUrl, 
  totalAmount,
  initialProofUrl
}: { 
  orderId: string; 
  qrisImageUrl: string; 
  totalAmount: number;
  initialProofUrl: string | null;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // Simple countdown timer logic (UI only, reset on refresh)
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await uploadPaymentProof(orderId, formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/customer/orders");
      }, 2000);
    }
    
    setIsUploading(false);
  };

  if (initialProofUrl || success) {
    return (
      <div className="bg-background border border-neutral-light rounded-xl p-8 text-center max-w-md mx-auto mt-8 shadow-sm">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-primary mb-2">Bukti Pembayaran Terkirim!</h2>
        <p className="text-neutral-dark mb-6">
          Terima kasih. Pesanan Anda sedang menunggu konfirmasi dari Merchant.
        </p>
        <button 
          onClick={() => router.push("/customer/orders")}
          className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-accent/90 transition w-full"
        >
          Kembali ke Riwayat Pesanan
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 mt-4">
      {/* Timer Card */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-orange-600" />
          <div>
            <p className="text-sm font-medium text-orange-800">Selesaikan pembayaran dalam</p>
            <p className="text-xs text-orange-600">Pesanan akan dibatalkan otomatis jika lewat batas waktu.</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-orange-600 font-mono bg-white px-3 py-1 rounded-lg">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      {/* QRIS Card */}
      <div className="bg-background border border-neutral-light rounded-xl p-6 shadow-sm text-center">
        <h2 className="text-lg font-bold text-primary mb-1">Scan QRIS untuk Membayar</h2>
        <p className="text-sm text-neutral-dark mb-6">Gunakan aplikasi M-Banking atau E-Wallet Anda (GoPay, OVO, Dana, dll)</p>
        
        <div className="bg-neutral-light/20 p-4 rounded-xl inline-block mb-6 border border-neutral-light">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={qrisImageUrl} 
            alt="QRIS Merchant" 
            className="w-64 h-64 object-contain mx-auto bg-white rounded-lg p-2"
          />
        </div>

        <div className="bg-neutral-light/30 p-4 rounded-lg">
          <p className="text-sm text-neutral-dark mb-1">Total Tagihan:</p>
          <p className="text-2xl font-bold text-primary">Rp {totalAmount.toLocaleString("id-ID")}</p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-background border border-neutral-light rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
          <Upload className="h-5 w-5" /> Unggah Bukti Transfer
        </h3>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Pilih Gambar (JPG/PNG)
            </label>
            <input 
              type="file" 
              name="proofImage" 
              accept="image/*" 
              required
              className="block w-full text-sm text-neutral-dark
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-accent file:text-white
                hover:file:bg-accent/90 cursor-pointer
                border border-neutral-light rounded-md p-2 bg-background"
            />
          </div>
          <button 
            type="submit" 
            disabled={isUploading}
            className="w-full bg-accent text-white py-3 px-4 rounded-lg font-medium hover:bg-accent/90 transition disabled:opacity-50"
          >
            {isUploading ? "Mengunggah..." : "Kirim Bukti Pembayaran"}
          </button>
        </form>
      </div>
    </div>
  );
}
