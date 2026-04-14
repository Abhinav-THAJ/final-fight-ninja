"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High performance motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Primary smooth spring for lagging effect
  const springConfig = { damping: 25, stiffness: 450, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Secondary spring for trail 1
  const springTrail1 = { damping: 30, stiffness: 300, mass: 0.8 };
  const trail1X = useSpring(cursorX, springTrail1);
  const trail1Y = useSpring(cursorY, springTrail1);

  // Tertiary spring for trail 2
  const springTrail2 = { damping: 40, stiffness: 200, mass: 1.2 };
  const trail2X = useSpring(cursorX, springTrail2);
  const trail2Y = useSpring(cursorY, springTrail2);

  // Velocity tracking for movement animation
  const velocityX = useVelocity(smoothX);
  
  // Transform velocity into rotation (-45 deg when moving fast left, 45 deg when moving fast right)
  const rotationTransform = useTransform(velocityX, [-1500, 0, 1500], [-40, 0, 40]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12); // Offset to center the shuriken
      cursorY.set(e.clientY - 12);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest("a, button, input, [role='button']")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail 2 */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: trail2X, y: trail2Y, rotate: rotationTransform }}
        animate={{ opacity: isHovering || isClicking ? 0 : 0.2, scale: 0.6 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#cc1a1a"/>
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="#ff6666" strokeWidth="0.5" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="2" fill="#ff3333"/>
        </svg>
      </motion.div>

      {/* Trail 1 */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: trail1X, y: trail1Y, rotate: rotationTransform }}
        animate={{ opacity: isHovering || isClicking ? 0 : 0.4, scale: 0.8 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#cc1a1a"/>
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="#ff6666" strokeWidth="0.5" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="2" fill="#ff3333"/>
        </svg>
      </motion.div>

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center transition-shadow duration-300"
        style={{
          x: smoothX,
          y: smoothY,
          rotate: rotationTransform,
          filter: isHovering ? "drop-shadow(0 0 16px rgba(230,40,40,0.9))" : "drop-shadow(0 0 12px rgba(204,26,26,0.65))"
        }}
        animate={{
          scale: isClicking ? 0.7 : (isHovering ? 1.25 : 1),
          // Override rotation specifically on click for a "punch" tilt
          rotate: isClicking ? -25 : undefined,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 20 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill={isHovering ? "#ff3333" : "#cc1a1a"} fillOpacity={isHovering ? "0.9" : "0.7"}/>
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke={isHovering ? "#ff6666" : "#ff4444"} strokeWidth="0.8" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="2.2" fill={isHovering ? "#ffffff" : "#ff6666"}/>
        </svg>
      </motion.div>
    </>
  );
}
