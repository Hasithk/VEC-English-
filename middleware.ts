import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { APP_ROLES } from '@/lib/roles';

const protectedApiPrefixes = [
  '/api/students',
  '/api/payments',
  '/api/dashboard',
  '/api/admin',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/auth') || pathname === '/login') {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const needsAuth =
    pathname === '/' ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/students') ||
    pathname.startsWith('/payments') ||
    pathname.startsWith('/communications') ||
    pathname.startsWith('/settings') ||
    protectedApiPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!needsAuth) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = token.role as string | undefined;

  if (pathname.startsWith('/settings')) {
    const allowed =
      userRole === APP_ROLES.SUPER_ADMIN || userRole === APP_ROLES.MAIN_ADMIN;

    if (!allowed) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
