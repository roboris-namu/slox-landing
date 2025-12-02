import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPS测试 - 点击速度测试 | SLOX",
  description:
    "免费CPS测试！在1秒、5秒、10秒内尽快点击。用抖动点击、蝴蝶点击挑战更高CPS！",
  keywords: [
    "CPS测试",
    "点击速度",
    "每秒点击",
    "点击测试",
    "抖动点击",
    "蝴蝶点击",
    "我的世界CPS",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/zh/cps",
    languages: {
      "ko": "https://www.slox.co.kr/cps",
      "en": "https://www.slox.co.kr/en/cps",
      "ja": "https://www.slox.co.kr/ja/cps",
      "zh": "https://www.slox.co.kr/zh/cps",
      "es": "https://www.slox.co.kr/es/cps",
      "pt": "https://www.slox.co.kr/pt/cps",
      "de": "https://www.slox.co.kr/de/cps",
      "fr": "https://www.slox.co.kr/fr/cps",
    },
  },
  openGraph: {
    title: "CPS测试 - 点击速度测试 | SLOX",
    description: "免费CPS测试。你的每秒点击数是多少？",
    url: "https://www.slox.co.kr/zh/cps",
    locale: "zh_CN",
  },
};

export default function CpsLayoutZh({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}





