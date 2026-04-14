"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

const GALLERY_IMAGES = [
  { src: "/gallery/img1.jpeg", alt: "Fighter in Action", category: "Combat" },
  { src: "/gallery/img2.jpeg", alt: "Training Session", category: "Training" },
  { src: "/gallery/img3.jpeg", alt: "Championship Moment", category: "Competition" },
  { src: "/gallery/img4.jpeg", alt: "Dojo Strength Work", category: "Strength" },
  { src: "/gallery/img5.jpeg", alt: "Sparring Drills", category: "Combat" },
  { src: "/gallery/img6.jpeg", alt: "Team RogueNinja", category: "Team" },
];




function GalleryCard({
  image,
  index,
  spanClass,
  aspectClass,
  onClick,
}: {
  image: (typeof GALLERY_IMAGES)[0];
  index: number;
  spanClass: string;
  aspectClass: string;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden group h-full ${spanClass} ${aspectClass} rounded-sm border border-[#1e0a0a] cursor-none`}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
    >
      {/* Image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark overlay base */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060404]/80 via-transparent to-transparent" />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-[#cc1a1a]/10 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Scanline on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,26,26,0.03) 2px, rgba(200,26,26,0.03) 4px)",
        }}
      />

      {/* Category tag */}
      <motion.div
        className="absolute top-3 left-3"
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
      >
        <span className="text-[9px] tracking-[0.35em] uppercase bg-[#cc1a1a]/90 text-white px-2 py-1 font-semibold">
          {image.category}
        </span>
      </motion.div>

      {/* Hover info */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4"
        initial={{ opacity: 0, y: 12 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white font-display text-lg uppercase tracking-wider leading-none">
          {image.alt}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-px flex-1 bg-[#cc1a1a]/60" />
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#cc6666]">
            View
          </span>
        </div>
      </motion.div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#cc1a1a]/40" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#cc1a1a]/40" />
    </motion.div>
  );
}

function Lightbox({
  image,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  image: (typeof GALLERY_IMAGES)[0];
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#060404]/95 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Image container */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-[#cc1a1a] z-10" />
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-[#cc1a1a] z-10" />
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-[#cc1a1a] z-10" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-[#cc1a1a] z-10" />

        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060404]/60 to-transparent" />

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="font-display text-2xl text-white uppercase tracking-widest">
              {image.alt}
            </p>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#cc6666]">
              {image.category}
            </span>
          </div>
        </div>

        {/* Counter */}
        <div className="absolute -top-8 right-0 text-[11px] tracking-[0.3em] uppercase text-[#8b7aa0]">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </div>
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center border border-[#1e0707] hover:border-[#cc1a1a] text-[#8b7aa0] hover:text-white transition-all duration-300"
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={onPrev}
        className="absolute left-4 z-20 w-12 h-12 flex items-center justify-center border border-[#1e0707] hover:border-[#cc1a1a] text-[#8b7aa0] hover:text-white transition-all duration-300 group"
        aria-label="Previous"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        className="absolute right-4 z-20 w-12 h-12 flex items-center justify-center border border-[#1e0707] hover:border-[#cc1a1a] text-[#8b7aa0] hover:text-white transition-all duration-300"
        aria-label="Next"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null
    );

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <main className="bg-[#060404] text-white min-h-screen overflow-x-hidden pt-[68px]">
      {/* ── Hero Header ─────────────────────────────────────────────── */}
      <section className="relative py-24 px-5 text-center overflow-hidden">
        {/* Background glow blobs */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[200px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(204,26,26,0.08) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        {/* Noise */}
        <div className="noise-layer absolute inset-0" />
        {/* Scanline */}
        <div className="scanline" />

        <div ref={headerRef} className="relative z-10 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-5"
            initial={{ opacity: 0, y: -16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-px bg-[#cc1a1a]" />
            <span className="text-[10px] tracking-[0.55em] uppercase text-[#cc6666] font-semibold">
              RogueNinja FC
            </span>
            <div className="w-10 h-px bg-[#cc1a1a]" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display text-6xl sm:text-7xl lg:text-[96px] uppercase tracking-wider leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-white">Our </span>
            <span className="text-gradient-red">Gallery</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="mt-6 text-[#b89090] text-sm sm:text-base lg:text-[15px] leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Every image tells a story of sacrifice, discipline, and relentless
            pursuit of excellence. This is what it looks like to forge a
            champion.
          </motion.p>

          {/* Divider */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#cc1a1a]" />
            <div className="w-1.5 h-1.5 bg-[#cc1a1a] rotate-45" />
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#cc1a1a]" />
          </motion.div>
        </div>
      </section>

      {/* ── Gallery Grid ────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 lg:px-16 xl:px-24 pb-28 max-w-7xl mx-auto">
        {/* Count label */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#4a3063]">
            {GALLERY_IMAGES.length} Moments Captured
          </span>
          <div className="flex-1 h-px bg-[#1a0f2e]" />
        </motion.div>

        {/* Row 1: big feature + 2 small stacked */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
          {/* Feature card — spans 2 cols on desktop */}
          <div className="md:col-span-2 h-[340px] md:h-[480px]">
            <GalleryCard image={GALLERY_IMAGES[0]} index={0} spanClass="" aspectClass="" onClick={() => openLightbox(0)} />
          </div>
          {/* 2 stacked small cards: desktop only */}
          <div className="hidden md:flex flex-col gap-4 h-[480px]">
            {[1, 2].map((i) => (
              <div key={i} className="flex-1">
                <GalleryCard image={GALLERY_IMAGES[i]} index={i} spanClass="" aspectClass="" onClick={() => openLightbox(i)} />
              </div>
            ))}
          </div>
          {/* Mobile: show img1 and img2 as rows */}
          {[1, 2].map((i) => (
            <div key={i} className="md:hidden h-[220px]">
              <GalleryCard image={GALLERY_IMAGES[i]} index={i} spanClass="" aspectClass="" onClick={() => openLightbox(i)} />
            </div>
          ))}
        </div>

        {/* Row 2: three equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {[3, 4, 5].map((i) => (
            <div key={i} className="h-[240px] md:h-[300px]">
              <GalleryCard image={GALLERY_IMAGES[i]} index={i} spanClass="" aspectClass="" onClick={() => openLightbox(i)} />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#4a3063]">
            — Rogue Ninja Fight Club · Built by Champions —
          </p>
        </motion.div>
      </section>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            image={GALLERY_IMAGES[lightboxIndex]}
            index={lightboxIndex}
            total={GALLERY_IMAGES.length}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
