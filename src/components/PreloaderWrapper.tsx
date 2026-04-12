"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues with GSAP
const Preloader = dynamic(() => import("./Preloader"), { ssr: false });

export default function PreloaderWrapper() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Don't show if already loaded in this session
    const hasLoaded = sessionStorage.getItem("rnfc_loaded");
    if (hasLoaded) {
      setShow(false);
      return;
    }

    // Mark as loaded for future navigations within this session
    const handleComplete = () => {
      sessionStorage.setItem("rnfc_loaded", "1");
    };

    // Fallback: hide after 6 seconds no matter what
    const fallback = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("rnfc_loaded", "1");
      document.body.style.overflow = "";
    }, 6000);

    return () => clearTimeout(fallback);
  }, []);

  if (!show) return null;

  return (
    <Preloader
      onComplete={() => {
        setShow(false);
        sessionStorage.setItem("rnfc_loaded", "1");
      }}
    />
  );
}
