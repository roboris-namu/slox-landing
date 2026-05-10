/**
 * /jeongbidosa/admin
 *
 * 정비도사 지식베이스 관리 페이지 (김준수님 전용)
 *
 * 동작 흐름:
 *   - 진입 시 GET /api/jeongbidosa/admin/items 호출
 *     → 200: 정상 어드민 UI 표시
 *     → 401: 비밀번호 입력 폼 표시
 *
 * 기능:
 *   - 전체 데이터 목록 (검색 필터 포함)
 *   - 단건 추가 / 수정 / 삭제 (확인 다이얼로그)
 *   - 엑셀 일괄 업로드 (양식 다운로드 + 주의사항)
 *   - 전체 데이터 엑셀 다운로드
 *   - 로그아웃
 *
 * UI는 의도적으로 단순하게 — Tailwind 만 사용, 외부 모달 라이브러리 X.
 */

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as XLSX from 'xlsx';

// ----------------------------------------------------------------------------
// 타입
// ----------------------------------------------------------------------------

/** 서버에서 내려오는 아이템 형태 (embedding 제외) */
interface AdminItem {
  id: number;
  term: string;
  description: string;
  role: string | null;
  details: string | null;
  created_at?: string;
}

/** 추가/수정 폼에서 사용하는 입력 폼 타입 */
interface ItemFormState {
  term: string;
  description: string;
  role: string;
  details: string;
}

const EMPTY_FORM: ItemFormState = {
  term: '',
  description: '',
  role: '',
  details: '',
};

// ----------------------------------------------------------------------------
// 메인 페이지 컴포넌트
// ----------------------------------------------------------------------------

export default function JeongbidosaAdminPage() {
  // 인증 상태: 'checking' | 'unauth' | 'auth'
  const [authStatus, setAuthStatus] = useState<
    'checking' | 'unauth' | 'auth'
  >('checking');

  /** 진입 시 한 번만 인증 상태 점검 */
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/jeongbidosa/admin/items', {
        method: 'GET',
        cache: 'no-store',
      });
      if (res.status === 401) {
        setAuthStatus('unauth');
      } else if (res.ok) {
        setAuthStatus('auth');
      } else {
        // 그 외 에러는 일단 unauth로 처리 (사용자가 로그인 폼에서 재시도 가능)
        setAuthStatus('unauth');
      }
    } catch {
      setAuthStatus('unauth');
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (authStatus === 'checking') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">잠시만요...</p>
      </main>
    );
  }

  if (authStatus === 'unauth') {
    return <LoginForm onSuccess={() => setAuthStatus('auth')} />;
  }

  return <AdminDashboard onLogout={() => setAuthStatus('unauth')} />;
}

// ----------------------------------------------------------------------------
// 로그인 폼
// ----------------------------------------------------------------------------

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/jeongbidosa/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error ?? '로그인 실패');
        return;
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : '네트워크 오류');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🔧</span>
          <h1 className="text-xl font-bold text-gray-900">정비도사 어드민</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          김준수님 전용입니다. 비밀번호를 입력해주세요.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="비밀번호"
          autoFocus
        />
        {error && (
          <p className="text-sm text-red-600 mt-3">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full mt-5 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400"
        >
          {loading ? '확인 중...' : '들어가기'}
        </button>
      </form>
    </main>
  );
}

