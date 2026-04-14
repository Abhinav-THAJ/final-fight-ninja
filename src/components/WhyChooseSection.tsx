"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const REASONS = [
  {
    icon: "01",
    title: "Root-Level Training",
    desc: "We start from the basics, ensuring strong foundations and correct technique from day one.",
  },
  {
    icon: "02",
    title: "Strength Training",
    desc: "Programs designed to build raw power, endurance, and elite athletic performance.",
  },
  {
    icon: "03",
    title: "Technical Skill Development",
    desc: "Focused sessions to improve striking skills, fight IQ, and in-cage strategy.",
  },
  {
    icon: "04",
    title: "Sparring Sessions",
    desc: "Safe, controlled sparring to apply techniques in real, pressure-tested fight situations.",
  },
  {
    icon: "05",
    title: "Game Sessions",
    desc: "Fun, competitive drills to sharpen reflexes, timing, and split-second decision-making.",
  },
  {
    icon: "06",
    title: "Champion Trainers",
    desc: "Coaches are champions and experienced fighters with real, proven competition exposure.",
  },
  {
    icon: "07",
    title: "Wider Exposure",
    desc: "Access to multiple competition platforms—more opportunities to compete, grow, and dominate.",
  },
  {
    icon: "08",
    title: "Proven Excellence",
    desc: "National champions, national players, and state champions — plus the Overall Trophy at TVM District Kickboxing Championship within just 1½ years.",
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
          gsap.fromTo(
            ".why-card",
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
            }
          );
        }, sectionRef.current);
        return () => ctx.revert();
      } catch { /* silent */ }
    };
    init();
  }, []);

  return (
    <section id="why-choose" ref={sectionRef} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px red-sep" />
      <div className="absolute bottom-0 left-0 right-0 h-px red-sep" />

      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ai_fighters.png"
          fill
          alt="Why Choose RogueNinja"
          className="object-cover object-center opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08050f] via-transparent to-[#08050f]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#7c3aed]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#a78bda]">Why Train With Us</span>
            <div className="w-8 h-px bg-[#7c3aed]" />
          </div>
          <h2
            className="font-display text-white leading-none"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", textAlign: "center" }}
          >
            WHY CHOOSE <span className="text-gradient-red">ROGUENINJA FC</span>
          </h2>
          <p className="mt-6 text-[#c4b5d4] max-w-2xl text-sm lg:text-[15px] leading-relaxed">
            We don&apos;t just train bodies — we forge champions. Here is exactly why RogueNinja FC is the standard in combat sports.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {REASONS.map((item) => (
            <div
              key={item.icon}
              className="why-card group relative p-6 border border-[#1a0f2e] bg-[#0e0818]/60 backdrop-blur-sm
                         hover:border-[#7c3aed]/50 hover:bg-[#1a0f2e]/80 transition-all duration-500
                         flex flex-col gap-4"
            >
              {/* Number */}
              <div
                className="font-display text-5xl leading-none font-bold select-none
                           text-[#3d2a6e] group-hover:text-[#7c3aed] transition-colors duration-500"
              >
                {item.icon}
              </div>

              <div className="w-full h-px bg-[#1a0f2e] group-hover:bg-[#7c3aed]/40 transition-colors duration-500" />

              <h3 className="text-[13px] tracking-[0.15em] uppercase text-white font-semibold">
                {item.title}
              </h3>
              <p className="text-[12px] text-[#8b7aa0] leading-relaxed group-hover:text-[#c4b5d4] transition-colors duration-300">
                {item.desc}
              </p>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7c3aed] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* Bottom accent image strip */}
        <div className="mt-20 relative w-full aspect-[21/5] rounded-sm overflow-hidden border border-[#1a0f2e]">
          <Image
            src="/ai_sparring.png"
            fill
            alt="Champion Training"
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08050f] via-transparent to-[#08050f]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
            <p className="font-display text-white text-xl sm:text-3xl tracking-widest uppercase text-center">
              Built on <span className="text-gradient-red">Respect. Resilience. Intensity.</span>
            </p>
            <p className="text-[#c4b5d4] text-xs tracking-[0.3em] uppercase">RogueNinja FC — Where Champions Are Forged</p>
          </div>
        </div>

      </div>
    </section>
  );
}
