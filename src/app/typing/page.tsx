import TypingMulti from "@/components/games/TypingMulti";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6776772068",
  },
  title: "타자 속도 테스트 - SLOX",
  description: "당신의 타자 속도를 측정해보세요! 분당 타수(WPM)를 확인하고 글로벌 랭킹에서 경쟁하세요.",
};

export default function TypingPageKO() {
  return (
    <>
      <TypingMulti locale="ko" />
      <AppDownloadBanner code="typing" lang="ko" />
    </>
  );
}
