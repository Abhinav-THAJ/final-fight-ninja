"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();
    const ctx = gsap.context(() => {
      // ── Initial State ──────────────────────────────────────────────
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.78, y: 20 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 14, letterSpacing: "0.5em" });
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(progressTrackRef.current, { opacity: 0 });

      // ── Phase 1: Fade in overlay ──────────────────────────────────
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      // ── Phase 2: Logo entrance ────────────────────────────────────
      tl.to(
        logoRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.1"
      );

      // ── Phase 3: Subtitle reveal ──────────────────────────────────
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.35em",
          duration: 0.85,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // ── Phase 4: Progress track fade + bar fill ──────────────────
      tl.to(
        progressTrackRef.current,
        { opacity: 1, duration: 0.4, ease: "power1.out" },
        "-=0.3"
      );

      tl.to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.inOut",
        },
        "-=0.2"
      );

      // ── Phase 5: Logo glow pulse (looping while visible) ─────────
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.12,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // ── Phase 6: Exit — slide-up reveal (GTA style) ───────────────
      tl.to(
        [logoRef.current, subtitleRef.current, progressTrackRef.current],
        {
          opacity: 0,
          y: -24,
          duration: 0.55,
          ease: "power2.in",
          stagger: 0.06,
        },
        "+=0.4"
      );

      tl.to(
        slideRef.current,
        {
          y: "-100%",
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.1"
      );

      tl.to(
        overlayRef.current,
        {
          y: "-100%",
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            setIsVisible(false);
            onComplete?.();
          },
        },
        "<"
      );
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <>
      {/* ── Slide-up panel (secondary cinematic layer) ────────────── */}
      <div
        ref={slideRef}
        className="fixed inset-0 z-[9998] bg-[#0a0000] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Main overlay ──────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        id="preloader-overlay"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060404] overflow-hidden"
        role="status"
        aria-label="Loading Rogue Ninja Fight Club"
      >
        {/* Noise / grain texture */}
        <div
          ref={noiseRef}
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.045]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
            animation: "noiseShift 0.08s steps(1) infinite",
          }}
        />

        {/* Radial vignette */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Subtle red ambient glow at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, #cc1a1a 40%, #cc1a1a 60%, transparent)",
            boxShadow: "0 0 60px 20px rgba(180,20,20,0.18)",
          }}
        />

        {/* ── Logo container ────────────────────────────────────────── */}
        <div ref={logoRef} className="relative z-10 flex flex-col items-center w-full px-6">
          {/* Glow halo behind logo */}
          <div
            ref={glowRef}
            className="absolute inset-0 pointer-events-none opacity-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,20,20,0.22) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          {/* Flicker wrapper */}
          <div className="relative logo-flicker w-full flex justify-center">
            <Image
              src="/logo.png"
              alt="Rogue Ninja Fight Club"
              width={640}
              height={180}
              priority
              className="w-full max-w-[480px] sm:max-w-[580px] md:max-w-[640px] h-auto select-none"
              style={{
                filter:
                  "drop-shadow(0 0 18px rgba(220,30,30,0.55)) drop-shadow(0 0 50px rgba(180,0,0,0.28))",
              }}
            />
          </div>

          {/* Subtitle */}
          <div
            ref={subtitleRef}
            className="mt-6 text-[10px] sm:text-[11px] font-light tracking-[0.35em] text-[#8a2020] uppercase select-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Fight Club
          </div>
        </div>

        {/* ── Progress bar ──────────────────────────────────────────── */}
        <div
          ref={progressTrackRef}
          className="absolute bottom-[10%] z-10 w-[180px] sm:w-[220px] flex flex-col items-center gap-2 opacity-0"
        >
          {/* Track */}
          <div className="w-full h-[1px] bg-[#1a0a0a] relative overflow-hidden">
            {/* Bar */}
            <div
              ref={progressBarRef}
              className="absolute inset-0 origin-left"
              style={{
                background:
                  "linear-gradient(90deg, #8a0000 0%, #cc1a1a 60%, #ff3333 100%)",
                boxShadow: "0 0 10px #cc1a1a, 0 0 22px rgba(200,20,20,0.5)",
              }}
            />
          </div>

          {/* Corner decorations */}
          <div className="w-full flex justify-between">
            <span
              className="w-[5px] h-[5px] border-l border-t border-[#4a1010]"
              aria-hidden="true"
            />
            <span
              className="text-[8px] tracking-[0.2em] text-[#4a1515] uppercase select-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Loading
            </span>
            <span
              className="w-[5px] h-[5px] border-r border-b border-[#4a1010]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          className="absolute bottom-6 z-10 text-[9px] tracking-[0.28em] text-[#2a1010] uppercase select-none"
          style={{ fontFamily: "'Inter', sans-serif" }}
          aria-hidden="true"
        >
          Rogue Ninja &bull; Est. 2024
        </div>
      </div>
    </>
  );
}
