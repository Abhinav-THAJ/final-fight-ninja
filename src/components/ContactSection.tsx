"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [focused,   setFocused]   = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
          gsap.fromTo(infoRef.current, { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } });
          gsap.fromTo(formRef.current, { x:  50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } });
        }, section);
        return () => ctx.revert();
      } catch { /* silent */ }
    };
    init();
  }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const inputCls = (name: string) =>
    `bg-transparent border px-5 py-4 text-sm text-white w-full outline-none transition-all duration-300 ${
      focused === name ? "border-[#cc1a1a] shadow-[0_0_16px_rgba(204,26,26,.15)]" : "border-[#1e0707]"
    }`;

  return (
    <section id="contact" ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 xl:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse 70% 60% at 50% 50%,rgba(80,0,0,.12) 0%,transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px red-sep" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Heading */}
        <div className="flex flex-col items-center mb-14 lg:mb-16">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#cc1a1a]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#cc6666]">Contact</span>
            <div className="w-8 h-px bg-[#cc1a1a]" />
          </div>
          <h2 className="font-display text-white leading-none w-full"
            style={{ fontSize:"clamp(2.8rem,6vw,5rem)", textAlign:"center" }}>
            BEGIN YOUR<br />
            <span className="text-gradient-red">JOURNEY TODAY</span>
          </h2>
          <p className="mt-4 text-sm lg:text-[15px] text-[#b89090] max-w-md leading-relaxed" style={{ textAlign:"center" }}>
            First class is on us. Walk in as a beginner, leave as a warrior.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24">

          {/* Info */}
          <div ref={infoRef} className="flex flex-col gap-6">
            {[
              { label:"Address", value:"42 Dojo Street, Fight District, City 10001", icon:"📍" },
              { label:"Phone",   value:"+1 (555) 888-NINJA",                          icon:"📞" },
              { label:"Email",   value:"train@rogueninja.com",                         icon:"✉️"  },
              { label:"Hours",   value:"Mon–Sat: 06:00 – 21:00 · Sun: 08:00 – 14:00", icon:"🕐"  },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4 pb-5 border-b border-[#1e0707]">
                <div className="w-10 h-10 flex items-center justify-center text-base flex-shrink-0"
                  style={{ background:"rgba(204,26,26,.08)", border:"1px solid rgba(204,26,26,.2)" }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#cc6666] mb-1">{item.label}</p>
                  <p className="text-sm lg:text-[15px] text-[#b89090]">{item.value}</p>
                </div>
              </div>
            ))}

            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#7a5555] mb-4">Follow Us</p>
              <div className="flex gap-4">
                {["Instagram","Facebook","YouTube"].map(s => (
                  <a key={s} href="#"
                    className="text-[10px] tracking-[0.2em] uppercase py-2.5 px-4 border border-[#1e0707]
                               text-[#a07070] hover:border-[#cc1a1a] hover:text-white transition-all duration-300">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center gap-6 py-16
                            border border-[#1e0707] bg-[#090202]">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-[#cc1a1a]"
                style={{ background:"rgba(204,26,26,.1)", border:"1px solid rgba(204,26,26,.3)", boxShadow:"0 0 30px rgba(204,26,26,.15)" }}>
                ✓
              </div>
              <div>
                <h3 className="font-display text-3xl text-white mb-2">MESSAGE SENT</h3>
                <p className="text-sm text-[#a07070]">We&apos;ll reach out within 24 hours. Get ready, warrior.</p>
              </div>
              <button onClick={() => setSubmitted(false)}
                className="text-[10px] tracking-[0.2em] uppercase text-[#7a5555] hover:text-white transition-colors">
                Send another message
              </button>
            </div>
          ) : (
            <form ref={formRef} id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-[10px] tracking-[0.3em] uppercase text-[#a07070]">
                  Full Name <span className="text-[#cc1a1a]">*</span>
                </label>
                <input id="contact-name" type="text" required placeholder="Your name"
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  className={inputCls("name")} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-phone" className="text-[10px] tracking-[0.3em] uppercase text-[#a07070]">
                  Phone <span className="text-[#cc1a1a]">*</span>
                </label>
                <input id="contact-phone" type="tel" required placeholder="+1 000 000 0000"
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                  className={inputCls("phone")} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-[10px] tracking-[0.3em] uppercase text-[#a07070]">
                  Message
                </label>
                <textarea id="contact-message" rows={5} placeholder="Tell us about your goals…"
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  className={inputCls("message") + " resize-none"} />
              </div>

              <button type="submit" id="contact-submit"
                className="mt-2 py-4 text-[11px] tracking-[0.25em] uppercase font-semibold
                           bg-[#cc1a1a] text-white hover:bg-[#dd2222] transition-all duration-300
                           hover:shadow-[0_0_40px_rgba(200,20,20,.4)]">
                Join Now / Enquire
              </button>
              <p className="text-[9px] text-[#5a3535] tracking-[0.15em]" style={{ textAlign:"center" }}>
                No spam. We only contact about your training.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
