import CardMatchGame from "@/components/CardMatchGame";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import AppDownloadCTA from "@/components/AppDownloadCTA";

export const metadata = {
  other: {
    "apple-itunes-app": "app-id=6776964094",
  },
};

export default function CardMatchPage() {
  return (
    <>
      <CardMatchGame />
      <AppDownloadCTA code="card-match" lang="ko" />
      <AppDownloadBanner code="card-match" lang="ko" />
    </>
  );
}

