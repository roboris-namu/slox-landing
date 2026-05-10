/**
 * 정비도사 어드민 페이지 인증 헬퍼
 *
 * 동작 흐름:
 *   1) 사용자가 /jeongbidosa/admin 진입 → 비밀번호 입력 폼 표시
 *   2) POST /api/jeongbidosa/admin/login 으로 비밀번호 전송
 *   3) 정답이면 서버가 httpOnly 쿠키(`jeongbidosa_admin`) 발급
 *   4) 이후 모든 어드민 API에서 이 쿠키를 검증
 *
 * 쿠키 값에는 비밀번호 자체를 절대 저장하지 않습니다.
 * 대신 SHA-256(비밀번호 + 고정 솔트) 해시 값을 저장하여
 * 쿠키 탈취 시에도 비밀번호가 노출되지 않도록 합니다.
 */

import { createHash } from 'crypto';
import type { NextRequest } from 'next/server';

/** 어드민 쿠키 이름 */
export const ADMIN_COOKIE_NAME = 'jeongbidosa_admin';

/** 쿠키 만료 시간 (8시간) */
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8;

/**
 * 환경변수 또는 fallback 으로 비밀번호 가져오기.
 * 운영에서는 Vercel 환경변수 `JEONGBIDOSA_ADMIN_PASSWORD` 설정을 권장.
 */
export function getAdminPassword(): string {
  return (
    process.env.JEONGBIDOSA_ADMIN_PASSWORD?.trim() || 'jeongbidosa2026!'
  );
}

/**
 * 쿠키에 저장될 검증 토큰을 생성합니다.
 *
 * 비밀번호 자체를 쿠키에 넣으면 노출 위험이 있으므로,
 * 비밀번호 + 고정 솔트의 SHA-256 해시를 사용합니다.
 * 비밀번호가 바뀌면 토큰도 자동으로 무효가 됩니다.
 */
export function generateAdminToken(): string {
  const password = getAdminPassword();
  // 고정 솔트(코드에 하드코딩) — 비밀번호와 결합해 단순 해시 노출만으로는 무가치하게 만듭니다.
  const salt = 'slox::jeongbidosa::admin::v1';
  return createHash('sha256').update(`${salt}:${password}`).digest('hex');
}

/**
 * 요청에 담긴 어드민 쿠키가 유효한지 검증합니다.
 *
 * @param req Next.js 요청 객체 (Edge/Node 양쪽 호환)
 * @returns 인증 통과 시 true
 */
export function isAdminAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  // timing-safe 비교까지 갈 필요는 없는 단일 사용자/내부 도구.
  return token === generateAdminToken();
}
