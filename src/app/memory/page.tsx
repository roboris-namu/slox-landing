import MemoryTest from "@/components/MemoryTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6777042091",
  },
};

export default function MemoryPage() { return (
    <>
      <MemoryTest locale="ko" />
      <AppDownloadBanner code="memory" lang="ko" />
    </>
  ); }









