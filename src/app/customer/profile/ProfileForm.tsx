"use client";

import { useActionState, useState, useEffect } from "react";
import { updateCustomerProfile } from "@/app/actions/profile";
import { Save, Mail, User, Phone, MapPin, CheckCircle2, AlertCircle, X } from "lucide-react";

export default function CustomerProfileForm({ user }: { user: any }) {
  const [state, action, isPending] = useActionState(updateCustomerProfile, null);
  
  // Local state for tracking changes
  const [name, setName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");

  // Update local state if user prop changes or after successful save
  useEffect(() => {
    if (state?.success) {
      // In a real app we might get the updated user back from the action, 
      // but since we revalidatePath, the component will re-render with new user props.
    }
  }, [state]);

  const originalName = user?.name || "";
  const originalPhone = user?.phoneNumber || "";
  const originalAddress = user?.address || "";

  const hasChanges = name !== originalName || phoneNumber !== originalPhone || address !== originalAddress;

  const handleCancel = () => {
    setName(originalName);
    setPhoneNumber(originalPhone);
    setAddress(originalAddress);
  };

  return (
    <form action={action} className="space-y-6">
      {state?.error && (
        <div className="flex items-center gap-3 rounded-2xl bg-rose-50/80 p-4 text-sm text-rose-700 border border-rose-100 shadow-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0" />
          <p className="font-medium">{state.error}</p>
        </div>
      )}
      
      {state?.success && (
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50/80 p-4 text-sm text-emerald-700 border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
          <p className="font-medium">{state.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1 group relative">
          <label className="block text-xs font-bold text-neutral-dark/70 uppercase tracking-wider ml-1">
            Alamat Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-neutral-dark/40" />
            </div>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="block w-full pl-12 pr-4 py-3.5 bg-neutral-100/50 border border-neutral-light/50 rounded-2xl text-neutral-dark/70 cursor-not-allowed md:text-sm font-medium"
            />
          </div>
          <p className="ml-1 mt-1 text-[10px] text-neutral-dark/50">Email terdaftar tidak dapat diubah.</p>
        </div>

        <div className="space-y-1 group relative">
          <label htmlFor="name" className="block text-xs font-bold text-primary uppercase tracking-wider ml-1 group-focus-within:text-accent transition-colors">
            Nama Lengkap
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-neutral-dark/40 group-focus-within:text-accent transition-colors" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full pl-12 pr-4 py-3.5 bg-white border border-neutral-light/50 rounded-2xl shadow-sm focus:border-accent focus:ring-4 focus:ring-accent/10 focus:bg-white text-primary md:text-sm font-semibold transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-1 group relative md:col-span-2">
          <label htmlFor="phoneNumber" className="block text-xs font-bold text-primary uppercase tracking-wider ml-1 group-focus-within:text-accent transition-colors">
            Nomor Telepon / WhatsApp
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-neutral-dark/40 group-focus-within:text-accent transition-colors" />
            </div>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="block w-full pl-12 pr-4 py-3.5 bg-white border border-neutral-light/50 rounded-2xl shadow-sm focus:border-accent focus:ring-4 focus:ring-accent/10 focus:bg-white text-primary md:text-sm font-semibold transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-1 group relative md:col-span-2">
          <label htmlFor="address" className="block text-xs font-bold text-primary uppercase tracking-wider ml-1 group-focus-within:text-accent transition-colors">
            Alamat Pengiriman Default
          </label>
          <div className="relative">
            <div className="absolute top-3.5 left-0 pl-4 pointer-events-none">
              <MapPin className="h-5 w-5 text-neutral-dark/40 group-focus-within:text-accent transition-colors" />
            </div>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="block w-full pl-12 pr-4 py-3.5 bg-white border border-neutral-light/50 rounded-2xl shadow-sm focus:border-accent focus:ring-4 focus:ring-accent/10 focus:bg-white text-primary md:text-sm font-semibold transition-all outline-none resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-6 border-t border-neutral-light/30 mt-8">
        {hasChanges && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="inline-flex items-center gap-2 justify-center rounded-2xl border border-neutral-light px-8 py-3.5 text-sm font-bold text-primary hover:bg-neutral-light/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 transition-all duration-300 w-full md:w-auto animate-in fade-in slide-in-from-right-4"
          >
            <X className="h-4 w-4" />
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={!hasChanges || isPending}
          className="relative group overflow-hidden inline-flex items-center gap-2 justify-center rounded-2xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none transition-all duration-300 w-full md:w-auto"
        >
          {!(!hasChanges || isPending) && (
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
          )}
          <Save className={`h-5 w-5 ${isPending ? 'animate-bounce' : ''}`} />
          {isPending ? "Menyimpan Data..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
