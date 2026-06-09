import TypingMulti from "@/components/games/TypingMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  title: "打字速度测试 - SLOX",
  description: "测试你的打字速度！你能打多快？在全球排行榜上竞争。",
};

export default function TypingPageZH() {
  return (
    <>
      <TypingMulti locale="zh" />
      <AppDownloadBanner code="typing" lang="en" />
    </>
  );
}

