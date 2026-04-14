"use client";

import { useEffect, useRef } from "react";
import ProgramsSection from "@/components/ProgramsSection";
import Image from "next/image";

export default function ProgramsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = {} as gsap.Context;
    const init = async () => {
      try {
        const gsapModule = await import("gsap");
        const gsap = gsapModule.default;
        const ScrollTriggerModule = await import("gsap/ScrollTrigger");
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;
        
        ctx = gsap.context(() => {
          // Cinematic Text Blocks fade & slide up
          gsap.utils.toArray<HTMLElement>(".gta-text-block").forEach((block) => {
            gsap.fromTo(block, 
              { opacity: 0, y: 60 },
              { opacity: 1, y: 0, duration: 1.8, ease: "expo.out",
                scrollTrigger: { trigger: block, start: "top 85%" }
              }
            );
          });

          // Parallax Image Containers
          gsap.utils.toArray<HTMLElement>(".gta-image-container").forEach((container) => {
            const imgWrapper = container.querySelector(".img-wrapper");
            if (imgWrapper) {
              gsap.fromTo(imgWrapper, 
                { y: "-15%" },
                { y: "15%", ease: "none",
                  scrollTrigger: { trigger: container, start: "top bottom", end: "bottom top", scrub: 1 }
                }
              );
            }
          });

          // Package Card Cinematic Reveal
          const packageCard = document.querySelector(".gta-package-card");
          if(packageCard) {
            gsap.fromTo(packageCard,
              { opacity: 0, scale: 0.95, y: 100, rotationX: 10 },
              { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 2, ease: "power4.out", transformOrigin: "bottom center",
                scrollTrigger: { trigger: packageCard, start: "top 90%" }
              }
            );
          }
          
        }, containerRef.current);
      } catch (err) { }
    };
    init();

    return () => {
      if (ctx && typeof ctx.revert === "function") ctx.revert();
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-[#060404] text-white min-h-screen overflow-x-hidden pt-[68px]">
      <ProgramsSection />

      {/* Expanded Program Details Section */}
      <section className="relative py-20 pb-32 px-5 max-w-7xl mx-auto overflow-hidden">
        
        <div className="gta-text-block flex flex-col items-center text-center mb-24 lg:mb-32">
          <h2 className="font-display text-white text-5xl sm:text-6xl lg:text-7xl uppercase tracking-wider">
            Inside the <span className="text-gradient-red">Arena</span>
          </h2>
          <p className="mt-8 text-[#b89090] max-w-2xl text-sm lg:text-[16px] leading-relaxed mx-auto tracking-wide">
            Our curriculum isn't just about throwing punches—it's about mastering the mechanics of the human body under extreme pressure. Discover the meticulous training regimes used by our elite fight squad.
          </p>
        </div>

        {/* Feature 1: Sparring */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          <div className="gta-image-container relative aspect-[4/3] rounded-sm overflow-hidden border border-[#2a0f0f] shadow-[0_0_40px_rgba(204,26,26,0.08)]">
            <div className="img-wrapper absolute inset-0 -top-[20%] h-[140%]">
              <Image src="/ai_sparring.png" fill alt="Live Sparring" className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#060404] to-transparent opacity-90" />
            <div className="absolute bottom-6 left-8 right-8">
               <h4 className="text-2xl font-display text-white tracking-widest uppercase mb-1">Live Combat Application</h4>
               <p className="text-[11px] text-[#cc1a1a] tracking-[0.2em] font-bold uppercase">Weekly Scrimmages & Technical Sparring</p>
            </div>
          </div>
          <div className="gta-text-block flex flex-col gap-6">
            <h3 className="text-3xl lg:text-4xl font-display text-white uppercase tracking-wide">
              The Forge
            </h3>
            <div className="w-12 h-px bg-[#cc1a1a]" />
            <p className="text-[#a07070] text-[15px] leading-loose">
              Drilling builds the system, sparring tests the weapon. We enforce a strictly regulated, high-intensity live sparring culture. You learn to control distance, angle the pocket, and bite down on your mouthpiece when it counts. 
            </p>
            <p className="text-[#a07070] text-[15px] leading-loose">
              Our striking coaches analyze your flow states and identify micro-mistakes before they become habits. You will graduate from predictable routines into dynamic, unpredictable combat mastery.
            </p>
          </div>
        </div>

        {/* Feature 2: S&C */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-10">
          <div className="gta-text-block order-2 md:order-1 flex flex-col gap-6">
            <h3 className="text-3xl lg:text-4xl font-display text-white uppercase tracking-wide">
              Strength & Conditioning
            </h3>
            <div className="w-12 h-px bg-[#cc1a1a]" />
            <p className="text-[#a07070] text-[15px] leading-loose">
              Combat without an engine is a car without gas. We map out full periodization blocks based on active fight camps, ensuring fighters peak directly before walking into the cage.
            </p>
            <ul className="flex flex-col gap-5 mt-4">
              {[
                "Kettlebell & Olympic Lifting",
                "Advanced Plyometrics & Rotational Power",
                "Anaerobic Threshold Protocols",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-[14px] text-[#b89090] uppercase tracking-wider font-semibold">
                  <div className="w-2 h-2 rounded-sm bg-[#cc1a1a] flex-shrink-0 transform rotate-45 shadow-[0_0_10px_rgba(204,26,26,0.8)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="gta-image-container order-1 md:order-2 relative aspect-[4/3] rounded-sm overflow-hidden border border-[#2a0f0f] shadow-[0_0_40px_rgba(204,26,26,0.08)]">
            <div className="img-wrapper absolute inset-0 -top-[20%] h-[140%]">
              <Image src="/ai_kettlebell.png" fill alt="Strength and Conditioning" className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#060404] to-transparent opacity-90" />
            <div className="absolute bottom-6 left-8 right-8">
               <h4 className="text-2xl font-display text-white tracking-widest uppercase mb-1">Combat Athletics</h4>
               <p className="text-[11px] text-[#cc1a1a] tracking-[0.2em] font-bold uppercase">Forging the Unbreakable Body</p>
            </div>
          </div>
        </div>

        {/* Packages Section */}
        <div className="mt-40 w-full max-w-5xl mx-auto perspective-1000">
          <div className="gta-text-block flex flex-col items-center text-center mb-20">
            <h2 className="font-display text-white text-4xl lg:text-5xl uppercase tracking-widest">
              Exclusive <span className="text-gradient-red">Packages</span>
            </h2>
            <div className="w-20 h-px bg-[#cc1a1a] mt-8" />
          </div>

          {/* Pre-Fight Camp Package */}
          <div className="gta-package-card relative group rounded-sm overflow-hidden border border-[#2a0f0f] hover:border-[#cc1a1a]/60 transition-all duration-700 max-w-2xl mx-auto w-full bg-[#0a0505] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(204,26,26,0.15)]">
            <div className="aspect-[16/9] relative w-full border-b border-[#2a0f0f] overflow-hidden">
              <Image src="/ai_pre_fight_camp.png" fill alt="Pre-Fight Camps" className="object-cover transform transition-transform duration-1000 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 800px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0505] via-[rgba(10,5,5,0.2)] to-transparent opacity-100" />
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[9px] tracking-[0.2em] font-bold uppercase px-3 py-1.5 bg-black/80 border border-[#cc1a1a]/40 text-[#cc1a1a] backdrop-blur-sm">
                  RogueNinja: Kickboxing + Strength
                </span>
              </div>
            </div>
            
            <div className="px-6 pb-12 pt-10 sm:px-12 flex flex-col items-center text-center relative z-10 bg-[#0a0505]">
              <div className="absolute top-0 right-4 sm:right-10 transform -translate-y-1/2 z-20">
                 <div className="bg-[#cc1a1a] text-white font-display text-2xl sm:text-3xl px-8 py-3 tracking-widest shadow-[0_10px_30px_rgba(204,26,26,0.5)]" style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}>
                   5999₹
                 </div>
              </div>
              
              <h3 className="text-3xl sm:text-5xl font-display text-white italic tracking-wide uppercase mt-4 mb-2 group-hover:text-[#cc1a1a] transition-all duration-500">
                Pre-Fight Camps
              </h3>
              <p className="text-[#a07070] text-[11px] sm:text-xs tracking-[0.3em] font-bold uppercase mb-10">
                Prepare For Your Next Fight
              </p>
              
              <div className="w-full flex flex-col items-center">
                <h4 className="text-white text-[14px] tracking-[0.1em] font-semibold mb-8 border-b border-[#2a0f0f] pb-4 inline-block px-4 sm:px-8">6 WEEKS OF CAMP LIFE</h4>
                <ul className="flex flex-col gap-5 text-left w-full max-w-sm mx-auto">
                  {[
                    "Conditioning & Strength Training",
                    "Developing Fight Strategy",
                    "Nutrition & Weight Management",
                    "Enhancing Overall Performance"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-5 text-[12px] sm:text-[14px] text-[#b89090] uppercase tracking-wider font-semibold group-hover:text-white transition-colors duration-300">
                      <div className="w-2 h-2 mt-1.5 rounded-sm bg-[#cc1a1a] flex-shrink-0 transform rotate-45 shadow-[0_0_10px_rgba(204,26,26,0.8)]" />
                      <span className="flex-1 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                onClick={() => window.location.href = '/contact'} 
                className="mt-12 px-12 py-5 border border-[#cc1a1a] text-[#cc1a1a] uppercase tracking-widest text-[11px] sm:text-xs font-bold hover:bg-[#cc1a1a] hover:text-white transition-all duration-500 shadow-[0_0_0_inset_rgba(204,26,26,0)] hover:shadow-[0_0_30px_rgba(204,26,26,0.6)]"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
