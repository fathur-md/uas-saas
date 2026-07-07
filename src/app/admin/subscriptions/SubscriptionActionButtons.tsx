"use client";

import { useTransition } from "react";
import { approveSubscription, rejectSubscription } from "@/app/actions/admin";
import { Check, X } from "lucide-react";

export default function SubscriptionActionButtons({ requestId }: { requestId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    if (!confirm("Setujui langganan Pro untuk merchant ini?")) return;
    startTransition(async () => {
      const res = await approveSubscription(requestId);
      if (res.error) alert(res.error);
    });
  };

  const handleReject = () => {
    if (!confirm("Tolak permohonan langganan merchant ini?")) return;
    startTransition(async () => {
      const res = await rejectSubscription(requestId);
      if (res.error) alert(res.error);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleApprove}
        disabled={isPending}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
      >
        <Check className="w-3.5 h-3.5" />
        Terima
      </button>
      <button
        onClick={handleReject}
        disabled={isPending}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
      >
        <X className="w-3.5 h-3.5" />
        Tolak
      </button>
    </div>
  );
}
