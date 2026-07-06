import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-light/20 bg-linear-to-t from-transparent to-background py-3">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-xs text-neutral-dark sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} SiapSedia. Hak cipta dilindungi.
        </p>
        <nav className="flex gap-4">
          <Link href="/" className="hover:text-accent transition-colors">
            Beranda
          </Link>
          <Link href="/login" className="hover:text-accent transition-colors">
            Masuk
          </Link>
          <Link
            href="/register"
            className="hover:text-accent transition-colors"
          >
            Daftar
          </Link>
        </nav>
      </div>
    </footer>
  );
}
