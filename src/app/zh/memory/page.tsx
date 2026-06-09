import MemoryTest from "@/components/MemoryTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";
export default function MemoryPageZh() { return (
    <>
      <MemoryTest locale="zh" />
      <AppDownloadCTA code="memory" lang="en" />
      <AppDownloadBanner code="memory" lang="en" />
    </>
  ); }









