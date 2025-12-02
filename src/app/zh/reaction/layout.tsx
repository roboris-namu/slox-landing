import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "反应速度测试 - 免费在线测试 | SLOX",
  description:
    "免费反应速度测试！屏幕变绿时尽快点击。用英雄联盟风格的段位（黑铁到挑战者）查看你的分数。",
  keywords: [
    "反应速度测试",
    "反应速度",
    "反射测试",
    "反应测试",
    "点击速度测试",
    "人类基准测试",
    "反应时间",
    "游戏反应速度",
    "SLOX",
  ],
  alternates: {
    canonical: "https://www.slox.co.kr/zh/reaction",
    languages: {
      "ko": "https://www.slox.co.kr/reaction",
      "en": "https://www.slox.co.kr/en/reaction",
      "ja": "https://www.slox.co.kr/ja/reaction",
      "zh": "https://www.slox.co.kr/zh/reaction",
    },
  },
  openGraph: {
    title: "反应速度测试 - 免费在线测试 | SLOX",
    description:
      "免费反应速度测试！屏幕变绿时尽快点击。",
    url: "https://www.slox.co.kr/zh/reaction",
    locale: "zh_CN",
  },
  twitter: {
    title: "反应速度测试 - 免费在线测试",
    description:
      "免费反应速度测试！屏幕变绿时尽快点击。",
  },
};

export default function ReactionLayoutZh({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}



