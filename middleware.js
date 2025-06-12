import { auth } from './app/auth';

export default auth((req) => {
  // req.auth contains the session
  const isLoggedIn = !!req.auth?.user;
  const isOnAdmin = req.nextUrl.pathname.startsWith('/blog/admin');

  if (isOnAdmin && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 