"use client";

import { useState, useEffect } from "react";
import DesktopBook from "@/components/book/DesktopBook";
import MobileBook from "@/components/book/MobileBook";

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Avoid hydration mismatch by waiting for client-side evaluation
  if (isMobile === null) {
    return <div className="h-[100dvh] w-full bg-[#1e1c1a]" />; // Match desktop dark theme briefly
  }

  return isMobile ? <MobileBook /> : <DesktopBook />;
}
