/**
 * GET /api/jeongbidosa/present/check
 *
 * 현재 요청 쿠키가 유효한 발표 세션인지 확인합니다.
 * 클라이언트에서 첫 진입 시 인증 폼을 띄울지 결정하기 위해 사용합니다.
 */

import { NextRequest, NextResponse } from 'next/server';
import { isPresentAuthorized } from '@/lib/jeongbidosa/presentAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  return NextResponse.json({ authorized: isPresentAuthorized(req) });
}
