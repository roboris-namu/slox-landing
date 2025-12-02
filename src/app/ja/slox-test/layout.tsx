import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "牛性格テスト - あなたに似た牛は？| 無料テスト",
  description: "無料の牛性格テスト！8つの質問であなたに似た可愛い牛キャラクターを発見しよう。リーダー牛、メカ牛、野生牛など！",
  keywords: ["牛テスト", "牛性格テスト", "性格テスト", "キャラクターテスト", "心理テスト", "動物診断", "無料性格テスト"],
  openGraph: {
    title: "牛性格テスト - あなたに似た牛は？🐂",
    description: "無料の牛性格テスト！8つの質問であなたの牛キャラを発見！",
    url: "https://www.slox.co.kr/ja/slox-test",
    siteName: "SLOX",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://www.slox.co.kr/ja/slox-test",
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




