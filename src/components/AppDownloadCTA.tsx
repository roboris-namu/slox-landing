"use client";

import { getAppLink, iosStoreUrl } from "@/lib/appLinks";

/**
 * 게임 페이지 하단 (명예의전당 아래)에 배치하는 큰 다운로드 카드.
 *
 * - 데스크탑/모바일 모두 표시 — 데스크탑 사용자도 자기 폰에 깔라고 권유.
 * - dismiss 없음 (페이지 가장 아래라 거슬리지 않음).
 * - iOS 버튼은 활성, Android 는 출시 예정 표기.
 */
export default function AppDownloadCTA({
  code,
  lang = "ko",
}: {
  code: string;
  lang?: "ko" | "en";
}) {
  const info = getAppLink(code);
  if (!info) return null;

  const copy = lang === "ko"
    ? {
        eyebrow: "모바일 앱으로 더 편하게",
        title: `${info.name}`,
        sub: "오프라인에서도 플레이, 햅틱 피드백, 더 적은 광고. 글로벌 랭킹은 웹과 같은 테이블을 공유합니다.",
        ios: "App Store",
        and: "Google Play",
        soon: "출시 예정",
      }
    : {
        eyebrow: "Want this on your phone?",
        title: `${info.name}`,
        sub: "Play offline, feel the haptics, fewer ads. The global ranking shares the same table as the web.",
        ios: "App Store",
        and: "Google Play",
        soon: "Coming soon",
      };

  return (
    <section
      aria-label={copy.title}
      className="mx-auto mt-6 w-full max-w-3xl overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-dark-900 to-pink-500/10 p-5 sm:p-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/20 text-2xl">
          {info.icon}
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
            {copy.eyebrow}
          </div>
          <h3 className="truncate text-base font-bold text-white sm:text-lg">{copy.title}</h3>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-dark-300">{copy.sub}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href={iosStoreUrl(info.iosAppId)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-purple-100"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.5 12.5c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-3.9 2.4-1.7 2.9-.4 7.3 1.2 9.6.8 1.1 1.7 2.4 3 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.6-1-2.7-3.8zM15 4.6c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 2.8-1.3z" />
          </svg>
          {copy.ios}
        </a>
        <span className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-dark-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3.6 1.8L14 12 3.6 22.2c-.3-.2-.6-.6-.6-1V2.8c0-.4.3-.8.6-1zm11.3 11.3l2.6 2.6-13.2 7.6L14.9 13zm5-3.3c.4.3.7.8.7 1.4s-.3 1.1-.7 1.4l-2.5 1.5-2.9-2.9 2.9-2.9 2.5 1.5zm-4.7-1L4.5 1.2 16.6 8.2l-2.5 2.6z" />
          </svg>
          {copy.and} · {copy.soon}
        </span>
      </div>
    </section>
  );
}
