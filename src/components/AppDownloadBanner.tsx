"use client";

import { useEffect, useState } from "react";
import { getAppLink, iosStoreUrl } from "@/lib/appLinks";

/**
 * 게임 페이지 상단의 슬림 다운로드 배너.
 *
 * - 모바일 UA(iPhone / iPad / Android) 에서만 표시 — 데스크탑은 무의미.
 * - X 버튼으로 닫으면 같은 게임에 대해 7일 동안 숨김 (localStorage).
 * - 게임 진행을 방해하지 않도록 fixed 가 아닌 일반 인라인 요소.
 * - iOS 면 App Store 버튼 단독 노출, Android 면 "출시 예정" placeholder.
 */
export default function AppDownloadBanner({
  code,
  lang = "ko",
}: {
  code: string;
  lang?: "ko" | "en";
}) {
  const info = getAppLink(code);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent || "";
    let p: "ios" | "android" | "desktop" = "desktop";
    if (/iPhone|iPad|iPod/i.test(ua)) p = "ios";
    else if (/Android/i.test(ua)) p = "android";
    setPlatform(p);

    const key = `slox-app-banner-dismissed:${code}`;
    const until = parseInt(localStorage.getItem(key) ?? "0", 10);
    if (Number.isFinite(until) && Date.now() < until) {
      setDismissed(true);
    } else {
      setDismissed(false);
    }
  }, [code]);

  function dismiss() {
    setDismissed(true);
    try {
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem(
        `slox-app-banner-dismissed:${code}`,
        String(Date.now() + sevenDaysMs)
      );
    } catch {
      /* localStorage 가 거부되어도 무시 */
    }
  }

  if (!info || dismissed) return null;
  if (platform === "desktop" || platform === null) return null;

  const copy = lang === "ko"
    ? {
        title: `${info.name} 모바일 앱`,
        sub: platform === "ios" ? "App Store 에서 받기 — 광고 적고 햅틱 지원" : "Google Play 출시 예정",
        ios: "App Store",
        and: "Google Play",
        soon: "출시 예정",
      }
    : {
        title: `${info.name} mobile app`,
        sub: platform === "ios" ? "Get it on the App Store — fewer ads, native haptics" : "Coming soon on Google Play",
        ios: "App Store",
        and: "Google Play",
        soon: "Coming soon",
      };

  return (
    <div
      role="region"
      aria-label={copy.title}
      className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-[480px] items-center gap-3 rounded-2xl border border-purple-500/30 bg-dark-950/95 px-3 py-2 shadow-2xl shadow-purple-500/20 backdrop-blur sm:px-4"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-lg">
        {info.icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-bold text-white">{copy.title}</div>
        <div className="truncate text-[11px] text-dark-300">{copy.sub}</div>
      </div>
      {platform === "ios" ? (
        <a
          href={iosStoreUrl(info.iosAppId)}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-black transition hover:bg-purple-100"
        >
          {copy.ios}
        </a>
      ) : (
        <span className="shrink-0 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-bold text-dark-300">
          {copy.soon}
        </span>
      )}
      <button
        type="button"
        onClick={dismiss}
        aria-label="close"
        className="shrink-0 rounded-full p-1 text-dark-400 transition hover:bg-white/5 hover:text-white"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>
    </div>
  );
}
