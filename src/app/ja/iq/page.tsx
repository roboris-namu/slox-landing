import IQTestMulti from "@/components/games/IQTestMulti";

export const metadata = {
  title: "IQテスト | SLOX",
  description: "パターンを分析してIQを測定しよう！メンサスタイルの12問テスト。",
};

export default function JaIQPage() {
  return <IQTestMulti locale="ja" />;
}

