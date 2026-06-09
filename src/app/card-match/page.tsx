import CardMatchGame from "@/components/CardMatchGame";
import AppDownloadBanner from "@/components/AppDownloadBanner";
export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6776964094",
  },
};

export default function CardMatchPage() {
  return (
    <>
      <CardMatchGame />
      <AppDownloadBanner code="card-match" lang="ko" />
    </>
  );
}

