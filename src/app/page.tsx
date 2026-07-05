import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
        SiapSedia
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
        Marketplace lokal untuk kebutuhan harian rumah tangga Anda. Pesan galon, gas, atau layanan laundry dari merchant terdekat.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/login"
          className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          Mulai Sekarang
        </Link>
      </div>
    </div>
  );
}
