"use client";

import { deleteUser, restoreUser } from "@/app/actions/admin";
import { Trash2, RotateCcw, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

interface UserActionsProps {
  userId: string;
  isDeleted: boolean;
  isSelf: boolean;
}

export default function UserActions({ userId, isDeleted, isSelf }: UserActionsProps) {
  const [isPending, startTransition] = useTransition();

  if (isSelf) {
    return <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 italic">Anda</span>;
  }

  const handleRestore = () => {
    startTransition(async () => {
      const res = await restoreUser(userId);
      if (res?.error) alert(res.error);
    });
  };

  const handleDelete = () => {
    if (!confirm("Yakin ingin menonaktifkan pengguna ini?")) return;
    startTransition(async () => {
      const res = await deleteUser(userId);
      if (res?.error) alert(res.error);
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <Link href={`/admin/users/${userId}`} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
        Detail
      </Link>
      
      {isDeleted ? (
        <button
          disabled={isPending}
          onClick={handleRestore}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.5} />
          Pulihkan
        </button>
      ) : (
        <button
          disabled={isPending}
          onClick={handleDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
          Nonaktif
        </button>
      )}
    </div>
  );
}
