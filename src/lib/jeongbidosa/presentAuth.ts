/**
 * 정비도사 프레젠테이션 페이지(/jeongbidosa/present) 인증 헬퍼
 *
 * 어드민 인증과 별도의 비밀번호/쿠키를 사용합니다.
 *  - 어드민: 데이터 편집 권한이 있는 내부 운영자용
 *  - 프레젠테이션: 발표·시연·외부 공유용 (좀 더 가볍게 공유하는 용도)
 *
 * 환경변수: JEONGBIDOSA_PRESENT_PASSWORD
 *   미설정 시 fallback: 'ajoujust2026'
 */

import { createHash } from 'crypto';
import type { NextRequest } from 'next/server';

/** 발표 페이지 세션 쿠키 이름 */
export const PRESENT_COOKIE_NAME = 'jeongbidosa_present';

/** 쿠키 만료 시간 (12시간) — 발표 당일 사용 */
export const PRESENT_COOKIE_MAX_AGE = 60 * 60 * 12;

/** 발표 페이지 비밀번호 */
export function getPresentPassword(): string {
  return (
    process.env.JEONGBIDOSA_PRESENT_PASSWORD?.trim() || 'ajoujust2026'
  );
}

/** 쿠키에 저장할 검증 토큰 (비밀번호 + 솔트의 SHA-256 해시) */
export function generatePresentToken(): string {
  const password = getPresentPassword();
  const salt = 'slox::jeongbidosa::present::v1';
  return createHash('sha256').update(`${salt}:${password}`).digest('hex');
}

/** 요청 쿠키가 유효한 발표 페이지 토큰인지 검증 */
export function isPresentAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get(PRESENT_COOKIE_NAME)?.value;
  if (!token) return false;
  return token === generatePresentToken();
}
