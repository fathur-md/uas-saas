import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;
      
      const isAuthPage = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register');
      
      const isOnCustomer = nextUrl.pathname.startsWith('/customer');
      const isOnMerchant = nextUrl.pathname.startsWith('/merchant');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      // 1. Jika user sudah login dan mencoba ke halaman login/register
      if (isAuthPage) {
        if (isLoggedIn) {
          if (role === 'CUSTOMER') return Response.redirect(new URL('/customer/home', nextUrl));
          if (role === 'MERCHANT') return Response.redirect(new URL('/merchant/dashboard', nextUrl));
          if (role === 'ADMIN') return Response.redirect(new URL('/admin/dashboard', nextUrl));
          return Response.redirect(new URL('/', nextUrl));
        }
        return true;
      }

      // 2. Proteksi rute Customer
      if (isOnCustomer) {
        if (!isLoggedIn) return false; // Melempar ke halaman login
        if (role !== 'CUSTOMER') return Response.redirect(new URL('/', nextUrl)); // Salah role
        return true;
      }

      // 3. Proteksi rute Merchant
      if (isOnMerchant) {
        if (!isLoggedIn) return false;
        if (role !== 'MERCHANT') return Response.redirect(new URL('/', nextUrl));
        return true;
      }

      // 4. Proteksi rute Admin
      if (isOnAdmin) {
        if (!isLoggedIn) return false;
        if (role !== 'ADMIN') return Response.redirect(new URL('/', nextUrl));
        return true;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  providers: [], // Diisi di auth.ts karena database adapter tidak bisa berjalan di Edge middleware
} satisfies NextAuthConfig;
