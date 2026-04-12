"use client";

import { useEffect, useRef } from "react";

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
          gsap.fromTo(".cta-banner-content", { y: 40, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
        }, sectionRef.current);
        return () => ctx.revert();
      } catch { /* silent */ }
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-24 lg:py-28 px-5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none glow-pulse"
        style={{ background:"radial-gradient(ellipse 70% 80% at 50% 50%,rgba(120,0,0,.18) 0%,transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px red-sep" />
      <div className="absolute bottom-0 left-0 right-0 h-px red-sep" />

      <div className="cta-banner-content relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[#cc1a1a]" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#cc6666]">Ready to Begin?</span>
          <div className="w-8 h-px bg-[#cc1a1a]" />
        </div>

        <h2 className="font-display text-white leading-none mb-6 w-full"
          style={{ fontSize:"clamp(2.8rem,6vw,5rem)", textAlign:"center" }}>
          CLAIM YOUR<br />
          <span className="text-gradient-red">FREE TRIAL CLASS</span>
        </h2>

        <p className="text-sm lg:text-[15px] text-[#b89090] mb-10 max-w-lg leading-relaxed" style={{ textAlign:"center" }}>
          First class is on us. No commitment, no pressure. Just pure training.
          Walk in a beginner. Leave as a warrior.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}
            id="cta-banner-btn"
            className="px-12 py-4 text-[11px] tracking-[0.25em] uppercase font-semibold
                       bg-[#cc1a1a] text-white hover:bg-[#dd2222] transition-all duration-300
                       hover:shadow-[0_0_60px_rgba(200,20,20,.5)]">
            Claim Free Trial
          </button>
          <button
            onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior:"smooth" })}
            className="px-12 py-4 text-[11px] tracking-[0.25em] uppercase font-medium
                       text-[#c09090] border border-[#2a0f0f]
                       hover:border-[#cc1a1a] hover:text-white transition-all duration-300">
            View Programs
          </button>
        </div>
      </div>
    </section>
  );
}
