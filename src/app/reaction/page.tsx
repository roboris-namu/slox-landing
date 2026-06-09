import ReactionTest from "@/components/ReactionTest";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6774714125",
  },
};

export default function ReactionPage() {
  return (
    <>
      <ReactionTest locale="ko" />
      <AppDownloadBanner code="reaction" lang="ko" />
    </>
  );
}
