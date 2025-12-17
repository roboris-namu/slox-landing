import QuizGameMulti from "@/components/games/QuizGameMulti";

export const metadata = {
  title: "知识问答 | SLOX",
  description: "挑战10道问题，测试你的知识！每题15秒，挑战排行榜吧。",
};

export default function ZhQuizPage() {
  return <QuizGameMulti locale="zh" />;
}

