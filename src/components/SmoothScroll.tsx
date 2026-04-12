"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Native smooth scroll fallback - works without lenis installed
    // When lenis is available, it will be used via dynamic import
    const initLenis = async () => {
      try {
        const LenisModule = await import("lenis");
        const LenisClass = LenisModule.default || (LenisModule as Record<string, unknown>).Lenis;

        if (!LenisClass) return;

        const lenis = new (LenisClass as new (opts: Record<string, unknown>) => {
          raf: (time: number) => void;
          destroy: () => void;
          on: (ev: string, fn: unknown) => void;
        })({
          lerp: 0.08,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
          infinite: false,
        });

        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Integrate with GSAP ScrollTrigger
        try {
          const gsap = (await import("gsap")).default;
          const { ScrollTrigger } = await import("gsap/ScrollTrigger");
          gsap.registerPlugin(ScrollTrigger);
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add((time: number) => lenis.raf(time * 1000));
          gsap.ticker.lagSmoothing(0);
        } catch {
          // GSAP not available, lenis runs standalone
        }

        return () => lenis.destroy();
      } catch {
        // lenis not installed - use native smooth scroll
        document.documentElement.style.scrollBehavior = "smooth";
      }
    };

    initLenis();
  }, []);

  return null;
}
