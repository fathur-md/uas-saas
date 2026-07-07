"use client";

import { useTransition } from "react";
import { cancelOrder } from "@/app/actions/order";
import { XCircle } from "lucide-react";

interface CustomerOrderActionButtonsProps {
  orderId: string;
}

export default function CustomerOrderActionButtons({ orderId }: CustomerOrderActionButtonsProps) {
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    if (!window.confirm("Yakin ingin membatalkan pesanan ini?")) return;

    startTransition(async () => {
      const res = await cancelOrder(orderId);
      if (res?.error) {
        alert("Gagal membatalkan pesanan: " + res.error);
      }
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleCancel}
      className="flex items-center gap-2 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200 px-6 py-3 rounded-xl transition-all shadow-sm disabled:opacity-50"
    >
      <XCircle className="h-4 w-4" />
      {isPending ? "Membatalkan..." : "Batalkan Pesanan"}
    </button>
  );
}
