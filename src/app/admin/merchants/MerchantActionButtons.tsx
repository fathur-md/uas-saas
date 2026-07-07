"use client";

import { approveMerchant, rejectMerchant } from "@/app/actions/admin";
import { Check, X } from "lucide-react";
import { useTransition } from "react";

export default function MerchantActionButtons({ merchantId }: { merchantId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    if (!confirm("Setujui merchant ini?")) return;
    startTransition(async () => {
      const res = await approveMerchant(merchantId);
      if (res?.error) alert(res.error);
    });
  };

  const handleReject = () => {
    if (!confirm("Tolak merchant ini?")) return;
    startTransition(async () => {
      const res = await rejectMerchant(merchantId);
      if (res?.error) alert(res.error);
    });
  };

  return (
    <div className="flex gap-2 w-full lg:w-auto">
      <button
        disabled={isPending}
        onClick={handleApprove}
        className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium shadow-sm transition-colors disabled:opacity-50"
      >
        <Check className="h-3.5 w-3.5" />
        Setujui
      </button>
      <button
        disabled={isPending}
        onClick={handleReject}
        className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-md text-xs font-medium transition-colors disabled:opacity-50"
      >
        <X className="h-3.5 w-3.5" />
        Tolak
      </button>
    </div>
  );
}
