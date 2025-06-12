import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const AUTH_COOKIE = 'auth_token';
const TOKEN_VALUE = 'authenticated'; // In production, use a proper JWT

export async function signIn(credentials) {
  if (
    credentials?.username === process.env.ADMIN_USERNAME &&
    credentials?.password === process.env.ADMIN_PASSWORD
  ) {
    cookies().set(AUTH_COOKIE, TOKEN_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return true;
  }
  return false;
}

export async function auth() {
  const token = cookies().get(AUTH_COOKIE)?.value;
  return token === TOKEN_VALUE;
}

export async function signOut() {
  cookies().delete(AUTH_COOKIE);
  return NextResponse.redirect(new URL('/login', process.env.NEXTAUTH_URL));
} 