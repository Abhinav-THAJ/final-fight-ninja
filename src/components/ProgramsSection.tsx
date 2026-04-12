"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const PROGRAMS = [
  {
    id: "kickboxing",
    title: "Kickboxing Training",
    subtitle: "Strike. Power. Precision.",
    desc: "High-octane striking combinations blending boxing and Muay Thai. Fast, powerful, and devastating — perfect for beginners through elite fighters.",
    image: "/kickboxing_card.png",
    features: ["Striking Technique", "Pad Work", "Sparring Sessions", "Cardio Conditioning"],
    badge: "Most Popular",
  },
  {
    id: "fitness",
    title: "Fitness & Conditioning",
    subtitle: "Forged. Not Born.",
    desc: "Elite-level strength and conditioning protocols designed for combat athletes. Build explosive power, endurance, and an unbreakable body.",
    image: "/fitness_card.png",
    features: ["Strength Training", "HIIT Circuits", "Combat Conditioning", "Recovery Protocols"],
    badge: "Athlete Track",
  },
  {
    id: "camps",
    title: "Special / Summer Camps",
    subtitle: "Champions Start Here.",
    desc: "Intensive training camps for all ages. Weekend warrior programs or full summer immersions — we develop fighters from the ground up.",
    image: "/camp_card.png",
    features: ["All Ages Welcome", "Beginner Friendly", "Expert Coaching", "Small Groups"],
    badge: "Limited Spots",
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
      className="relative py-20 sm:py-28 lg:py-32 xl:py-36 bg-[#090202] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px red-sep" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Heading – centred via flex column */}
        <div ref={headingRef} className="flex flex-col items-center text-center w-full mb-14 lg:mb-20">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#cc1a1a]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#cc6666]">Disciplines</span>
            <div className="w-8 h-px bg-[#cc1a1a]" />
          </div>
          <h2 className="font-display text-white leading-none"
            style={{ fontSize: "clamp(2.8rem,6vw,5rem)", textAlign: "center" }}>
            MASTER EVERY<br />
            <span className="text-gradient-red">ART OF COMBAT</span>
          </h2>
          <p className="mt-4 text-sm lg:text-[15px] text-[#b89090] max-w-xl leading-relaxed" style={{ textAlign:"center" }}>
            Three distinct paths. One destination: excellence. Choose your discipline
            and begin the transformation.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:gap-8">
          {PROGRAMS.map(program => (
            <div key={program.id}
              className="program-card group relative flex flex-col overflow-hidden
                         border border-[#1e0707] hover:border-[#cc1a1a]/60
                         transition-all duration-500"
              style={{ background: "linear-gradient(160deg,#0d0202 0%,#060404 100%)" }}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="text-[8px] tracking-[0.2em] uppercase px-2.5 py-1
                                 bg-[#cc1a1a]/20 border border-[#cc1a1a]/30 text-[#ff9999]">
                  {program.badge}
                </span>
              </div>

              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={program.image} alt={program.title} fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom,rgba(6,4,4,.1) 0%,rgba(6,4,4,.55) 100%)" }} />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-5 lg:p-6 flex-1">
                <div>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-[#cc6666]">{program.subtitle}</span>
                  <h3 className="font-display text-[1.6rem] lg:text-[1.9rem] text-white mt-1
                                 group-hover:text-[#cc1a1a] transition-colors duration-300">
                    {program.title}
                  </h3>
                </div>
                <p className="text-[13px] text-[#a07070] leading-relaxed flex-1">{program.desc}</p>

                <ul className="flex flex-col gap-2 pt-4 border-t border-[#1e0707]">
                  {program.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-[12px] text-[#9a7070]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#cc1a1a] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-2 py-3 text-[10px] tracking-[0.2em] uppercase text-[#b08080]
                             border border-[#1e0707] group-hover:border-[#cc1a1a]
                             group-hover:text-white group-hover:bg-[#cc1a1a]/10
                             transition-all duration-300"
                >
                  Enquire Now
                </button>
              </div>

              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#cc1a1a]
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#cc1a1a]
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#7a5555]">
            All programs include a free first session
          </p>
        </div>
      </div>
    </section>
  );
}
