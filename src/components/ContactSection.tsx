"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const LOCATIONS = [
  {
    id: "loc1",
    name: "Greenfield Stadium",
    address: "Travancore International Convention Centre, Greenfield International Stadium, Trivandrum B1, Thiruvananthapuram, Kerala 695581",
    mapUrl: "https://maps.app.goo.gl/cy8rrgsP9P9gbr2s9",
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.2!2d76.8855372!3d8.5728398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bfa288af49d7%3A0xbd95ab45ce4cb2bb!2sROGUENINJA%20FIGHT%20CLUB!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  {
    id: "loc2",
    name: "Sasthamangalam",
    address: "4th Floor, Sharmees Tower, Sasthamangalam Maruthankuzhi Rd, Sasthamangalam, Thiruvananthapuram, Kerala 695010",
    mapUrl: "https://maps.app.goo.gl/tnZSuxwQGRMtw2xn7",
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.8!2d76.9719408!3d8.5133368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb00217bf493%3A0x6b827fadead4b99d!2sROGUENINJA%20FIGHT%20CLUB!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin",
  },
  {
    id: "loc3",
    name: "Perumkadavila",
    address: "Venkateshwara Towers, Amaravila - Perumkadavila Rd, Perumkadavila, Kerala 695124",
    mapUrl: "https://maps.app.goo.gl/DCRe6oBukgsenB9UA",
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.5!2d77.1091048!3d8.4381515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05ad00010a1c51%3A0xc2d4760d80cd438!2sROGUENINJA%20FIGHT%20CLUB!5e0!3m2!1sen!2sin!4v1700000000002!5m2!1sen!2sin",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);
  const [submitted,  setSubmitted] = useState(false);
  const [focused,    setFocused]   = useState<string | null>(null);
  const [activeMap,  setActiveMap] = useState(0);

  const [formData, setFormData] = useState({ name: "", phone: "", branch: "", message: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

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
            { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 80%" } });
          gsap.fromTo(formRef.current, { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 80%" } });
        }, section);
        return () => ctx.revert();
      } catch { /* silent */ }
    };
    init();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const branchLabel = formData.branch
      ? { loc1: "Greenfield Stadium", loc2: "Sasthamangalam", loc3: "Perumkadavila" }[formData.branch] ?? formData.branch
      : "Not specified";
    const text = [
      "*🥋 New Enquiry — RogueNinja FC*",
      "",
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
      `*Preferred Branch:* ${branchLabel}`,
      formData.message ? `*Message:* ${formData.message}` : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/919048564432?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  const inputCls = (name: string) =>
    `bg-transparent border px-5 py-4 text-sm text-white w-full outline-none transition-all duration-300 ${
      focused === name
        ? "border-[#cc1a1a] shadow-[0_0_16px_rgba(204,26,26,.15)]"
        : "border-[#1e0707]"
    }`;

  return (
    <section id="contact" ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 xl:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(60,20,120,.12) 0%,transparent 70%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px red-sep" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* ── Heading ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center mb-14 lg:mb-16">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#7c3aed]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#a78bda]">Contact</span>
            <div className="w-8 h-px bg-[#7c3aed]" />
          </div>
          <h2 className="font-display text-white leading-none w-full"
            style={{ fontSize: "clamp(2.8rem,6vw,5rem)", textAlign: "center" }}>
            BEGIN YOUR<br />
            <span className="text-gradient-red">JOURNEY TODAY</span>
          </h2>
          <p className="mt-4 text-sm lg:text-[15px] text-[#c4b5d4] max-w-md leading-relaxed"
            style={{ textAlign: "center" }}>
            First class is on us. Walk in as a beginner, leave as a warrior.
          </p>
        </div>

        {/* ── Two-column grid ─────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24">

          {/* LEFT — Info + Maps */}
          <div ref={infoRef} className="flex flex-col gap-6">

            {/* Contact details */}
            {[
              { label: "Phone", value: "+91 73563 30770  ·  +91 90485 64432", icon: faPhone },
              { label: "Email", value: "rogueninjafc@gmail.com", icon: faEnvelope },
              { label: "Hours", value: "Mon–Sat: 06:00 – 21:00 · Sun: 08:00 – 14:00", icon: faClock },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4 pb-5 border-b border-[#1e0707]">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)" }}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-[#7c3aed]"
                    style={{
                      width: "16px",
                      height: "16px",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#a78bda] mb-1">{item.label}</p>
                  <p className="text-sm lg:text-[15px] text-[#c4b5d4]">{item.value}</p>
                </div>
              </div>
            ))}

            {/* ── Location tabs ──────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <p className="text-[12px] tracking-[0.35em] uppercase text-[#6b5a8e]">Our Branches</p>
              </div>

              {/* Tab buttons */}
              <div className="grid grid-cols-3 gap-2">
                {LOCATIONS.map((loc, i) => (
                  <button
                    key={loc.id}
                    onClick={() => setActiveMap(i)}
                    className={`py-2.5 px-2 text-[9px] tracking-[0.12em] uppercase font-semibold leading-tight
                                transition-all duration-300 text-center
                                ${activeMap === i
                                  ? "bg-[#7c3aed] text-white"
                                  : "border border-[#1a0f2e] text-[#8b7aa0] hover:border-[#7c3aed]/40 hover:text-white"}`}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>

              {/* Address badge */}
              <div className="flex items-start gap-3 p-4 border border-[#1a0f2e] bg-[#0e0818]">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="flex-shrink-0 mt-0.5"
                  style={{
                    width: "14px",
                    height: "14px",
                    background: "linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                />
                <p className="text-[12px] text-[#9d8bba] leading-relaxed">{LOCATIONS[activeMap].address}</p>
              </div>

              {/* Map iframe — grayscale / dark tinted */}
              <div className="relative w-full overflow-hidden border border-[#1a0f2e]"
                style={{ height: "240px" }}>
                <div className="absolute inset-0 pointer-events-none z-10"
                  style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,.6)" }} />
                <iframe
                  key={activeMap}
                  src={LOCATIONS[activeMap].embedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(1) brightness(0.65) contrast(1.15)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`ROGUENINJA FIGHT CLUB — ${LOCATIONS[activeMap].name}`}
                />
              </div>

              {/* Open in Maps link */}
              <a
                href={LOCATIONS[activeMap].mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start
                           text-[10px] tracking-[0.2em] uppercase text-[#cc6666]
                           hover:text-white transition-colors duration-300 group"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:scale-110 transition-transform duration-200">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Get Directions — {LOCATIONS[activeMap].name}
              </a>
            </div>

            {/* Social */}
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#6b5a8e] mb-4">Follow Us</p>
              <div className="flex gap-4">
                {["Instagram", "Facebook", "YouTube"].map(s => (
                  <a key={s} href="#"
                    className="text-[10px] tracking-[0.2em] uppercase py-2.5 px-4 border border-[#1a0f2e]
                               text-[#9d8bba] hover:border-[#7c3aed] hover:text-white transition-all duration-300">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center gap-6 py-16
                            border border-[#1e0707] bg-[#090202]">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-[#cc1a1a]"
                style={{ background: "rgba(204,26,26,.1)", border: "1px solid rgba(204,26,26,.3)", boxShadow: "0 0 30px rgba(204,26,26,.15)" }}>
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
                <input id="contact-name" name="name" type="text" required placeholder="Your name"
                  value={formData.name} onChange={handleChange}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  className={inputCls("name")} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-phone" className="text-[10px] tracking-[0.3em] uppercase text-[#a07070]">
                  Phone <span className="text-[#cc1a1a]">*</span>
                </label>
                <input id="contact-phone" name="phone" type="tel" required placeholder="+91 00000 00000"
                  value={formData.phone} onChange={handleChange}
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                  className={inputCls("phone")} />
              </div>

              {/* Branch preference */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-branch" className="text-[10px] tracking-[0.3em] uppercase text-[#a07070]">
                  Preferred Branch
                </label>
                <select id="contact-branch" name="branch"
                  value={formData.branch} onChange={handleChange}
                  onFocus={() => setFocused("branch")} onBlur={() => setFocused(null)}
                  className={inputCls("branch")} style={{ backgroundImage: "none" }}>
                  <option value="" className="bg-[#0d0202]">Select a branch…</option>
                  {LOCATIONS.map(l => (
                    <option key={l.id} value={l.id} className="bg-[#0d0202]">{l.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-[10px] tracking-[0.3em] uppercase text-[#a07070]">
                  Message
                </label>
                <textarea id="contact-message" name="message" rows={5} placeholder="Tell us about your goals…"
                  value={formData.message} onChange={handleChange}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  className={inputCls("message") + " resize-none"} />
              </div>

              <button type="submit" id="contact-submit"
                className="mt-2 py-4 text-[11px] tracking-[0.25em] uppercase font-semibold
                           bg-[#cc1a1a] text-white hover:bg-[#dd2222] transition-all duration-300
                           hover:shadow-[0_0_40px_rgba(200,20,20,.4)]">
                Join Now / Enquire
              </button>
              <p className="text-[9px] text-[#5a3535] tracking-[0.15em]" style={{ textAlign: "center" }}>
                No spam. We only contact about your training.
              </p>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
