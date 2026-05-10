/**
 * POST /api/jeongbidosa/admin/login
 *
 * 정비도사 어드민 비밀번호를 검증하고 세션 쿠키를 발급합니다.
 *
 * 요청: { password: string }
 * 응답: { success: true } or 401
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_NAME,
  generateAdminToken,
  getAdminPassword,
} from '@/lib/jeongbidosa/adminAuth';

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

  // 비밀번호 비교 — 단일 어드민이라 단순 비교로 충분합니다.
  if (inputPassword !== getAdminPassword()) {
    return NextResponse.json(
      { error: '비밀번호가 올바르지 않습니다.' },
      { status: 401 },
    );
  }

  const token = generateAdminToken();
  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });

  return res;
}
