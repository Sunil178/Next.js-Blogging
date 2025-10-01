"use client";

import { Spin } from "antd";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isValidLink } from "@/libs/helpers";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams()

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event: PointerEvent) => {
      if (event && event.target instanceof HTMLElement) {
        const linkElement = event.target.closest("a") as HTMLAnchorElement | null;
        if (linkElement && linkElement.getAttribute("data-loader-link-stop")) {
          setLoading(false);
        } else if (linkElement && (isValidLink(linkElement?.href) || linkElement.getAttribute("data-loader-link-start"))) {
          setLoading(true);
        };
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Spin fullscreen size="large" tip="Loading..." />
    </div>
  );
}
