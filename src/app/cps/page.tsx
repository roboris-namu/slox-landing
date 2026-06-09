import CpsTest from "@/components/CpsTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";

export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6776764644",
  },
};

export default function CpsPage() {
  return (
    <>
      <CpsTest locale="ko" />
      <AppDownloadCTA code="cps" lang="ko" />
      <AppDownloadBanner code="cps" lang="ko" />
    </>
  );
}









