import { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "SLOX - 免费在线游戏和工具 | 玩、竞争、排名",
  description: "SLOX - 免费在线游戏和工具。反应速度测试、IQ测试、数独、问答、BMI计算器、QR生成器等24种以上免费工具。与全球玩家竞争！",
  keywords: ["免费在线游戏", "反应速度测试", "IQ测试", "免费工具", "数独", "问答", "SLOX"],
  openGraph: {
    title: "SLOX - 免费在线游戏和工具",
    description: "24种以上免费游戏和工具。玩、竞争、挑战排行榜！",
    locale: "zh_CN",
  },
};

export default function ChineseHome() {
  return <HomeContent locale="zh" />;
}