// ----------------------------------------------------------------------------
// 어드민 대시보드 (로그인 후)
// ----------------------------------------------------------------------------

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [globalError, setGlobalError] = useState<string | null>(null);

  // 모달 상태들
  const [editingItem, setEditingItem] = useState<AdminItem | null>(null); // 수정 대상
  const [showCreate, setShowCreate] = useState(false); // 새 항목 추가 모달
  const [showBulk, setShowBulk] = useState(false); // 일괄 업로드 모달

  // 데이터 로드
  const loadItems = useCallback(async () => {
    setLoading(true);
    setGlobalError(null);
    try {
      const res = await fetch('/api/jeongbidosa/admin/items', {
        cache: 'no-store',
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setGlobalError(j.error ?? `목록 조회 실패 (${res.status})`);
        return;
      }
      const j = (await res.json()) as { items: AdminItem[] };
      setItems(j.items ?? []);
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : '네트워크 오류');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // 검색 필터링 (term + description + role + details 전체에서 부분 일치)
  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => {
      const haystack = [it.term, it.description, it.role ?? '', it.details ?? '']
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, search]);

  // 삭제 처리
  const handleDelete = async (item: AdminItem) => {
    if (
      !confirm(
        `정말 삭제하시겠어요?\n\n[${item.term}]\n\n이 작업은 되돌릴 수 없습니다.`,
      )
    ) {
      return;
    }
    try {
      const res = await fetch(`/api/jeongbidosa/admin/items/${item.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        alert(`삭제 실패: ${j.error ?? res.status}`);
        return;
      }
      // 낙관적 업데이트보다는 서버 진실 기준 — 로컬에서 빼기만 함.
      setItems((prev) => prev.filter((x) => x.id !== item.id));
    } catch (err) {
      alert(`삭제 실패: ${err instanceof Error ? err.message : err}`);
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    try {
      await fetch('/api/jeongbidosa/admin/logout', { method: 'POST' });
    } finally {
      onLogout();
    }
  };

  // 엑셀 다운로드
  const handleDownloadExcel = () => {
    // 같은 탭에서 location 이동시키면 다운로드 헤더로 인해 자동 저장됩니다.
    window.location.href = '/api/jeongbidosa/admin/export';
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 mr-auto">
            <span className="text-xl">🔧</span>
            <h1 className="font-bold text-gray-900">정비도사 어드민</h1>
            <span className="text-sm text-gray-500 ml-2">
              ({items.length}건)
            </span>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700"
          >
            + 새 항목
          </button>
          <button
            onClick={() => setShowBulk(true)}
            className="px-3 py-2 bg-emerald-600 text-white text-sm rounded-lg font-medium hover:bg-emerald-700"
          >
            엑셀 업로드
          </button>
          <button
            onClick={handleDownloadExcel}
            className="px-3 py-2 bg-gray-700 text-white text-sm rounded-lg font-medium hover:bg-gray-800"
          >
            엑셀 다운로드
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-white text-gray-700 text-sm rounded-lg font-medium border border-gray-300 hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* 본문 */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        {/* 검색바 */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색 (제목·설명·원인·점검절차 어디든 매칭)"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {globalError && (
          <p className="text-sm text-red-600 mb-4">⚠️ {globalError}</p>
        )}

        {loading ? (
          <p className="text-gray-500 text-center py-12">불러오는 중...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            {search ? '검색 결과가 없습니다.' : '데이터가 없습니다.'}
          </p>
        ) : (
          <ul className="space-y-3">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400">
                        #{item.id}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-base">
                        {item.term}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      {item.description}
                    </p>
                    {item.role && (
                      <p className="text-xs text-gray-500 mb-1">
                        <span className="font-semibold">원인 </span>
                        {item.role}
                      </p>
                    )}
                    {item.details && (
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold">점검절차 </span>
                        {item.details}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="px-2.5 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                    >
                      ✕ 삭제
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 모달들 */}
      {showCreate && (
        <ItemFormModal
          title="새 항목 추가"
          initial={EMPTY_FORM}
          onClose={() => setShowCreate(false)}
          onSave={async (form) => {
            const res = await fetch('/api/jeongbidosa/admin/items', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form),
            });
            if (!res.ok) {
              const j = (await res.json().catch(() => ({}))) as {
                error?: string;
              };
              throw new Error(j.error ?? `저장 실패 (${res.status})`);
            }
            const j = (await res.json()) as { item: AdminItem };
            setItems((prev) => [...prev, j.item]);
            setShowCreate(false);
          }}
        />
      )}

      {editingItem && (
        <ItemFormModal
          title={`수정 — #${editingItem.id} ${editingItem.term}`}
          initial={{
            term: editingItem.term,
            description: editingItem.description,
            role: editingItem.role ?? '',
            details: editingItem.details ?? '',
          }}
          onClose={() => setEditingItem(null)}
          onSave={async (form) => {
            const res = await fetch(
              `/api/jeongbidosa/admin/items/${editingItem.id}`,
              {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
              },
            );
            if (!res.ok) {
              const j = (await res.json().catch(() => ({}))) as {
                error?: string;
              };
              throw new Error(j.error ?? `수정 실패 (${res.status})`);
            }
            const j = (await res.json()) as { item: AdminItem };
            setItems((prev) =>
              prev.map((x) => (x.id === editingItem.id ? j.item : x)),
            );
            setEditingItem(null);
          }}
        />
      )}

      {showBulk && (
        <BulkUploadModal
          onClose={() => setShowBulk(false)}
          onCompleted={() => {
            setShowBulk(false);
            loadItems();
          }}
        />
      )}
    </main>
  );
}

// ----------------------------------------------------------------------------
// 추가/수정 공용 모달
// ----------------------------------------------------------------------------

function ItemFormModal({
  title,
  initial,
  onClose,
  onSave,
}: {
  title: string;
  initial: ItemFormState;
  onClose: () => void;
  onSave: (form: ItemFormState) => Promise<void>;
}) {
  const [form, setForm] = useState<ItemFormState>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.term.trim() || !form.description.trim()) {
      setError('제목(term)과 설명(description)은 필수입니다.');
      return;
    }
    setSaving(true);
    try {
      await onSave({
        term: form.term.trim(),
        description: form.description.trim(),
        role: form.role.trim(),
        details: form.details.trim(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장 실패');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FieldLabel label="제목 (term) *">
          <input
            type="text"
            value={form.term}
            onChange={(e) => setForm({ ...form, term: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="예: 타이밍 체인 늘어짐"
            maxLength={120}
          />
        </FieldLabel>
        <FieldLabel label="증상 설명 (description) *">
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="2~3문장으로 증상을 설명해주세요"
          />
        </FieldLabel>
        <FieldLabel label="원인 (role) - 선택">
          <textarea
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="왜 이런 증상이 생기는지"
          />
        </FieldLabel>
        <FieldLabel label="점검 절차 (details) - 선택">
          <textarea
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="① ... ② ... ③ ..."
          />
        </FieldLabel>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? '저장 중... (임베딩 생성)' : '저장'}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function FieldLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

// ----------------------------------------------------------------------------
// 일괄 업로드 모달 (엑셀)
// ----------------------------------------------------------------------------

interface ParsedRow {
  term: string;
  description: string;
  role: string;
  details: string;
}

function BulkUploadModal({
  onClose,
  onCompleted,
}: {
  onClose: () => void;
  onCompleted: () => void;
}) {
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    inserted: number;
    skipped: number;
    failures: Array<{ index: number; reason: string }>;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 양식 다운로드: 헤더만 있는 빈 엑셀 (서버 export와 같은 헤더)
  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([], {
      header: ['term', 'description', 'role', 'details'],
    });
    ws['!cols'] = [
      { wch: 30 },
      { wch: 60 },
      { wch: 50 },
      { wch: 80 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'jeongbidosa');
    XLSX.writeFile(wb, 'jeongbidosa_template.xlsx');
  };

  // 파일 선택 → 클라이언트에서 xlsx 파싱
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setParseError(null);
    setResult(null);
    setParsedRows([]);
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: 'array' });
      const firstSheetName = wb.SheetNames[0];
      if (!firstSheetName) {
        setParseError('시트가 비어 있습니다.');
        return;
      }
      const ws = wb.Sheets[firstSheetName];
      // header: 1 → 첫 행을 header로 인식하지 않고 배열로 받음
      // raw: false → 모든 셀을 문자열로 강제 (숫자 인덱스 등 오인 방지)
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
        defval: '',
      });

      // 컬럼 검증: term, description 둘 다 있어야 함
      const validated: ParsedRow[] = [];
      const reasons: string[] = [];
      rows.forEach((r, idx) => {
        const term = String(r.term ?? '').trim();
        const description = String(r.description ?? '').trim();
        const role = String(r.role ?? '').trim();
        const details = String(r.details ?? '').trim();
        if (!term || !description) {
          reasons.push(
            `행 ${idx + 2}: term 또는 description 이 비어 있습니다.`,
          );
          return;
        }
        validated.push({ term, description, role, details });
      });

      if (validated.length === 0) {
        setParseError(
          (reasons[0] ?? '유효한 행이 없습니다.') +
            (reasons.length > 1 ? ` (외 ${reasons.length - 1}건)` : ''),
        );
        return;
      }
      if (validated.length > 100) {
        setParseError(
          `한 번에 최대 100건까지 업로드 가능합니다. (현재: ${validated.length}건)`,
        );
        return;
      }
      setParsedRows(validated);
      if (reasons.length > 0) {
        setParseError(
          `유효하지 않은 ${reasons.length}건 자동 제외 — 첫 사례: ${reasons[0]}`,
        );
      }
    } catch (err) {
      setParseError(
        err instanceof Error ? `파싱 실패: ${err.message}` : '파싱 실패',
      );
    }
  };

  // 서버로 업로드
  const handleUpload = async () => {
    setUploading(true);
    setResult(null);
    try {
      const res = await fetch('/api/jeongbidosa/admin/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: parsedRows }),
      });
      const j = (await res.json()) as {
        success?: boolean;
        inserted?: number;
        skipped?: number;
        failures?: Array<{ index: number; reason: string }>;
        error?: string;
      };
      if (!res.ok) {
        setParseError(j.error ?? `업로드 실패 (${res.status})`);
        return;
      }
      setResult({
        inserted: j.inserted ?? 0,
        skipped: j.skipped ?? 0,
        failures: j.failures ?? [],
      });
    } catch (err) {
      setParseError(err instanceof Error ? err.message : '업로드 실패');
    } finally {
      setUploading(false);
    }
  };

  return (
    <ModalShell onClose={onClose} title="엑셀 일괄 업로드">
      {/* 주의사항 */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900 mb-4 space-y-1">
        <p className="font-semibold mb-1">⚠ 업로드 전 확인</p>
        <ul className="list-disc list-inside space-y-0.5 text-amber-800">
          <li>
            첫 행은 반드시 헤더:{' '}
            <code className="bg-amber-100 px-1 rounded">
              term, description, role, details
            </code>{' '}
            (소문자, 영문)
          </li>
          <li>term, description 은 필수 (비어 있으면 자동 제외)</li>
          <li>role, details 는 선택 — 비워 두어도 됩니다</li>
          <li>한 번에 최대 100건까지 업로드 가능합니다</li>
          <li>중복 검사를 하지 않으니, 같은 term 을 2번 올리면 2건이 들어갑니다</li>
          <li>업로드 후 임베딩 자동 생성 — 30~50초 정도 걸립니다</li>
        </ul>
      </div>

      {/* 양식 다운로드 */}
      <div className="mb-4">
        <button
          onClick={handleDownloadTemplate}
          type="button"
          className="px-3 py-2 bg-white border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
        >
          📄 빈 양식 엑셀 받기
        </button>
        <span className="text-xs text-gray-500 ml-2">
          (현재 데이터로 시작하려면 메인 화면의 [엑셀 다운로드] 사용)
        </span>
      </div>

      {/* 파일 선택 */}
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>

      {parseError && (
        <p className="text-sm text-red-600 mb-3">{parseError}</p>
      )}

      {parsedRows.length > 0 && !result && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900 mb-4">
          <p className="font-semibold mb-1">
            업로드 준비 완료: {parsedRows.length}건
          </p>
          <p className="text-xs text-blue-800">
            첫 항목: <code>{parsedRows[0]?.term}</code>
          </p>
        </div>
      )}

      {result && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-900 mb-4">
          <p className="font-semibold">업로드 완료</p>
          <p className="text-xs">
            추가됨: {result.inserted} / 건너뜀: {result.skipped} / 실패:{' '}
            {result.failures.length}
          </p>
          {result.failures.length > 0 && (
            <ul className="text-xs mt-1 list-disc list-inside text-red-700">
              {result.failures.slice(0, 3).map((f) => (
                <li key={f.index}>
                  행 {f.index + 2}: {f.reason}
                </li>
              ))}
              {result.failures.length > 3 && (
                <li>...외 {result.failures.length - 3}건</li>
              )}
            </ul>
          )}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
        >
          닫기
        </button>
        {!result ? (
          <button
            onClick={handleUpload}
            type="button"
            disabled={uploading || parsedRows.length === 0}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:bg-gray-400"
          >
            {uploading
              ? `업로드 중... (${parsedRows.length}건 임베딩 생성)`
              : `${parsedRows.length}건 업로드`}
          </button>
        ) : (
          <button
            onClick={onCompleted}
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            확인 (목록 새로고침)
          </button>
        )}
      </div>
    </ModalShell>
  );
}

// ----------------------------------------------------------------------------
// 모달 셸 (공용)
// ----------------------------------------------------------------------------

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  // ESC 키로 닫기 + 바디 스크롤 잠금
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900 truncate pr-4">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
