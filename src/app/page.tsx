import HomeContent from "@/components/HomeContent";
import AppDownloadBanner from "@/components/AppDownloadBanner";

export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6774633446",
  },
};

export default function Home() {
  return (
    <>
      <HomeContent locale="ko" />
      <AppDownloadBanner code="hub" lang="ko" />
    </>
  );
}
