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
    return <span className="text-xs text-neutral-dark italic">Anda</span>;
  }

  return (
    <div className="flex gap-1 items-center">
      <Link href={`/admin/users/${userId}`} className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
        <ExternalLink className="h-3 w-3" />
        Detail
      </Link>
      
      {isDeleted ? (
        <button
          disabled={isPending}
          onClick={() => startTransition(() => restoreUser(userId))}
          className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          Pulihkan
        </button>
      ) : (
        <button
          disabled={isPending}
          onClick={() => {
            if (confirm("Yakin ingin menonaktifkan pengguna ini?")) {
              startTransition(() => deleteUser(userId));
            }
          }}
          className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Trash2 className="h-3 w-3" />
          Nonaktifkan
        </button>
      )}
    </div>
  );
}
