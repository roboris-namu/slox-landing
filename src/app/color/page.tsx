import ColorTest from "@/components/ColorTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6776802575",
  },
};

export default function ColorPage() { return (
    <>
      <ColorTest locale="ko" />
      <AppDownloadBanner code="color" lang="ko" />
    </>
  ); }









