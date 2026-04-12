"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
          gsap.fromTo(textRef.current,  { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: textRef.current, start: "top 80%" } });
          gsap.fromTo(imageRef.current, { x:  60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: imageRef.current, start: "top 80%" } });
          const statEls = statsRef.current?.querySelectorAll(".stat-item");
          if (statEls)
            gsap.fromTo(statEls, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: statsRef.current, start: "top 85%" } });
          gsap.to(imageRef.current, { yPercent: -10, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 } });
        }, sectionRef.current);
        return () => ctx.revert();
      } catch { /* silent */ }
    };
    init();
  }, []);

  return (
    <section id="about" ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 xl:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px red-sep" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">

          {/* TEXT */}
          <div ref={textRef} className="flex flex-col gap-5 lg:gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-[#cc1a1a]" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#cc6666]">About Us</span>
            </div>

            <h2 className="font-display leading-none text-white"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", textAlign: "left" }}>
              WHERE<br />
              <span className="text-gradient-red">WARRIORS</span><br />
              ARE MADE
            </h2>

            <div className="flex flex-col gap-4 text-[#b89090] text-sm lg:text-[15px] leading-relaxed">
              <p>
                Rogue Ninja Fight Club is not just a gym — it&apos;s a brotherhood forged in
                discipline, sweat, and the relentless pursuit of excellence. Founded by
                champion fighters, our dojo trains beginners and elite athletes alike.
              </p>
              <p>
                We combine traditional martial arts wisdom with modern combat sports science
                to produce fighters who are not just physically superior — but mentally
                unbreakable.
              </p>
            </div>

            <div ref={statsRef} className="flex flex-col gap-4 mt-1">
              {[
                { title: "Discipline",     desc: "Every session forges the mind as much as the body." },
                { title: "Mindset",        desc: "We cultivate warriors who never quit, never break." },
                { title: "Transformation", desc: "Walk in ordinary. Leave extraordinary." },
              ].map(item => (
                <div key={item.title} className="stat-item flex items-start gap-4 pb-4 border-b border-[#1e0707]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#cc1a1a] mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-[11px] tracking-[0.2em] uppercase text-white font-semibold">{item.title}</span>
                    <p className="text-[12px] text-[#8a6060] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div ref={imageRef} className="relative mt-8 lg:mt-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[#1e0707]">
              <Image
                src="/about_image.png" alt="Training at Rogue Ninja"
                fill className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom,transparent 60%,rgba(6,4,4,.85) 100%)" }} />
              <div className="absolute bottom-6 left-6">
                <div className="text-[9px] tracking-[0.4em] uppercase text-[#cc1a1a] mb-1">Est. 2024</div>
                <div className="text-[11px] tracking-[0.15em] uppercase text-[#b08080]">Discipline · Honor · Power</div>
              </div>
            </div>
            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#cc1a1a]" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#cc1a1a]" />
            {/* Floating badge */}
            <div className="absolute -right-4 sm:-right-6 xl:-right-10 top-1/4
                            bg-[#0a0202] border border-[#1e0707] p-4 lg:p-5"
              style={{ boxShadow: "0 0 40px rgba(0,0,0,.6)" }}>
              <div className="text-3xl lg:text-4xl font-display text-[#cc1a1a]">3x</div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-[#8a6060] mt-1">
                Championship<br />Titles
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
