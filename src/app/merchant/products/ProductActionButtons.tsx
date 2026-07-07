"use client";

import { useTransition } from "react";
import { deleteProduct, toggleProductStatus } from "@/app/actions/product";
import Link from "next/link";

interface Props {
  productId: string;
  isAvailable: boolean;
  productName: string;
}

export default function ProductActionButtons({ productId, isAvailable, productName }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const res = await toggleProductStatus(productId, !isAvailable);
      if (res?.error) alert(res.error);
    });
  };

  const handleDelete = () => {
    if (!confirm(`Yakin ingin menghapus produk "${productName}" secara permanen?`)) return;
    startTransition(async () => {
      const res = await deleteProduct(productId);
      if (res?.error) alert(res.error);
    });
  };

  return (
    <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-light/50">
      <button
        type="button"
        disabled={isPending}
        onClick={handleToggle}
        className={`text-[11px] font-bold px-2 py-1 rounded border uppercase tracking-wider transition-colors disabled:opacity-50 ${
          isAvailable
            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
        }`}
      >
        {isPending ? "..." : (isAvailable ? "Tersedia" : "Kosong")}
      </button>

      <div className="flex items-center gap-3">
        <Link
          href={`/merchant/products/${productId}/edit`}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Edit
        </Link>

        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors disabled:opacity-50"
        >
          {isPending ? "Hapus..." : "Hapus"}
        </button>
      </div>
    </div>
  );
}
