import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "瞄准训练 - 鼠标精度测试 | SLOX",
  description: "免费瞄准训练器！尽快准确地点击目标。无畏契约、CS、守望先锋瞄准练习！",
  keywords: ["瞄准训练", "瞄准测试", "鼠标精度", "FPS瞄准练习", "无畏契约瞄准"],
  alternates: { canonical: "https://www.slox.co.kr/zh/aim", languages: { "ko": "https://www.slox.co.kr/aim", "en": "https://www.slox.co.kr/en/aim", "ja": "https://www.slox.co.kr/ja/aim", "zh": "https://www.slox.co.kr/zh/aim", "es": "https://www.slox.co.kr/es/aim", "pt": "https://www.slox.co.kr/pt/aim", "de": "https://www.slox.co.kr/de/aim", "fr": "https://www.slox.co.kr/fr/aim" } },
  openGraph: { title: "瞄准训练 | SLOX", description: "免费瞄准训练器", url: "https://www.slox.co.kr/zh/aim", locale: "zh_CN" },
};

export default function AimLayoutZh({ children }: { children: React.ReactNode }) { return <>{children}</>; }



