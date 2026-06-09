import IQTest from "@/components/IQTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6776782492",
  },
  title: "IQ 테스트 (멘사 스타일) - SLOX",
  description: "패턴을 분석하고 당신의 IQ를 측정하세요! 멘사 스타일의 논리력 테스트입니다.",
};

export default function IQPage() {
  return (
    <>
      <IQTest />
      <AppDownloadBanner code="iq" lang="ko" />
    </>
  );
}

