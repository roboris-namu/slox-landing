import IQTestMulti from "@/components/games/IQTestMulti";

export const metadata = {
  title: "IQ测试 | SLOX",
  description: "分析模式，测量你的智商！门萨风格12道题目测试。",
};

export default function ZhIQPage() {
  return <IQTestMulti locale="zh" />;
}

