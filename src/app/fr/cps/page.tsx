import CpsTest from "@/components/CpsTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export default function CpsPageFr() {
  return (
    <>
      <CpsTest locale="fr" />
      <AppDownloadCTA code="cps" lang="en" />
      <AppDownloadBanner code="cps" lang="en" />
    </>
  );
}









