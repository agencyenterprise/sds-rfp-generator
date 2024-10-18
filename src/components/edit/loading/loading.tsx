import lottie from "lottie-web";
import { useEffect, useRef } from "react";

import { cn } from "~/lib/utils";

import animationData from "./data.json";

export function Loading({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
      return () => animation.destroy();
    }
  }, []);

  return <div ref={containerRef} className={cn("size-20", className)} />;
}
