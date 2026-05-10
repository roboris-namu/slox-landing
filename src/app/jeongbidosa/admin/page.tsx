/**
 * /jeongbidosa/admin
 *
 * 정비도사 지식베이스 관리 페이지
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
 * 스타일: slox.co.kr 의 다크 톤(bg-dark-950 + premium-gradient)에 맞춤.
 */

'use client';

import Link from 'next/link';
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
// 다크 톤 공용 클래스 (반복 제거)
// ----------------------------------------------------------------------------

/** input/textarea 공통 — 어두운 배경 + 흰 글씨 (가시성 확보) */
const INPUT_BASE =
  'w-full px-3 py-2.5 bg-dark-900/60 border border-white/10 rounded-lg ' +
  'text-white placeholder:text-white/30 ' +
  'focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500/40 ' +
  'transition-colors';

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
      <main className="min-h-screen flex items-center justify-center bg-dark-950 text-white/60">
        <p>잠시만요...</p>
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
    <main className="min-h-screen flex items-center justify-center bg-dark-950 bg-mesh-gradient p-6">
      {/* 로그인 전에도 메인 사이트로 빠져나갈 수 있는 좌측 상단 링크 */}
      <Link
        href="/"
        className="fixed top-3 left-3 sm:top-4 sm:left-4 z-30 px-3 py-1.5
                   text-xs sm:text-sm text-white/60 hover:text-white
                   bg-black/30 hover:bg-black/50 backdrop-blur-sm
                   border border-white/10 hover:border-white/20
                   rounded-full transition-colors"
      >
        ← 메인으로
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-dark-900/70 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-glass"
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl bg-premium-gradient flex items-center justify-center text-xl shadow-glow-sm"
            aria-hidden
          >
            🔧
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">정비도사 어드민</h1>
            <p className="text-xs text-white/50">지식베이스 관리</p>
          </div>
        </div>
        <p className="text-sm text-white/60 mb-5">
          비밀번호를 입력해주세요.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={INPUT_BASE}
          placeholder="비밀번호"
          autoFocus
        />
        {error && (
          <p className="text-sm text-red-400 mt-3">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full mt-5 py-3 bg-premium-gradient text-white rounded-lg font-medium
                     shadow-glow-sm hover:shadow-glow-md
                     disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed
                     transition-all"
        >
          {loading ? '확인 중...' : '들어가기'}
        </button>

        {/* 비밀번호 힌트 — 팀원이 까먹었을 때 떠올리도록 앞 4자만.
            앱이름(영문 소문자) + 올해 연도 + 강조 부호로 끝납니다. */}
        <div className="mt-4 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10">
          <p className="text-[11px] text-white/50 leading-relaxed">
            <span className="text-white/70 font-semibold">힌트</span> · 앱이름(영문 소문자) 뒤에 올해 연도, 마지막에 강조 부호 1자. 시작 4자{' '}
            <code className="px-1 py-0.5 rounded bg-dark-950/60 text-accent-300 font-mono text-[11px]">
              jeon
            </code>
            <span className="text-white/30">…</span> (16자)
          </p>
        </div>
      </form>
    </main>
  );
}

// ----------------------------------------------------------------------------
// 어드민 대시보드 (로그인 후)
// ----------------------------------------------------------------------------

/** 미리보기 캐시 한 건의 형태 */
interface PreviewCacheEntry {
  /** 'loading' | 'ready' | 'error' */
  status: 'loading' | 'ready' | 'error';
  question?: string;
  answer?: string;
  error?: string;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [globalError, setGlobalError] = useState<string | null>(null);

  // 모달 상태들
  const [editingItem, setEditingItem] = useState<AdminItem | null>(null); // 수정 대상
  const [showCreate, setShowCreate] = useState(false); // 새 항목 추가 모달
  const [showBulk, setShowBulk] = useState(false); // 일괄 업로드 모달

  // 펼쳐진 row id 집합 (드롭다운식 토글)
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  // 미리보기 결과 캐시 — id 별 최대 1회 호출 보장 (페이지 새로고침 전까지 유지)
  // 같은 row를 여러 번 펼쳐도 OpenAI 호출은 단 1번만 발생합니다.
  const [previewCache, setPreviewCache] = useState<
    Record<number, PreviewCacheEntry>
  >({});

