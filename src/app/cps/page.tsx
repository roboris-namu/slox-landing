import CpsTest from "@/components/CpsTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6776764644",
  },
};

export default function CpsPage() {
  return (
    <>
      <CpsTest locale="ko" />
      <AppDownloadBanner code="cps" lang="ko" />
    </>
  );
}









