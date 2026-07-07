import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Eksekusi middleware/proxy menggunakan Edge-compatible config
export default NextAuth(authConfig).auth;

export const config = {
  // Hanya jalankan proxy pada rute yang tidak termasuk dalam matcher berikut.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.webp$|.*\\.png$|.*\\.jpg$).*)'],
};
