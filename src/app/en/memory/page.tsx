import MemoryTest from "@/components/MemoryTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export default function MemoryPageEn() { return (
    <>
      <MemoryTest locale="en" />
      <AppDownloadCTA code="memory" lang="en" />
      <AppDownloadBanner code="memory" lang="en" />
    </>
  ); }









