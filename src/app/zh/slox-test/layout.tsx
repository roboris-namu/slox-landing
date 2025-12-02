import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "牛性格测试 - 与你相似的牛是？| 免费测试",
  description: "免费牛性格测试！通过8个问题发现与你性格相似的可爱牛角色。领导牛、机甲牛、野性牛等！",
  keywords: ["牛测试", "牛性格测试", "性格测试", "角色测试", "心理测试", "动物测试", "免费性格测试"],
  openGraph: {
    title: "牛性格测试 - 与你相似的牛是？🐂",
    description: "免费牛性格测试！通过8个问题发现你的牛角色！",
    url: "https://www.slox.co.kr/zh/slox-test",
    siteName: "SLOX",
    locale: "zh_CN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.slox.co.kr/zh/slox-test",
    languages: {
      "ko": "https://www.slox.co.kr/slox-test",
      "en": "https://www.slox.co.kr/en/slox-test",
      "ja": "https://www.slox.co.kr/ja/slox-test",
      "zh": "https://www.slox.co.kr/zh/slox-test",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}




