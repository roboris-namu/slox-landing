/**
 * POST /api/jeongbidosa/present/login
 *
 * 정비도사 프레젠테이션 페이지 비밀번호를 검증하고 세션 쿠키를 발급합니다.
 *
 * 요청: { password: string }
 * 응답: { success: true } | 401
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  PRESENT_COOKIE_MAX_AGE,
  PRESENT_COOKIE_NAME,
  generatePresentToken,
  getPresentPassword,
} from '@/lib/jeongbidosa/presentAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  let body: { password?: unknown } = {};
  try {
    body = (await req.json()) as { password?: unknown };
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const inputPassword =
    typeof body.password === 'string' ? body.password : '';

  if (inputPassword !== getPresentPassword()) {
    return NextResponse.json(
      { error: '비밀번호가 올바르지 않습니다.' },
      { status: 401 },
    );
  }

  const token = generatePresentToken();
  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: PRESENT_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: PRESENT_COOKIE_MAX_AGE,
  });

  return res;
}
