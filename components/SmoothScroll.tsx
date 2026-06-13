"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(SmoothScrollContext);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Only initialize on client side
    if (typeof window === "undefined") return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smooth transition
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    // Hook Lenis scrolling into GSAP's ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Sync GSAP ticker with Lenis raf (requestAnimationFrame) loop
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000); // convert GSAP time (seconds) to Lenis time (milliseconds)
    };

    gsap.ticker.add(updateTicker);

    // Disable lag smoothing to prevent syncing delays between scroll and animations
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger to parse initial page state
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisInstance}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
