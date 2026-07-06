"use client";

import { useState, useActionState } from "react";
import { createOrder } from "@/app/actions/order";
import { ShoppingCart } from "lucide-react";

export default function OrderForm({ 
  product, 
  merchant, 
  defaultAddress 
}: { 
  product: any, 
  merchant: any, 
  defaultAddress: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  
  // createOrder action dipanggil dengan bind product id dan merchant id agar lebih aman
  const createOrderWithIds = createOrder.bind(null, {
    productId: product.id,
    merchantId: merchant.id,
    price: product.price,
    shippingCost: merchant.deliveryFee,
  });
  
  const [state, action, isPending] = useActionState(createOrderWithIds, null);

  const subtotal = product.price * quantity;
  const total = subtotal + merchant.deliveryFee;

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto px-6 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-accent/90 transition flex items-center justify-center gap-2"
      >
        <ShoppingCart className="h-4 w-4" />
        Pesan Sekarang
      </button>
    );
  }

  return (
    <div className="mt-4 p-5 bg-neutral-light/30 rounded-xl border border-neutral-light">
      <h4 className="font-bold text-primary mb-4">Detail Pesanan</h4>
      
      {state?.error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
          {state.error}
        </div>
      )}

      <form action={action} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Jumlah</label>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-md bg-background border border-neutral-light flex items-center justify-center">-</button>
            <input type="number" name="quantity" readOnly value={quantity} className="w-16 text-center border-neutral-light rounded-md" />
            <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-md bg-background border border-neutral-light flex items-center justify-center">+</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Alamat Pengiriman</label>
          <textarea 
            name="shippingAddress" 
            required 
            defaultValue={defaultAddress}
            rows={2} 
            className="w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Catatan (Opsional)</label>
          <input 
            type="text" 
            name="notes" 
            placeholder="Cth: Titip di pos satpam" 
            className="w-full rounded-md border-neutral-light shadow-sm focus:border-accent focus:ring-accent sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">Metode Pembayaran</label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`cursor-pointer border rounded-lg p-3 text-center ${paymentMethod === 'COD' ? 'border-accent bg-neutral-light/30 text-primary font-medium' : 'border-neutral-light text-neutral-dark'}`}>
              <input type="radio" name="paymentMethod" value="COD" className="hidden" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
              Bayar di Tempat (COD)
            </label>
            {merchant.qrisImageUrl && (
              <label className={`cursor-pointer border rounded-lg p-3 text-center ${paymentMethod === 'QRIS' ? 'border-accent bg-neutral-light/30 text-primary font-medium' : 'border-neutral-light text-neutral-dark'}`}>
                <input type="radio" name="paymentMethod" value="QRIS" className="hidden" checked={paymentMethod === 'QRIS'} onChange={() => setPaymentMethod('QRIS')} />
                Transfer QRIS
              </label>
            )}
          </div>
        </div>

        <div className="border-t border-neutral-light pt-4 mt-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-dark">Subtotal ({quantity} barang)</span>
            <span className="text-primary font-medium">Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-neutral-dark">Ongkos Kirim</span>
            <span className="text-primary font-medium">Rp {merchant.deliveryFee.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span className="text-primary">Total Bayar</span>
            <span className="text-primary">Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button 
            type="button" 
            onClick={() => setIsOpen(false)}
            className="flex-1 py-2 px-4 border border-neutral-light text-primary rounded-lg font-medium hover:bg-neutral-light/30"
          >
            Batal
          </button>
          <button 
            type="submit" 
            disabled={isPending}
            className="flex-1 py-2 px-4 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50"
          >
            {isPending ? "Memproses..." : "Konfirmasi Pesanan"}
          </button>
        </div>
      </form>
    </div>
  );
}
