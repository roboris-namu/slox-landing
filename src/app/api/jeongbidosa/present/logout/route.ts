/**
 * POST /api/jeongbidosa/present/logout
 *
 * 발표 페이지 세션 쿠키를 만료시킵니다.
 */

import { NextResponse } from 'next/server';
import { PRESENT_COOKIE_NAME } from '@/lib/jeongbidosa/presentAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: PRESENT_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return res;
}
