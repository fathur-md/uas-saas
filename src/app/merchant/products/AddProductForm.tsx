"use client";

import { useActionState, useRef, useEffect } from "react";
import { addProduct } from "@/app/actions/product";
import { Plus } from "lucide-react";

export default function AddProductForm() {
  const [state, action, isPending] = useActionState(addProduct, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <div className="bg-background border border-neutral-light rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-primary mb-4">
        Tambah Produk Baru
      </h2>

      {state?.error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
          {state.error}
        </div>
      )}
      
      {state?.success && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
          Produk berhasil ditambahkan!
        </div>
      )}

      <form ref={formRef} action={action} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Contoh: Galon Aqua 19L"
              className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground placeholder-neutral-dark"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-primary">
              Kategori
            </label>
            <select
              name="category"
              id="category"
              required
              className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
            >
              <option value="GALON">Galon Air</option>
              <option value="GAS">Gas LPG</option>
              <option value="LAUNDRY">Layanan Laundry</option>
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-primary">
              Harga (Rp)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              min="0"
              required
              placeholder="20000"
              className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground placeholder-neutral-dark"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-primary">
              Gambar Produk (Opsional)
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size > 5 * 1024 * 1024) {
                  alert("Ukuran gambar maksimal 5MB");
                  e.target.value = "";
                }
              }}
              className="mt-1 block w-full text-sm text-neutral-dark file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-light/30 file:text-primary hover:file:bg-neutral-light/50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-primary">
            Deskripsi Singkat (Opsional)
          </label>
          <textarea
            name="description"
            id="description"
            rows={2}
            className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground placeholder-neutral-dark"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            {isPending ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
