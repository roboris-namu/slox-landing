"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
}

export default function AdBanner({
  format = "auto",
  responsive = true,
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (error) {
      console.error("AdSense 로드 에러:", error);
    }
  }, []);

  return (
    <div className={`max-w-5xl mx-auto px-6 ${className}`} ref={adRef}>
      <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-4738855756690019"
          data-ad-slot="6733542611"
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}

/**
 * 인피드 광고 (목록 사이에 배치)
 */
export function AdInFeed({ className = "" }: { className?: string }) {
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (error) {
      console.error("AdSense 로드 에러:", error);
    }
  }, []);

  return (
    <div className={`ad-infeed ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4738855756690019"
        data-ad-slot="auto"
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
      />
    </div>
  );
}

/**
 * 멀티플렉스 광고 (여러 광고 한번에)
 */
export function AdMultiplex({ className = "" }: { className?: string }) {
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (error) {
      console.error("AdSense 로드 에러:", error);
    }
  }, []);

  return (
    <div className={`ad-multiplex ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4738855756690019"
        data-ad-slot="auto"
        data-ad-format="autorelaxed"
      />
    </div>
  );
}

