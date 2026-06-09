import AimTest from "@/components/AimTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";

export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6776975811",
  },
};

export default function AimPage() {
  return (
    <>
      <AimTest locale="ko" />
      <AppDownloadCTA code="aim" lang="ko" />
      <AppDownloadBanner code="aim" lang="ko" />
    </>
  );
}









