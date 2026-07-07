"use client";

import { useState, useActionState } from "react";
import { createOrder } from "@/app/actions/order";
import { ShoppingCart, Check, CreditCard, Banknote, MapPin, StickyNote, X, AlertCircle } from "lucide-react";

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

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="group relative overflow-hidden w-full md:w-auto px-8 py-3.5 bg-accent text-white rounded-2xl font-bold shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
        <ShoppingCart className="h-5 w-5" />
        Pesan Sekarang
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] border border-neutral-light/50 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-neutral-light/30 p-5 flex justify-between items-center">
              <h4 className="font-extrabold text-primary flex items-center gap-2 leading-normal">
                <ShoppingCart className="h-5 w-5 text-accent" />
                Lengkapi Pesanan Anda
              </h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-dark rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-5 md:p-6">
              {state?.error && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl bg-rose-50/80 p-4 text-sm text-rose-700 border border-rose-100 shadow-sm animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0" />
                  <p className="font-medium">{state.error}</p>
                </div>
              )}

              <form action={action} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Kuantitas */}
                  <div className="bg-neutral-50/50 p-4 rounded-2xl border border-neutral-light/50">
                    <label className="block text-xs font-bold text-neutral-dark/70 uppercase tracking-wider mb-3">Jumlah Barang</label>
                    <div className="flex items-center justify-between bg-white p-1 rounded-xl border border-neutral-light/50 shadow-sm">
                      <button 
                        type="button" 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                        className="w-10 h-10 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-dark hover:text-primary flex items-center justify-center font-bold text-lg transition-colors"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        name="quantity" 
                        readOnly 
                        value={quantity} 
                        className="w-16 text-center font-bold text-lg text-primary border-none focus:ring-0 bg-transparent" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setQuantity(quantity + 1)} 
                        className="w-10 h-10 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent flex items-center justify-center font-bold text-lg transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Metode Pembayaran */}
                  <div className="bg-neutral-50/50 p-4 rounded-2xl border border-neutral-light/50">
                    <label className="block text-xs font-bold text-neutral-dark/70 uppercase tracking-wider mb-3">Metode Pembayaran</label>
                    <div className="flex flex-col gap-2">
                      <label className={`cursor-pointer border-2 rounded-xl p-3 flex items-center gap-3 transition-all ${paymentMethod === 'COD' ? 'border-accent bg-accent/5' : 'border-neutral-light/50 bg-white hover:border-neutral-light'}`}>
                        <input type="radio" name="paymentMethod" value="COD" className="hidden" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'COD' ? 'border-accent bg-accent' : 'border-neutral-light'}`}>
                          {paymentMethod === 'COD' && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <Banknote className={`w-5 h-5 ${paymentMethod === 'COD' ? 'text-accent' : 'text-neutral-dark/40'}`} />
                        <span className={`font-semibold text-sm ${paymentMethod === 'COD' ? 'text-primary' : 'text-neutral-dark'}`}>Bayar di Tempat (COD)</span>
                      </label>
                      
                      {merchant.qrisImageUrl && (
                        <label className={`cursor-pointer border-2 rounded-xl p-3 flex items-center gap-3 transition-all ${paymentMethod === 'QRIS' ? 'border-accent bg-accent/5' : 'border-neutral-light/50 bg-white hover:border-neutral-light'}`}>
                          <input type="radio" name="paymentMethod" value="QRIS" className="hidden" checked={paymentMethod === 'QRIS'} onChange={() => setPaymentMethod('QRIS')} />
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'QRIS' ? 'border-accent bg-accent' : 'border-neutral-light'}`}>
                            {paymentMethod === 'QRIS' && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <CreditCard className={`w-5 h-5 ${paymentMethod === 'QRIS' ? 'text-accent' : 'text-neutral-dark/40'}`} />
                          <span className={`font-semibold text-sm ${paymentMethod === 'QRIS' ? 'text-primary' : 'text-neutral-dark'}`}>Transfer QRIS</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1 group relative">
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider ml-1 group-focus-within:text-accent transition-colors">
                      Alamat Pengiriman
                    </label>
                    <div className="relative">
                      <div className="absolute top-3.5 left-0 pl-4 pointer-events-none">
                        <MapPin className="h-5 w-5 text-neutral-dark/40 group-focus-within:text-accent transition-colors" />
                      </div>
                      <textarea 
                        name="shippingAddress" 
                        required 
                        defaultValue={defaultAddress}
                        rows={2} 
                        className="block w-full pl-12 pr-4 py-3 bg-white border border-neutral-light/50 rounded-2xl shadow-sm focus:border-accent focus:ring-4 focus:ring-accent/10 focus:bg-white text-primary md:text-sm font-semibold transition-all outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 group relative">
                    <label className="block text-xs font-bold text-primary uppercase tracking-wider ml-1 group-focus-within:text-accent transition-colors">
                      Catatan (Opsional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <StickyNote className="h-5 w-5 text-neutral-dark/40 group-focus-within:text-accent transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        name="notes" 
                        placeholder="Cth: Titip di pos satpam, pagar warna hijau" 
                        className="block w-full pl-12 pr-4 py-3 bg-white border border-neutral-light/50 rounded-2xl shadow-sm focus:border-accent focus:ring-4 focus:ring-accent/10 focus:bg-white text-primary md:text-sm font-semibold transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Rincian Total */}
                <div className="bg-neutral-900 rounded-2xl p-5 md:p-6 text-white shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl rounded-full" />
                  
                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-white/60">Subtotal ({quantity} barang)</span>
                      <span className="font-semibold">Rp {subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-white/60">Ongkos Kirim</span>
                      <span className="font-semibold">Rp {merchant.deliveryFee.toLocaleString("id-ID")}</span>
                    </div>
                    
                    <div className="border-t border-white/20 pt-4 mt-4 flex justify-between items-center">
                      <span className="text-white/80 font-medium">Total Pembayaran</span>
                      <span className="text-2xl font-extrabold text-emerald-400">
                        Rp {total.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-col-reverse md:flex-row gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)}
                    className="w-full md:w-1/3 py-3.5 px-6 bg-neutral-100 hover:bg-neutral-200 text-neutral-dark font-bold rounded-2xl transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    disabled={isPending}
                    className="group relative overflow-hidden w-full md:w-2/3 py-3.5 px-6 bg-accent text-white rounded-2xl font-bold shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                    {isPending ? (
                      <>Memproses...</>
                    ) : (
                      <>
                        <Check className="h-5 w-5" /> Konfirmasi & Pesan
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
