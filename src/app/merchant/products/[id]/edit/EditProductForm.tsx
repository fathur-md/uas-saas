"use client";

import { useActionState } from "react";
import { updateProduct } from "@/app/actions/product";
import { Save } from "lucide-react";

export default function EditProductForm({ product }: { product: any }) {
  const [state, action, isPending] = useActionState(updateProduct, null);

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="productId" value={product.id} />

      {state?.error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
          {state.error}
        </div>
      )}

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
            defaultValue={product.name}
            className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
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
            defaultValue={product.category}
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
            defaultValue={product.price}
            className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
          />
        </div>

        <div>
          <label htmlFor="isAvailable" className="block text-sm font-medium text-primary">
            Status
          </label>
          <select
            name="isAvailable"
            id="isAvailable"
            defaultValue={product.isAvailable ? "true" : "false"}
            className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
          >
            <option value="true">Tersedia</option>
            <option value="false">Kosong / Tidak Tersedia</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-primary">
          Gambar Produk (Kosongkan jika tidak diubah)
        </label>
        {product.imageUrl && (
          <div className="mt-2 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.imageUrl} alt={product.name} className="h-24 object-contain border rounded" />
          </div>
        )}
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          className="mt-1 block w-full text-sm text-neutral-dark file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-light/30 file:text-primary hover:file:bg-neutral-light/50"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-primary">
          Deskripsi (Opsional)
        </label>
        <textarea
          name="description"
          id="description"
          rows={2}
          defaultValue={product.description || ""}
          className="mt-1 block w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border bg-background text-foreground"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <a
          href="/merchant/products"
          className="inline-flex items-center justify-center rounded-md border border-neutral-light px-6 py-2.5 text-sm font-semibold text-primary hover:bg-neutral-light/30 transition"
        >
          Batal
        </a>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 justify-center rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 transition"
        >
          <Save className="h-4 w-4" />
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
