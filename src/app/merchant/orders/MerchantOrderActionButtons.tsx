"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/order";
import { Check, X, Truck, Package, ExternalLink } from "lucide-react";

interface MerchantOrderActionButtonsProps {
  orderId: string;
  status: string;
  paymentStatus: string;
  paymentProofUrl: string | null;
}

export default function MerchantOrderActionButtons({
  orderId,
  status,
  paymentStatus,
  paymentProofUrl,
}: MerchantOrderActionButtonsProps) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (
    newStatus: any,
    newPaymentStatus?: any,
    confirmMessage?: string
  ) => {
    if (confirmMessage && !window.confirm(confirmMessage)) return;

    startTransition(async () => {
      const res = await updateOrderStatus(orderId, newStatus, newPaymentStatus);
      if (res?.error) {
        alert("Gagal: " + res.error);
      }
    });
  };

  return (
    <div className="flex flex-col lg:items-end gap-2">
      {status === "PENDING" && (
        <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto">
          <button
            disabled={isPending}
            onClick={() => handleAction("ACCEPTED")}
            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 lg:py-1.5 rounded-md text-xs font-medium shadow-sm disabled:opacity-50"
          >
            <Check className="h-3 w-3" />
            {isPending ? "Proses..." : "Terima"}
          </button>
          <button
            disabled={isPending}
            onClick={() => handleAction("REJECTED", undefined, "Yakin ingin MENOLAK pesanan ini?")}
            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 w-full bg-white border border-red-200 text-red-600 hover:bg-red-50 px-3 py-2 lg:py-1.5 rounded-md text-xs font-medium disabled:opacity-50"
          >
            <X className="h-3 w-3" />
            {isPending ? "Proses..." : "Tolak"}
          </button>
        </div>
      )}

      {status === "ACCEPTED" && (
        <button
          disabled={isPending}
          onClick={() => handleAction("PROCESSING")}
          className="w-full lg:w-auto flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 lg:py-1.5 rounded-md text-xs font-medium shadow-sm disabled:opacity-50"
        >
          <Package className="h-3 w-3" />
          {isPending ? "Proses..." : "Proses Pesanan"}
        </button>
      )}

      {status === "PROCESSING" && (
        <button
          disabled={isPending}
          onClick={() => handleAction("DELIVERING")}
          className="w-full lg:w-auto flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 lg:py-1.5 rounded-md text-xs font-medium shadow-sm disabled:opacity-50"
        >
          <Truck className="h-3 w-3" />
          {isPending ? "Proses..." : "Antar Sekarang"}
        </button>
      )}

      {status === "DELIVERING" && (
        <button
          disabled={isPending}
          onClick={() => handleAction("COMPLETED", "PAID", "Yakin pesanan sudah SELESAI dan LUNAS?")}
          className="w-full lg:w-auto flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-2 lg:py-1.5 rounded-md text-xs font-medium shadow-sm disabled:opacity-50"
        >
          <Check className="h-3 w-3" />
          {isPending ? "Proses..." : "Selesai & Lunas"}
        </button>
      )}

      {/* Jika customer bayar via QRIS dan butuh konfirmasi */}
      {paymentStatus === "WAITING_CONFIRMATION" && status !== "COMPLETED" && (
        <div className="flex flex-col gap-2 w-full lg:w-auto lg:items-end mt-2 lg:mt-0 pt-2 lg:pt-0 border-t border-neutral-light/30 lg:border-none">
          {paymentProofUrl && (
            <a
              href={paymentProofUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-primary px-3 py-2 lg:py-1.5 rounded-md text-xs font-medium transition border border-neutral-light/50 w-full lg:w-auto"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Lihat Bukti Bayar
            </a>
          )}
          <button
            disabled={isPending}
            onClick={() => handleAction(status, "PAID", "Yakin uang sudah masuk?")}
            className="w-full lg:w-auto flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 px-3 py-2 lg:py-1.5 rounded-md text-xs font-bold disabled:opacity-50"
          >
            {isPending ? "Proses..." : "Konfirmasi Pembayaran"}
          </button>
        </div>
      )}
    </div>
  );
}
