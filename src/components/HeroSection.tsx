"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const bgRef             = useRef<HTMLDivElement>(null);
  const overlayRef        = useRef<HTMLDivElement>(null);
  const tagRef            = useRef<HTMLDivElement>(null);
  const logoRef           = useRef<HTMLDivElement>(null);
  const headlineRef       = useRef<HTMLDivElement>(null);
  const subRef            = useRef<HTMLParagraphElement>(null);
  const ctaRef            = useRef<HTMLDivElement>(null);
  const statsRef          = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef= useRef<HTMLDivElement>(null);

  /* ── mouse parallax ── */
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 7;
      bgRef.current.style.transform = `translate(${x}px,${y}px) scale(1.06)`;
    };
    if (window.matchMedia("(hover:hover)").matches)
      window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  /* ── GSAP entrance + parallax ── */
  useEffect(() => {
    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({ delay: 0.4 });

        gsap.set([tagRef.current, logoRef.current, headlineRef.current,
                  subRef.current, ctaRef.current, statsRef.current, scrollIndicatorRef.current],
          { opacity: 0, y: 30 });
        gsap.set(logoRef.current, { scale: 0.88, y: 20 });

        if (headlineRef.current)
          gsap.set(headlineRef.current.querySelectorAll(".word"), { y: 40, opacity: 0 });

        tl.to(tagRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
          .to(logoRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out" }, "-=0.4")
          .to(headlineRef.current?.querySelectorAll(".word") ?? [],
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out" }, "-=0.6")
          .to(subRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
          .to(ctaRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
          .to(statsRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
          .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

        gsap.to(overlayRef.current, {
          yPercent: 20, ease: "none",
          scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1.5 },
        });
      } catch { /* silent */ }
    };
    init();
  }, []);

  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* BG Image generated from User Prompt */}
      <div ref={bgRef} className="absolute inset-0 z-0 scale-[1.05] transition-transform duration-[120ms] ease-out pointer-events-none"
        style={{ backgroundImage:"url('/anti_gravity_kickboxer.png')", backgroundSize:"cover", backgroundPosition:"center 30%" }} />

      {/* Overlays */}
      <div ref={overlayRef} className="absolute inset-0 z-[1]"
        style={{ background:"linear-gradient(to bottom,rgba(8,5,15,.6) 0%,rgba(8,5,15,.22) 40%,rgba(8,5,15,.7) 75%,rgba(8,5,15,.99) 100%)" }} />
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background:"radial-gradient(ellipse 80% 70% at 50% 45%,rgba(88,28,135,.22) 0%,transparent 65%)" }} />
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background:"linear-gradient(90deg,rgba(8,5,15,.5) 0%,transparent 16%,transparent 84%,rgba(8,5,15,.5) 100%)" }} />

      {/* Noise + Scanline + Top line */}
      <div className="noise-layer absolute inset-0 z-[2]" />
      <div className="scanline z-[3]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] z-[4]"
        style={{ background:"linear-gradient(90deg,transparent 0%,#7c3aed 40%,#7c3aed 60%,transparent 100%)", boxShadow:"0 0 40px 8px rgba(124,58,237,.25)" }} />

      {/* Content */}
      <div className="relative z-[5] w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16
                      flex flex-col items-center text-center gap-4 sm:gap-5 mt-[72px]">

        {/* Tag */}
        {/* <div ref={tagRef} style={{ opacity: 0 }}
          className="inline-block text-[9px] tracking-[0.5em] uppercase text-[#cc8888] border border-[#331111] px-4 py-1.5">
          Est. 2024 · Premium Fight Training
        </div> */}

        {/* Logo */}
        <div ref={logoRef} style={{ opacity: 0 }} className="logo-flicker-anim w-full flex justify-center">
          <Image
            src="/logo.png" alt="Rogue Ninja Fight Club"
            width={780} height={220} priority
            className="w-full max-w-[310px] sm:max-w-[400px] md:max-w-[560px] lg:max-w-[680px] xl:max-w-[780px] h-auto select-none"
            style={{ filter:"drop-shadow(0 0 40px rgba(124,58,237,.65)) drop-shadow(0 0 100px rgba(100,20,200,.35))" }}
          />
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="flex flex-col items-center gap-0.5">
          {[
            ["Train","Like","a","Fighter."],
            ["Live","Like","a","Warrior."],
          ].map((words, li) => (
            <div key={li} className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3 lg:gap-x-4">
              {words.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <span className={`word inline-block font-display
                    text-[clamp(2.8rem,9vw,5.5rem)]
                    tracking-wide leading-none
                    ${li === 1 && word === "Warrior." ? "text-[#cc1a1a]" : "text-white"}`}>
                    {word}{i < words.length - 1 ? "\u00A0" : ""}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Sub */}
        <p ref={subRef} style={{ opacity: 0 }}
          className="text-sm lg:text-base text-[#c4b5d4] tracking-[0.08em] max-w-md lg:max-w-lg leading-relaxed">
          Strength, discipline, and elite fight training for warriors of every level.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => navigateTo("/programs")} id="cta-start-training"
            className="px-12 py-5 sm:px-10 sm:py-4 text-[12px] sm:text-[11px] tracking-[0.25em] uppercase font-bold sm:font-semibold text-white
                       bg-[#cc1a1a] hover:bg-[#dd2222] transition-all duration-300
                       hover:shadow-[0_0_50px_rgba(200,20,20,.5)]">
            Start Training
          </button>
          <button onClick={() => navigateTo("/about")} id="cta-our-story"
            className="px-12 py-5 sm:px-10 sm:py-4 text-[12px] sm:text-[11px] tracking-[0.25em] uppercase font-bold sm:font-medium
                       text-[#c4b5d4] border border-[#1a0f2e]
                       hover:border-[#7c3aed] hover:text-white transition-all duration-300">
            Our Story
          </button>
        </div>

        {/* Stats */}
        <div ref={statsRef} style={{ opacity: 0 }}
          className="flex items-center gap-8 sm:gap-10 lg:gap-16 mt-4 pt-5
                     border-t border-[#1a0f2e] justify-center w-full max-w-sm sm:max-w-none">
          {[
            { num: "500+", label: "Members"       },
            { num: "12+",  label: "Elite Coaches" },
            { num: "8",    label: "Disciplines"   },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-display text-white tracking-wide">{s.num}</span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#9d8bba]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} style={{ opacity: 0 }}
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-[8px] tracking-[0.3em] uppercase text-[#6b5a8e]">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#7c3aed] to-transparent" />
      </div>
    </section>
  );
}
