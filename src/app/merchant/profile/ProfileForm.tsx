"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import { updateMerchantProfile } from "@/app/actions/profile";
import { Save, Store, Camera, X } from "lucide-react";

export default function MerchantProfileForm({ merchant }: { merchant: any }) {
  const [state, action, isPending] = useActionState(updateMerchantProfile, null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const originalName = merchant?.user?.name || "";
  const originalPhone = merchant?.user?.phoneNumber || "";
  const originalStoreName = merchant?.storeName || "";
  const originalArea = merchant?.area || "";
  const originalAddress = merchant?.address || "";
  const originalDeliveryFee = merchant?.deliveryFee || 0;
  const originalDescription = merchant?.description || "";
  const originalIsOpen = merchant?.isOpen ?? false;

  const [isOpen, setIsOpen] = useState(originalIsOpen);
  const [name, setName] = useState(originalName);
  const [phoneNumber, setPhoneNumber] = useState(originalPhone);
  const [storeName, setStoreName] = useState(originalStoreName);
  const [area, setArea] = useState(originalArea);
  const [address, setAddress] = useState(originalAddress);
  const [deliveryFee, setDeliveryFee] = useState(originalDeliveryFee);
  const [description, setDescription] = useState(originalDescription);
  const [qrisImageChanged, setQrisImageChanged] = useState(false);

  useEffect(() => {
    if (state?.success) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQrisImageChanged(false);
      // Wait for revalidatePath to send new props
    }
  }, [state]);

  const hasChanges = 
    isOpen !== originalIsOpen ||
    name !== originalName ||
    phoneNumber !== originalPhone ||
    storeName !== originalStoreName ||
    area !== originalArea ||
    address !== originalAddress ||
    Number(deliveryFee) !== Number(originalDeliveryFee) ||
    description !== originalDescription ||
    qrisImageChanged;

  const handleCancel = () => {
    setIsOpen(originalIsOpen);
    setName(originalName);
    setPhoneNumber(originalPhone);
    setStoreName(originalStoreName);
    setArea(originalArea);
    setAddress(originalAddress);
    setDeliveryFee(originalDeliveryFee);
    setDescription(originalDescription);
    setQrisImageChanged(false);
    if (formRef.current) formRef.current.reset();
  };

  return (
    <form ref={formRef} action={action} className="space-y-8">
      {state?.error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          {state.error}
        </div>
      )}
      
      {state?.success && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-700 border border-green-200">
          {state.message}
        </div>
      )}

      {/* Toggle Buka / Tutup Toko */}
      <div className="flex items-center justify-between p-4 bg-neutral-light/30 rounded-lg border border-neutral-light">
        <div>
          <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
            <Store className="h-4 w-4" /> Status Toko
          </h3>
          <p className="text-xs text-neutral-dark mt-1">
            Matikan status ini jika Anda sedang tutup atau kehabisan stok agar pelanggan tidak bisa memesan.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            name="isOpen"
            value="true"
            className="sr-only peer" 
            checked={isOpen}
            onChange={(e) => setIsOpen(e.target.checked)}
          />
          <div className="w-11 h-6 bg-neutral-light peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
          <span className="ml-3 text-sm font-medium text-primary">
            {isOpen ? 'BUKA' : 'TUTUP'}
          </span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-primary border-b border-neutral-light pb-2">Data Pemilik</h3>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Nama Lengkap Pemilik
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Nomor WhatsApp / HP
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-primary border-b border-neutral-light pb-2">Informasi Toko</h3>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Nama Toko
            </label>
            <input
              type="text"
              name="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
              className="block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Kecamatan / Area (ex: Kemang, Tebet)
            </label>
            <input
              type="text"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
              className="block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Alamat Lengkap Toko
            </label>
            <textarea
              name="address"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Biaya Ongkos Kirim (Rp)
            </label>
            <div className="flex items-center">
              <span className="text-neutral-dark mr-2">Rp</span>
              <input
                type="number"
                name="deliveryFee"
                min="0"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                required
                className="block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
              />
            </div>
            <p className="mt-1 text-xs text-neutral-dark">Isi 0 jika ongkir gratis.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              Deskripsi Singkat (Opsional)
            </label>
            <textarea
              name="description"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Buka 24 jam, melayani antar jemput laundry."
              className="block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
            />
          </div>

          <div className="pt-4 border-t border-neutral-light">
            <label className="block text-sm font-medium text-primary mb-2">
              Gambar Kode QRIS (Opsional)
            </label>
            
            {merchant.qrisImageUrl && (
              <div className="mb-4">
                <p className="text-xs text-neutral-dark mb-2">QRIS Saat ini:</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={merchant.qrisImageUrl} alt="QRIS Toko" className="h-32 object-contain border rounded p-1 bg-white" />
              </div>
            )}
            
            <div className="flex items-center">
              <label className="flex items-center justify-center px-4 py-2 bg-background border border-neutral-light rounded-md shadow-sm text-sm font-medium text-primary cursor-pointer hover:bg-neutral-light/30 transition">
                <Camera className="mr-2 h-4 w-4" />
                <span>Upload QRIS Baru</span>
                <input
                  type="file"
                  name="qrisImage"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 5 * 1024 * 1024) {
                      alert("Ukuran gambar maksimal 5MB");
                      e.target.value = "";
                      return;
                    }
                    setQrisImageChanged(!!e.target.files?.length);
                  }}
                />
              </label>
            </div>
            <p className="mt-2 text-xs text-neutral-dark">
              Format didukung: JPG, PNG, WEBP. Mengunggah gambar baru akan menimpa gambar lama.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4 mt-6 border-t border-neutral-light">
        {hasChanges && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="inline-flex items-center gap-2 justify-center rounded-md border border-neutral-light px-8 py-3 text-sm font-semibold text-primary hover:bg-neutral-light/30 transition-all duration-300 w-full md:w-auto animate-in fade-in slide-in-from-right-4"
          >
            <X className="h-4 w-4" />
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={!hasChanges || isPending}
          className="inline-flex items-center gap-2 justify-center rounded-md bg-accent px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 w-full md:w-auto"
        >
          <Save className={`h-5 w-5 ${isPending ? 'animate-pulse' : ''}`} />
          {isPending ? "Menyimpan Perubahan..." : "Simpan Pengaturan Toko"}
        </button>
      </div>
    </form>
  );
}
