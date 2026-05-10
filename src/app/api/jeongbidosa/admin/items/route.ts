/**
 * /api/jeongbidosa/admin/items
 *
 * GET  : 전체 지식베이스 row 목록 (embedding 제외)
 * POST : 새 row 추가 + 임베딩 자동 생성
 *
 * 모든 메서드는 어드민 쿠키 검증을 통과해야 합니다.
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/jeongbidosa/adminAuth';
import { getEmbedding } from '@/lib/jeongbidosa/openai';
import { getJeongbidosaServerClient } from '@/lib/jeongbidosa/supabaseServer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
// 임베딩 호출이 포함되므로 시간 여유 확보 (Vercel 무료 플랜 한도 60초)
export const maxDuration = 30;

/** 입력 텍스트 4개를 합쳐 임베딩 생성 (ingest 라우트와 동일 규칙) */
async function buildEmbedding(
  term: string,
  description: string,
  role: string | null,
  details: string | null,
): Promise<number[]> {
  const text = [term, description, role ?? '', details ?? '']
    .filter((s) => s && s.trim())
    .join('\n');
  return getEmbedding(text);
}

// ---------- GET: 목록 조회 ----------
export async function GET(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getJeongbidosaServerClient();
  // embedding 컬럼은 1536차원이라 페이로드가 커지므로 제외하고 가져옵니다.
  // 대신 has_embedding 정보만 필요한 경우에는 별도 처리 가능 (현재는 단순화).
  const { data, error } = await supabase
    .from('jeongbidosa_knowledge')
    .select('id, term, description, role, details, created_at')
    .order('id', { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: 'DB 조회 실패', detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ items: data ?? [] });
}

// ---------- POST: 단건 추가 ----------
export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: {
    term?: unknown;
    description?: unknown;
    role?: unknown;
    details?: unknown;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const term = typeof body.term === 'string' ? body.term.trim() : '';
  const description =
    typeof body.description === 'string' ? body.description.trim() : '';
  const role =
    typeof body.role === 'string' && body.role.trim() ? body.role.trim() : null;
  const details =
    typeof body.details === 'string' && body.details.trim()
      ? body.details.trim()
      : null;

  if (!term || !description) {
    return NextResponse.json(
      { error: 'term, description 은 필수입니다.' },
      { status: 400 },
    );
  }

  const supabase = getJeongbidosaServerClient();

  let embedding: number[];
  try {
    embedding = await buildEmbedding(term, description, role, details);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: '임베딩 생성 실패', detail: msg },
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from('jeongbidosa_knowledge')
    .insert({ term, description, role, details, embedding })
    .select('id, term, description, role, details, created_at')
    .single();

  if (error) {
    return NextResponse.json(
      { error: 'DB 저장 실패', detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ item: data });
}