  /** 카드 펼침/접기 토글 — 처음 펼칠 때만 미리보기 fetch */
  const togglePreview = useCallback(
    async (id: number) => {
      // 펼침 상태 토글
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });

      // 이미 캐시(ready 또는 loading)가 있으면 호출하지 않음
      const existing = previewCache[id];
      if (existing && existing.status !== 'error') return;

      // loading 상태로 즉시 표시
      setPreviewCache((prev) => ({ ...prev, [id]: { status: 'loading' } }));

      try {
        const res = await fetch(`/api/jeongbidosa/admin/preview/${id}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          setPreviewCache((prev) => ({
            ...prev,
            [id]: {
              status: 'error',
              error: j.error ?? `HTTP ${res.status}`,
            },
          }));
          return;
        }
        const j = (await res.json()) as { question: string; answer: string };
        setPreviewCache((prev) => ({
          ...prev,
          [id]: { status: 'ready', question: j.question, answer: j.answer },
        }));
      } catch (err) {
        setPreviewCache((prev) => ({
          ...prev,
          [id]: {
            status: 'error',
            error: err instanceof Error ? err.message : '네트워크 오류',
          },
        }));
      }
    },
    [previewCache],
  );

  /** 특정 id 캐시를 무효화 (수정/삭제 시) */
  const invalidatePreview = useCallback((id: number) => {
    setPreviewCache((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setExpandedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

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
      invalidatePreview(item.id);
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
    <main className="min-h-screen bg-dark-950 bg-mesh-gradient text-white">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-20 bg-dark-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 flex-wrap">
          {/* 슬록스 메인 사이트로 돌아가는 링크 — 항상 헤더 좌측 첫 자리 */}
          <Link
            href="/"
            className="text-xs sm:text-sm text-white/50 hover:text-white
                       border border-white/10 hover:border-white/30
                       rounded-md px-2.5 py-1 transition-colors mr-1"
          >
            ← 메인
          </Link>
          <div className="flex items-center gap-2 mr-auto">
            <div
              className="w-8 h-8 rounded-lg bg-premium-gradient flex items-center justify-center text-sm shadow-glow-sm"
              aria-hidden
            >
              🔧
            </div>
            <h1 className="font-bold text-white">정비도사 어드민</h1>
            <span className="text-sm text-white/40 ml-1">
              ({items.length}건)
            </span>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="px-3 py-2 bg-premium-gradient text-white text-sm rounded-lg font-medium
                       shadow-glow-sm hover:shadow-glow-md transition-all"
          >
            + 새 항목
          </button>
          <button
            onClick={() => setShowBulk(true)}
            className="px-3 py-2 bg-dark-800/80 text-white text-sm rounded-lg font-medium
                       border border-white/10 hover:border-cyan-500/40 hover:text-cyan-300
                       transition-colors"
          >
            엑셀 업로드
          </button>
          <button
            onClick={handleDownloadExcel}
            className="px-3 py-2 bg-dark-800/80 text-white text-sm rounded-lg font-medium
                       border border-white/10 hover:border-white/30
                       transition-colors"
          >
            엑셀 다운로드
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-transparent text-white/60 text-sm rounded-lg
                       border border-white/10 hover:text-white hover:border-white/30
                       transition-colors"
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
            className={INPUT_BASE}
          />
        </div>

        {globalError && (
          <p className="text-sm text-red-400 mb-4">⚠️ {globalError}</p>
        )}

        {loading ? (
          <p className="text-white/40 text-center py-12">불러오는 중...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-white/40 text-center py-12">
            {search ? '검색 결과가 없습니다.' : '데이터가 없습니다.'}
          </p>
        ) : (
          <ul className="space-y-3">
            {filteredItems.map((item) => {
              const isExpanded = expandedIds.has(item.id);
              const preview = previewCache[item.id];
              return (
                <li
                  key={item.id}
                  className="bg-dark-900/60 backdrop-blur-sm border border-white/10 rounded-xl p-4
                             hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs text-white/30 font-mono">
                          #{item.id}
                        </span>
                        <h3 className="font-semibold text-white text-base">
                          {item.term}
                        </h3>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed mb-2">
                        {item.description}
                      </p>
                      {item.role && (
                        <p className="text-xs text-white/50 mb-1">
                          <span className="font-semibold text-accent-300">
                            원인{' '}
                          </span>
                          {item.role}
                        </p>
                      )}
                      {item.details && (
                        <p className="text-xs text-white/50">
                          <span className="font-semibold text-cyan-300">
                            점검절차{' '}
                          </span>
                          {item.details}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="px-2.5 py-1 text-xs bg-white/10 text-white/80 rounded
                                   hover:bg-white/20 hover:text-white transition-colors"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="px-2.5 py-1 text-xs bg-red-500/15 text-red-300 rounded
                                   border border-red-500/20 hover:bg-red-500/25 transition-colors"
                      >
                        ✕ 삭제
                      </button>
                    </div>
                  </div>

                  {/* 미리보기 토글 버튼 */}
                  <button
                    type="button"
                    onClick={() => togglePreview(item.id)}
                    className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs
                               text-white/50 hover:text-cyan-300
                               border border-white/10 hover:border-cyan-500/40
                               rounded-md transition-colors"
                  >
                    <span aria-hidden>{isExpanded ? '▲' : '▼'}</span>
                    <span>
                      {isExpanded ? '미리보기 닫기' : 'AI 답변 미리보기'}
                    </span>
                    {!preview && (
                      <span className="text-[10px] text-white/30 ml-1">
                        (클릭 시 1회 호출)
                      </span>
                    )}
                  </button>

                  {/* 펼친 영역 */}
                  {isExpanded && (
                    <PreviewPane
                      preview={preview}
                      onRetry={() => togglePreview(item.id)}
                    />
                  )}
                </li>
              );
            })}
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
            // 내용이 바뀌었으니 기존 미리보기는 더 이상 유효하지 않음
            invalidatePreview(editingItem.id);
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
            className={INPUT_BASE}
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
            className={INPUT_BASE}
            placeholder="2~3문장으로 증상을 설명해주세요"
          />
        </FieldLabel>
        <FieldLabel label="원인 (role) - 선택">
          <textarea
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            rows={2}
            className={INPUT_BASE}
            placeholder="왜 이런 증상이 생기는지"
          />
        </FieldLabel>
        <FieldLabel label="점검 절차 (details) - 선택">
          <textarea
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            rows={4}
            className={INPUT_BASE}
            placeholder="① ... ② ... ③ ..."
          />
        </FieldLabel>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-white/15 text-white/70 rounded-lg text-sm
                       hover:text-white hover:border-white/30 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-premium-gradient text-white rounded-lg text-sm font-medium
                       shadow-glow-sm hover:shadow-glow-md
                       disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed
                       transition-all"
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
      <span className="block text-sm font-medium text-white/80 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

/**
 * 업로드 결과 통계 셀 한 칸 — 추가/중복/누락/실패 4종을 색상으로 구분.
 * 큰 숫자 + 작은 라벨 형태로 한눈에 들어오게 합니다.
 */
function ResultStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'success' | 'info' | 'warn' | 'error';
}) {
  // 톤별 색상 매핑 — 다크 톤에 어울리는 채도 사용
  const colorByTone: Record<typeof tone, string> = {
    success: 'text-emerald-200 border-emerald-500/30 bg-emerald-500/10',
    info: 'text-cyan-200 border-cyan-500/30 bg-cyan-500/10',
    warn: 'text-amber-200 border-amber-500/30 bg-amber-500/10',
    error: 'text-red-200 border-red-500/30 bg-red-500/10',
  };
  return (
    <div
      className={`rounded-lg border px-2.5 py-2 ${colorByTone[tone]}`}
    >
      <div className="text-base font-bold leading-none">{value}</div>
      <div className="text-[10px] mt-1 opacity-80">{label}</div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 미리보기 패널 (펼쳐졌을 때 보이는 시뮬레이션 영역)
// ----------------------------------------------------------------------------

/**
 * 정비도사 채팅 화면을 미니어처로 재현해 보여줍니다.
 * - 사용자 말풍선 (인디고 그라디언트, 우측 정렬)
 * - AI 말풍선 (다크 + 출처 칩, 좌측 정렬)
 * - 우측 하단 [S1] 출처 칩: 이 데이터 자체임을 명시
 *
 * 호출 정책: 펼칠 때 1회만 호출 후 캐시. 같은 row 다시 펼쳐도 재호출 X.
 */
function PreviewPane({
  preview,
  onRetry,
}: {
  preview: PreviewCacheEntry | undefined;
  onRetry: () => void;
}) {
  // 아직 fetch 시작 전이거나 진행 중
  if (!preview || preview.status === 'loading') {
    return (
      <div className="mt-3 rounded-xl border border-white/10 bg-dark-950/60 p-4">
        <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3">
          📱 사용자 채팅 시뮬레이션
        </p>
        <div className="flex flex-col gap-2.5">
          {/* 사용자 말풍선 placeholder */}
          <div className="self-end max-w-[75%] px-3 py-2 rounded-2xl rounded-tr-sm bg-white/5 border border-white/10 animate-pulse">
            <div className="h-3 w-32 bg-white/10 rounded" />
          </div>
          {/* AI 말풍선 placeholder + typing dots */}
          <div className="self-start max-w-[75%] px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-dark-800/80 border border-white/10">
            <div className="flex items-center gap-1">
              <span
                className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
              <span className="ml-2 text-xs text-white/40">
                AI 답변 생성 중...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 — 재시도 버튼 제공
  if (preview.status === 'error') {
    return (
      <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
        <p className="text-sm text-red-300 mb-2">
          ⚠️ 미리보기 생성 실패: {preview.error ?? '알 수 없는 오류'}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="text-xs px-2.5 py-1 bg-red-500/15 text-red-200 rounded
                     border border-red-500/30 hover:bg-red-500/25 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 정상 응답 — 채팅 버블 형태로 렌더
  const { question, answer } = preview;
  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-dark-950/60 p-4 animate-fade-in">
      <p className="text-[11px] uppercase tracking-wider text-white/40 mb-3 flex items-center gap-1.5">
        📱 사용자 채팅 시뮬레이션
        <span className="text-white/20">·</span>
        <span className="text-cyan-300/70 normal-case tracking-normal">
          이 데이터가 검색됐을 때의 예시 답변
        </span>
      </p>

      <div className="flex flex-col gap-2.5">
        {/* 사용자 말풍선 — 우측 정렬, 인디고 그라디언트 */}
        <div className="self-end max-w-[80%] px-3.5 py-2 rounded-2xl rounded-tr-sm bg-premium-gradient text-white text-sm leading-relaxed shadow-soft">
          {question}
        </div>

        {/* AI 말풍선 — 좌측 정렬, 다크 */}
        <div className="self-start max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-dark-800/80 border border-white/10 text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
          {answer}
        </div>

        {/* 출처 칩 — 이 데이터 자체가 [S1]임을 명시 */}
        <div className="self-start mt-1 flex items-center gap-1.5">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 font-mono">
            [S1] 이 카드의 데이터
          </span>
        </div>
      </div>
    </div>
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
    duplicated: number;
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
      // defval: '' 로 빈 셀을 빈 문자열로 통일 (undefined 방어)
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
        duplicated?: number;
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
        duplicated: j.duplicated ?? 0,
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
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-sm text-amber-100 mb-4 space-y-1">
        <p className="font-semibold mb-1 text-amber-200">⚠ 업로드 전 확인</p>
        <ul className="list-disc list-inside space-y-0.5 text-amber-100/90">
          <li>
            첫 행은 반드시 헤더:{' '}
            <code className="bg-amber-500/20 px-1 rounded text-amber-100">
              term, description, role, details
            </code>{' '}
            (소문자, 영문)
          </li>
          <li>term, description 은 필수 (비어 있으면 자동 제외)</li>
          <li>role, details 는 선택 — 비워 두어도 됩니다</li>
          <li>한 번에 최대 100건까지 업로드 가능합니다</li>
          <li>
            <span className="text-emerald-300 font-semibold">중복 안전:</span>{' '}
            같은 term 이 이미 DB 에 있으면 자동으로 건너뜁니다 (같은 파일을 두 번 올려도 2배 안 됨)
          </li>
          <li>업로드 후 임베딩 자동 생성 — 30~50초 정도 걸립니다</li>
        </ul>
      </div>

      {/* 양식 다운로드 — 두 가지 시작 방식 명확히 분리 */}
      <div className="mb-4 rounded-lg border border-white/10 bg-dark-950/40 p-3">
        <p className="text-xs text-white/50 mb-2">
          엑셀을 어떻게 시작하시겠어요?
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleDownloadTemplate}
            type="button"
            className="flex-1 px-3 py-2 bg-dark-900/80 border border-white/15 text-sm text-white/80 rounded-lg
                       hover:border-white/30 hover:text-white transition-colors text-left"
          >
            <div className="font-semibold">📄 빈 양식 받기</div>
            <div className="text-[11px] text-white/40">
              헤더만 있는 엑셀. 처음부터 작성용
            </div>
          </button>
          <button
            onClick={() => {
              window.location.href = '/api/jeongbidosa/admin/export';
            }}
            type="button"
            className="flex-1 px-3 py-2 bg-dark-900/80 border border-white/15 text-sm text-white/80 rounded-lg
                       hover:border-cyan-500/40 hover:text-cyan-200 transition-colors text-left"
          >
            <div className="font-semibold">📥 현재 데이터로 받기</div>
            <div className="text-[11px] text-white/40">
              지금 DB 의 모든 행이 채워진 엑셀. 일부만 수정해 다시 올릴 때
            </div>
          </button>
        </div>
      </div>

      {/* 파일 선택 */}
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="block w-full text-sm text-white/80
                     file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0
                     file:bg-white/10 file:text-white hover:file:bg-white/20
                     file:cursor-pointer"
        />
      </div>

      {parseError && (
        <p className="text-sm text-red-400 mb-3">{parseError}</p>
      )}

      {parsedRows.length > 0 && !result && (
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-sm text-cyan-100 mb-4">
          <p className="font-semibold mb-1">
            업로드 준비 완료: {parsedRows.length}건
          </p>
          <p className="text-xs text-cyan-200/80">
            첫 항목: <code className="bg-white/10 px-1 rounded">{parsedRows[0]?.term}</code>
          </p>
        </div>
      )}

      {result && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-sm text-emerald-100 mb-4">
          <p className="font-semibold mb-1.5">업로드 완료</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <ResultStat
              label="추가됨"
              value={result.inserted}
              tone="success"
            />
            <ResultStat
              label="중복 건너뜀"
              value={result.duplicated}
              tone="info"
            />
            <ResultStat
              label="누락 건너뜀"
              value={result.skipped}
              tone="warn"
            />
            <ResultStat
              label="실패"
              value={result.failures.length}
              tone="error"
            />
          </div>

          {/* 사용자 의도 추정해서 친절한 메시지 */}
          {result.inserted === 0 && result.duplicated > 0 && (
            <p className="text-xs mt-2 text-emerald-200/90">
              ✓ 모두 이미 있는 항목이라 새로 추가된 건 없습니다.
              (같은 파일을 다시 올린 경우 정상 동작입니다)
            </p>
          )}

          {result.failures.length > 0 && (
            <ul className="text-xs mt-2 list-disc list-inside text-red-300">
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
          className="px-4 py-2 border border-white/15 text-white/70 rounded-lg text-sm
                     hover:text-white hover:border-white/30 transition-colors"
        >
          닫기
        </button>
        {!result ? (
          <button
            onClick={handleUpload}
            type="button"
            disabled={uploading || parsedRows.length === 0}
            className="px-4 py-2 bg-premium-gradient text-white rounded-lg text-sm font-medium
                       shadow-glow-sm hover:shadow-glow-md
                       disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed
                       transition-all"
          >
            {uploading
              ? `업로드 중... (${parsedRows.length}건 임베딩 생성)`
              : `${parsedRows.length}건 업로드`}
          </button>
        ) : (
          <button
            onClick={onCompleted}
            type="button"
            className="px-4 py-2 bg-premium-gradient text-white rounded-lg text-sm font-medium
                       shadow-glow-sm hover:shadow-glow-md transition-all"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-dark-900/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-glass-lg w-full max-w-2xl my-auto text-white">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="font-semibold text-white truncate pr-4">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white text-2xl leading-none"
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
