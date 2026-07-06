"use client";

import { useActionState } from "react";
import { updateCustomerProfile } from "@/app/actions/profile";
import { Save } from "lucide-react";

export default function CustomerProfileForm({ user }: { user: any }) {
  const [state, action, isPending] = useActionState(updateCustomerProfile, null);

  return (
    <form action={action} className="space-y-6">
      {state?.error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
          {state.error}
        </div>
      )}
      
      {state?.success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
          {state.message}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-primary">
          Alamat Email
        </label>
        <input
          type="email"
          value={user.email}
          disabled
          className="mt-1 block w-full rounded-md bg-neutral-light/30 border-neutral-light text-neutral-dark cursor-not-allowed sm:text-sm px-3 py-2 border"
        />
        <p className="mt-1 text-xs text-neutral-dark">Email tidak dapat diubah.</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-primary">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user.name}
          required
          className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-primary">
          Nomor Telepon / WhatsApp
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          defaultValue={user.phoneNumber}
          required
          className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-primary">
          Alamat Lengkap
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          defaultValue={user.address}
          required
          className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 justify-center rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 transition"
        >
          <Save className="h-4 w-4" />
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
