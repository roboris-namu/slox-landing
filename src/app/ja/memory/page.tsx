import MemoryTest from "@/components/MemoryTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export default function MemoryPageJa() { return (
    <>
      <MemoryTest locale="ja" />
      <AppDownloadCTA code="memory" lang="en" />
      <AppDownloadBanner code="memory" lang="en" />
    </>
  ); }









