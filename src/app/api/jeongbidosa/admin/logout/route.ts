/**
 * POST /api/jeongbidosa/admin/logout
 *
 * 어드민 세션 쿠키를 즉시 만료시킵니다.
 */

import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/jeongbidosa/adminAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return res;
}
