import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이벤트 관리 - SLOX Admin",
  description: "SLOX 이벤트 관리 페이지",
  robots: "noindex, nofollow", // 검색엔진에 노출되지 않도록
};

export default function AdminEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

