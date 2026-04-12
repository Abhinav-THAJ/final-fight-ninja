"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import ContactSection from "@/components/ContactSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

// Dynamically import to avoid SSR issues with GSAP and Lenis
const PreloaderWrapper = dynamic(
  () => import("@/components/PreloaderWrapper"),
  { ssr: false }
);
const SmoothScroll = dynamic(
  () => import("@/components/SmoothScroll"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* Cinematic preloader */}
      <PreloaderWrapper />

      {/* Lenis smooth scroll + GSAP ScrollTrigger integration */}
      <SmoothScroll />

      {/* Main page */}
      <main className="bg-[#060404] text-white min-h-screen overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <CTABanner />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
