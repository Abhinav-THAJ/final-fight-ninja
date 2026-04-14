"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const athletes = [
  {
    id: "athlete-1",
    name: "ABHIRAMI GS",
    subtitle: "National-Level Kickboxing Champion",
    image: "/athlete1.jpg",
    imagePosition: "center 25%",
    achievements: [
      "WAKO India Kickboxing National Championship 2025 – Gold Medal",
      "WAKO India Kickboxing National Championship 2024 – Bronze Medal",
      "KHELO India Kickboxing South Championship – Silver Medal",
      "Open National Pro Kickboxing Championship 2025 – Silver Medal",
      "3× Inter-University Wushu National Participant",
    ],
    description: "A dedicated and accomplished martial artist with consistent national-level performance, representing discipline, strength, and competitive excellence.",
  },
  {
    id: "athlete-2",
    name: "JIBIN BABU TV",
    subtitle: "Striking MMA & Muay Thai Champion",
    image: "/athlete2.jpg",
    imagePosition: "center 15%",
    achievements: [
      "2× Striking MMA State Championship – Gold Medal",
      "Muay Thai State Championship – Gold Medal",
      "School Games & University Games Wushu Champion",
    ],
    description: "A versatile fighter excelling in MMA, Muay Thai, and Wushu, known for powerful striking and competitive dominance.",
  },
  {
    id: "athlete-3",
    name: "SACHIN BS",
    subtitle: "Kickboxing & Wushu Champion",
    image: "/athlete3.jpg",
    imagePosition: "center 70%",
    achievements: [
      "Kickboxing National Medalist",
      "All India Wushu Player",
      "4× Intercollege Wushu Champion",
      "State Wushu & Kickboxing Champion",
    ],
    description: "A dynamic athlete with multiple championship titles, showcasing consistency, strength, and high-level competitive experience.",
  }
];

export default function AthletesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll(".athlete-card");

        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      } catch (err) {
        // silent
      }
    };
    init();
  }, []);

  return (
    <section id="athletes" className="relative py-24 lg:py-32 bg-[#060404] overflow-hidden">
      
      {/* Background Textures */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#cc1a1a] opacity-[0.03] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#7c3aed] opacity-[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wider mb-4">
            Elite <span className="text-[#cc1a1a]">Warriors</span>
          </h2>
          <div className="w-16 h-1 bg-[#cc1a1a] mx-auto mb-6 shadow-[0_0_15px_rgba(204,26,26,0.5)]" />
          <p className="text-[#c4b5d4] text-sm lg:text-base tracking-[0.08em] max-w-2xl mx-auto">
            Meet the coaches who shape fighters, sharpen skills, and build winning mindsets.          
          </p>
        </div>

        {/* Athletes Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {athletes.map((athlete) => (
            <div key={athlete.id} className="athlete-card group flex flex-col bg-[#0b0811] border border-[#1a0f2e] overflow-hidden rounded-2xl transition-all duration-500 hover:border-[#4a2e8c] hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] w-full max-w-[340px] mx-auto">
              
              {/* Image Container with Zoom effect */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#110b1a]">
                <Image
                  src={athlete.image}
                  alt={athlete.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0811] via-transparent to-transparent opacity-90" />
              </div>

              {/* Content Container */}
              <div className="p-5 flex flex-col flex-grow relative">
                {/* Name & Subtitle */}
                <div className="mb-4">
                  <h3 className="font-display text-xl lg:text-2xl text-white tracking-widest uppercase mb-0.5 drop-shadow-md">
                    {athlete.name}
                  </h3>
                  <p className="text-[#cc1a1a] text-[9.5px] tracking-[0.2em] font-semibold uppercase">
                    {athlete.subtitle}
                  </p>
                </div>

                {/* Achievements */}
                <div className="mb-4 flex-grow">
                  <h4 className="text-[#ffffff] text-[8.5px] tracking-[0.15em] uppercase border-b border-[#1a0f2e] pb-1.5 mb-2.5">
                    Career Highlights
                  </h4>
                  <ul className="space-y-1.5">
                    {athlete.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#cc1a1a] mt-[2px] leading-none text-xs">✦</span>
                        <span className="text-[#c4b5d4] text-xs leading-relaxed font-light">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Description */}
                <div className="border-t border-[#1a0f2e] pt-5 mt-auto">
                  <p className="text-[#8b79a5] text-sm leading-relaxed italic font-light">
                    &quot;{athlete.description}&quot;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
