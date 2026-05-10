/**
 * GET /api/jeongbidosa/admin/export
 *
 * 현재 지식베이스 전체를 xlsx 파일로 내보냅니다.
 * 헤더: term | description | role | details
 * (id, embedding 은 제외 — 다시 import할 수 있는 형태로 유지)
 */

import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { isAdminAuthorized } from '@/lib/jeongbidosa/adminAuth';
import { getJeongbidosaServerClient } from '@/lib/jeongbidosa/supabaseServer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getJeongbidosaServerClient();
  const { data, error } = await supabase
    .from('jeongbidosa_knowledge')
    .select('term, description, role, details')
    .order('id', { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: 'DB 조회 실패', detail: error.message },
      { status: 500 },
    );
  }

  // 빈 DB여도 헤더만 있는 빈 시트 반환 (사용자가 양식 확인 가능)
  const rows = (data ?? []).map((r) => ({
    term: r.term ?? '',
    description: r.description ?? '',
    role: r.role ?? '',
    details: r.details ?? '',
  }));

  const ws = XLSX.utils.json_to_sheet(rows, {
    header: ['term', 'description', 'role', 'details'],
  });
  // 컬럼 너비를 적절히 지정해 가독성 향상 (Excel 기본 글자 단위)
  ws['!cols'] = [
    { wch: 30 }, // term
    { wch: 60 }, // description
    { wch: 50 }, // role
    { wch: 80 }, // details
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'jeongbidosa');

  // Node Buffer 로 받은 뒤 Uint8Array 로 변환 — NextResponse 타입에 맞춤.
  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
  const bytes = new Uint8Array(buffer);

  // YYYY-MM-DD 형태 날짜를 파일명에 포함해 백업본 구분이 쉽게.
  const today = new Date().toISOString().slice(0, 10);
  const filename = `jeongbidosa_knowledge_${today}.xlsx`;

  return new NextResponse(bytes, {
    status: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
