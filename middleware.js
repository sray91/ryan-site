import { NextResponse } from 'next/server';

export function middleware(request) {
  const authToken = request.cookies.get('auth_token')?.value;
  const isAuthenticated = authToken === 'authenticated';
  const isOnAdmin = request.nextUrl.pathname.startsWith('/blog/admin');

  if (isOnAdmin && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/admin/:path*'],
}; 