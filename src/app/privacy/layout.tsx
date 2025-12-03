import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 - SLOX",
  description: "SLOX의 개인정보처리방침입니다. 이용자의 개인정보 보호를 위해 최선을 다하고 있습니다.",
  robots: "noindex, nofollow",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}








