import Link from "next/link";

export default function RegisterMerchantPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Daftar sebagai Mitra Merchant
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Bergabunglah dengan SiapSedia dan kembangkan bisnis Anda. (Mendapatkan 10 kuota pesanan gratis setiap bulan)
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl bg-white p-8 shadow rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-8" action="#" method="POST">
          
          {/* Akun Section */}
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Informasi Akun</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Digunakan untuk masuk ke dalam aplikasi.</p>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Nama Pemilik</label>
                <input id="name" name="name" type="text" required className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 px-3 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-gray-400" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Alamat Email</label>
                <input id="email" name="email" type="email" required className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 px-3 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-gray-400" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Nomor Handphone Pemilik</label>
                <input id="phone" name="phone" type="tel" required className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 px-3 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-gray-400" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Kata Sandi</label>
                <input id="password" name="password" type="password" required className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 px-3 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-gray-400" />
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Toko Section */}
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Profil Toko</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Informasi ini akan ditampilkan kepada calon pelanggan Anda.</p>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="storeName" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Nama Toko</label>
                <input id="storeName" name="storeName" type="text" required className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 px-3 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-gray-400" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="area" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Kecamatan / Area</label>
                <input id="area" name="area" type="text" placeholder="Misal: Kebayoran Baru" required className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 px-3 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-gray-400" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Alamat Lengkap Toko</label>
                <textarea id="address" name="address" rows={3} required className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 px-3 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-gray-400" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Deskripsi Singkat (Opsional)</label>
                <textarea id="description" name="description" rows={2} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 px-3 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600 dark:placeholder:text-gray-500 dark:focus:ring-gray-400" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus-visible:outline-gray-400"
            >
              Kirim Pendaftaran Merchant
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold leading-6 text-gray-900 hover:underline dark:text-gray-100">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
