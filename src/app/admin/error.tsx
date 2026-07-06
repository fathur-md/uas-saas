"use client";

import { AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 bg-red-50/50 rounded-2xl border border-red-100 p-8 text-center max-w-md mx-auto mt-10 shadow-sm">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-2" />
      <h2 className="text-xl font-bold text-red-800">Terjadi Kesalahan Sistem</h2>
      <p className="text-red-600 text-sm mb-2">Maaf, kami tidak dapat memuat halaman ini. Silakan coba beberapa saat lagi.</p>
      <button
        onClick={reset}
        className="mt-2 rounded-lg bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700 transition shadow-sm"
      >
        Muat Ulang Halaman
      </button>
    </div>
  );
}
