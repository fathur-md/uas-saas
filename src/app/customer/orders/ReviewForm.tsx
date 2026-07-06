"use client";

import { useActionState, useState } from "react";
import { submitReview } from "@/app/actions/review";
import { Star } from "lucide-react";

export default function ReviewForm({ orderId, merchantId }: { orderId: string, merchantId: string }) {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const [state, action, isPending] = useActionState(submitReview, null);

  if (state?.success) {
    return (
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
        Terima kasih atas ulasan Anda! ⭐
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-neutral-light/30 rounded-lg border border-neutral-light">
      <h4 className="font-semibold text-primary mb-2 text-sm">Berikan Ulasan</h4>
      
      {state?.error && (
        <div className="mb-3 p-2 bg-red-50 text-red-600 text-xs rounded border border-red-200">
          {state.error}
        </div>
      )}

      <form action={action}>
        <input type="hidden" name="orderId" value={orderId} />
        <input type="hidden" name="merchantId" value={merchantId} />
        <input type="hidden" name="rating" value={rating} />
        
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star 
                className={`h-6 w-6 ${
                  (hoveredRating || rating) >= star 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-neutral-dark"
                } transition-colors`} 
              />
            </button>
          ))}
        </div>
        
        <textarea
          name="comment"
          placeholder="Bagaimana pelayanan merchant ini? (Opsional)"
          rows={2}
          className="w-full text-sm rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent px-3 py-2 border mb-3"
        ></textarea>
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-4 py-2 bg-accent text-white rounded-md font-medium text-xs hover:bg-accent/90 disabled:opacity-50"
        >
          {isPending ? "Mengirim..." : "Kirim Ulasan"}
        </button>
      </form>
    </div>
  );
}
