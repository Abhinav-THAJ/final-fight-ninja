"use client";

import ContactSection from "@/components/ContactSection";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="bg-[#060404] text-white min-h-screen overflow-x-hidden pt-[68px]">
      
      {/* Immersive Contact Hero Image */}
      {/* <section className="relative w-full h-[40vh] sm:h-[50vh] flex items-center justify-center border-b border-[#1e0707]">
        <div className="absolute inset-0">
           <Image src="/ai_contact_exterior.png" fill alt="Exclusive Fight Club Exterior" className="object-cover" priority sizes="100vw" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#060404] via-[rgba(6,4,4,0.6)] to-[rgba(6,4,4,0.8)]" />
        </div>
        <div className="relative z-10 text-center px-5">
           <h1 className="font-display text-white text-5xl sm:text-6xl lg:text-7xl uppercase tracking-wider">
             Step Into The <span className="text-gradient-red">Underground</span>
           </h1>
           <p className="mt-4 text-[#a07070] tracking-[0.2em] text-xs sm:text-sm uppercase font-semibold">
             We do not accept everyone. Apply for membership.
           </p>
        </div>
      </section> */}

      <ContactSection />

      {/* Atmospheric Footer Content */}
      {/* <section className="relative px-5 max-w-7xl mx-auto py-20 pb-28">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-[#1e0707]">
            <Image src="/ai_contact_gear.png" fill alt="Premium Fight Gear" className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,4,4,0.95)] to-transparent opacity-80" />
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl lg:text-3xl font-display text-white uppercase tracking-wide">
              Prepare For War
            </h3>
            <p className="text-[#a07070] text-sm lg:text-[15px] leading-relaxed">
              Before your first session, our team will reach out to ensure you have all requirements. We rent out elite-grade padding and sparring gear for first-timers, but expect to gear up quickly if you stay.
            </p>
            <div className="flex gap-4 mt-2">
              <button className="px-8 py-3 text-[10px] tracking-[0.2em] uppercase text-[#ff9999] bg-[#cc1a1a]/20 border border-[#cc1a1a]/30 transition-all hover:bg-[#cc1a1a]/40">
                View Gear Requirements
              </button>
            </div>
          </div>
        </div>
      </section> */}

    </main>
  );
}
