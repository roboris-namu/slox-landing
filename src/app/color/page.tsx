import ColorTest from "@/components/ColorTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";

export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6776802575",
  },
};

export default function ColorPage() { return (
    <>
      <ColorTest locale="ko" />
      <AppDownloadCTA code="color" lang="ko" />
      <AppDownloadBanner code="color" lang="ko" />
    </>
  ); }









