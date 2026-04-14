"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const PROGRAMS = [
  {
    id: "kickboxing",
    title: "Kickboxing & Striking",
    subtitle: "Strike. Power. Precision.",
    desc: "High-octane striking combinations blending boxing and Muay Thai. Fast, powerful, and devastating — perfect for beginners through elite fighters. Train under the red neon glow.",
    image: "/ai_kickboxing.png",
    features: ["Striking Technique", "Pad Work", "Sparring Sessions", "Cardio Conditioning"],
    badge: "Most Popular",
  },
  {
    id: "mma",
    title: "Mixed Martial Arts",
    subtitle: "Forged. Not Born.",
    desc: "Elite MMA training. Seamlessly blend striking, wrestling, and ground game. Train in our cinematic, atmospheric dojo to build explosive power, endurance, and an unbreakable body.",
    image: "/forge.jpeg",
    features: ["Caging Drills", "Takedowns", "Combat Conditioning", "Ground & Pound"],
    badge: "Fighter Track",
  },
  {
    id: "bjj",
    title: "Brazilian Jiu Jitsu",
    subtitle: "The Gentle Art. Lethal Outcome.",
    desc: "Master the art of leverage and submissions on the mats. Our black belt instructors will guide you through gi and no-gi grappling in an intense, beautifully lit environment.",
    image: "/ai_bjj.png",
    features: ["Gi & No-Gi", "Submission Wrestling", "Sweeps & Escapes", "Live Rolling"],
    badge: "Essential",
  },
];

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
          gsap.fromTo(headingRef.current, { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: headingRef.current, start: "top 85%" } });
          const cards = cardsRef.current?.querySelectorAll(".program-card");
          if (cards)
            gsap.fromTo(cards, { y: 70, opacity: 0, scale: 0.97 },
              { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.14, ease: "power3.out",
                scrollTrigger: { trigger: cardsRef.current, start: "top 85%" } });
        }, sectionRef.current);
        return () => ctx.revert();
      } catch { /* silent */ }
    };
    init();
  }, []);

  return (
    <section id="programs" ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 xl:py-36 bg-[#0b0719] overflow-hidden min-h-screen">
      <div className="absolute top-0 left-0 right-0 h-px red-sep" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Heading – centred via flex column */}
        <div ref={headingRef} className="flex flex-col items-center text-center w-full mb-14 lg:mb-20">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#7c3aed]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#a78bda]">Disciplines</span>
            <div className="w-8 h-px bg-[#7c3aed]" />
          </div>
          <h2 className="font-display text-white leading-none"
            style={{ fontSize: "clamp(2.8rem,6vw,5rem)", textAlign: "center" }}>
            MASTER EVERY<br />
            <span className="text-gradient-red">ART OF COMBAT</span>
          </h2>
          <p className="mt-4 text-sm lg:text-[15px] text-[#c4b5d4] max-w-4xl leading-relaxed" style={{ textAlign:"center" }}>
            Choose your discipline and begin the transformation.
          </p>
        </div>

        {/* <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:gap-8">
          {PROGRAMS.map(program => (
            <div key={program.id}
              className="program-card group relative flex flex-col overflow-hidden
                         border border-[#1a0f2e] hover:border-[#7c3aed]/60
                         transition-all duration-500"
              style={{ background: "linear-gradient(160deg,#0e0818 0%,#08050f 100%)" }}
            >
              <div className="absolute top-4 right-4 z-10">
                <span className="text-[8px] tracking-[0.2em] uppercase px-2.5 py-1
                                 bg-[#7c3aed]/20 border border-[#7c3aed]/30 text-[#d8b4fe]">
                  {program.badge}
                </span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={program.image} alt={program.title} fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom,rgba(8,5,15,.1) 0%,rgba(8,5,15,.55) 100%)" }} />
              </div>

              <div className="flex flex-col gap-4 p-5 lg:p-6 flex-1">
                <div>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-[#a78bda]">{program.subtitle}</span>
                  <h3 className="font-display text-[1.6rem] lg:text-[1.9rem] text-white mt-1
                                 group-hover:text-[#9333ea] transition-colors duration-300">
                    {program.title}
                  </h3>
                </div>
                <p className="text-[13px] text-[#b09cc0] leading-relaxed flex-1">{program.desc}</p>

                <ul className="flex flex-col gap-2 pt-4 border-t border-[#1a0f2e]">
                  {program.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-[12px] text-[#9d8bba]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => { window.location.href = "/contact"; }}
                  className="mt-2 py-3 text-[10px] tracking-[0.2em] uppercase text-[#b09cc0]
                             border border-[#1a0f2e] group-hover:border-[#7c3aed]
                             group-hover:text-white group-hover:bg-[#7c3aed]/10
                             transition-all duration-300"
                >
                  Enquire Now
                </button>
              </div>

              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#7c3aed]
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#7c3aed]
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#6b5a8e]">
            All programs include a free first session
          </p>
        </div> */}
      </div>
    </section>
  );
}
