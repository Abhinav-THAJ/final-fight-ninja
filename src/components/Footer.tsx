"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1e0707] py-10 px-5 sm:px-8 lg:px-12 overflow-hidden bg-[#060404]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Image
          src="/logo.png"
          alt="Rogue Ninja Fight Club"
          width={110}
          height={30}
          className="h-7 w-auto opacity-50 hover:opacity-80 transition-opacity duration-300"
        />
        <div className="flex flex-col items-center gap-1">
          <p className="text-[9px] tracking-[0.25em] uppercase text-[#7a5555]">
            © 2024 Rogue Ninja Fight Club · All rights reserved
          </p>
          <p className="text-[8px] tracking-[0.2em] uppercase text-[#4a3030]">
            Train Like a Fighter. Live Like a Warrior.
          </p>
        </div>
        <div className="flex gap-6">
          {["Instagram", "Facebook", "YouTube"].map(s => (
            <a key={s} href="#"
              className="text-[9px] tracking-[0.2em] uppercase text-[#6a4444] hover:text-[#cc1a1a] transition-colors duration-300">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
