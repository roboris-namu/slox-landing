/**
 * /api/jeongbidosa/admin/items/[id]
 *
 * PATCH  : 특정 row 수정 + 임베딩 재생성
 * DELETE : 특정 row 삭제
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthorized } from '@/lib/jeongbidosa/adminAuth';
import { getEmbedding } from '@/lib/jeongbidosa/openai';
import { getJeongbidosaServerClient } from '@/lib/jeongbidosa/supabaseServer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const maxDuration = 30;

type RouteContext = { params: { id: string } };

/** URL 의 [id] 파라미터를 안전하게 정수로 변환 */
function parseId(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

// ---------- PATCH: 수정 ----------
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = parseId(params.id);
  if (id === null) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
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

  // 4개 필드 중 하나라도 바뀌면 검색 정확도를 위해 임베딩 재생성.
  // 어떤 필드가 바뀌었는지 비교하기보다 매번 다시 만드는 편이 단순/안전합니다.
  let embedding: number[];
  try {
    const text = [term, description, role ?? '', details ?? '']
      .filter((s) => s && s.trim())
      .join('\n');
    embedding = await getEmbedding(text);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: '임베딩 생성 실패', detail: msg },
      { status: 500 },
    );
  }

  const supabase = getJeongbidosaServerClient();
  const { data, error } = await supabase
    .from('jeongbidosa_knowledge')
    .update({ term, description, role, details, embedding })
    .eq('id', id)
    .select('id, term, description, role, details, created_at')
    .single();

  if (error) {
    return NextResponse.json(
      { error: 'DB 수정 실패', detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ item: data });
}

// ---------- DELETE: 삭제 ----------
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = parseId(params.id);
  if (id === null) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const supabase = getJeongbidosaServerClient();
  const { error } = await supabase
    .from('jeongbidosa_knowledge')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json(
      { error: 'DB 삭제 실패', detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
