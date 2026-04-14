"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Gallery",  href: "/gallery" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.25 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
          scrolled
            ? " backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Nav container — max-width matches page sections */}
        <div className="w-full mx-auto sm:px-8 lg:px-32 xl:px-32
                        flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Home" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo.png" alt="Rogue Ninja Fight Club"
              width={160} height={44}
              priority
              className="h-11 sm:h-10 w-auto"
              style={{ filter: "drop-shadow(0 0 10px rgba(200,20,20,.55))" }}
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`relative px-4 lg:px-5 py-[22px] text-[11px] font-medium tracking-[0.22em] uppercase block
                              transition-colors duration-300
                              ${pathname === href ? "text-white" : "text-[#c4b5d4] hover:text-white"}`}
                >
                  {label}
                  {pathname === href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 lg:left-5 right-4 lg:right-5 h-[2px] bg-[#7c3aed] rounded-full"
                      style={{ boxShadow: "0 0 12px rgba(124,58,237,.8)" }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center
                       text-[11px] font-semibold tracking-[0.2em] uppercase
                       px-6 lg:px-7 py-2.5
                       border border-[#cc1a1a] text-white
                       hover:bg-[#cc1a1a] transition-all duration-300
                       hover:shadow-[0_0_24px_rgba(200,20,20,.45)]"
          >
            Join Now
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center gap-[6px] w-12 h-12 items-end z-[60]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[2.5px] w-6 bg-[#cc1a1a] origin-center rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-[2.5px] w-4.5 bg-[#cc1a1a] rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[2.5px] w-6 bg-[#cc1a1a] origin-center rounded-full"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-[#060404]/98 backdrop-blur-2xl"
          >
            <div className="noise-layer absolute inset-0" />
            <div className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: "linear-gradient(90deg,transparent,#7c3aed 40%,#7c3aed 60%,transparent)" }} />

            <div className="h-[68px] flex-shrink-0" />

            <nav className="relative z-10 flex flex-col items-start px-8 pt-10 gap-6 flex-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-display text-[52px] leading-none tracking-widest uppercase block
                                ${pathname === href ? "text-[#9333ea]" : "text-[#d4c5e8] hover:text-white"}`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-6"
              >
                <Link
                  href="/join"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-semibold
                             bg-[#cc1a1a] text-white hover:bg-[#dd2222] transition-all duration-300"
                >
                  Join Now
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="relative z-10 px-8 pb-10 flex items-center justify-between"
            >
              <Image src="/logo.png" alt="" width={120} height={34} className="h-8 w-auto opacity-40" />
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#4a2525]">© 2024 Rogue Ninja</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
