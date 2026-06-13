"use client";
import Image from "next/image";
import Link from "next/link";
import { SunIcon } from "@/components/icons";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-7xl z-[100] flex items-center justify-between px-6 py-1.5 bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-full pointer-events-auto transition-all duration-300">
      {/* Brand Logo & Text (Matches final position of loader logo/text) */}
      <div className="flex items-center">
        <Link id="navbar-brand-target" href="/" className="flex items-center gap-2.5 sm:gap-4 group">
          <div className="relative w-10 h-10 sm:w-15 sm:h-15 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo/deligas-pharma-logo-without-text.png"
              alt="Deligas Pharma Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div
            className="flex flex-col font-heading leading-none select-none"
          >
            <span className="text-[18.75px] sm:text-[22.5px] font-black tracking-wide text-[#3da0b9] ">
              DELIGAS
            </span>
            <span className="text-[6.875px] sm:text-[8.125px] text-zinc-950 mt-0.5 pl-[0.15em] tracking-[1.6em]">
              PHARMA
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links (Hidden on mobile, placeholder for navbar utility) */}
      <div className="hidden md:flex items-center gap-8 pointer-events-auto font-alata font-normal text-sm tracking-wide text-zinc-700">
        <Link
          href="#products"
          className="hover:text-zinc-950 transition-colors duration-300"
        >
          Products
        </Link>
        <Link
          href="#about"
          className="hover:text-zinc-950 transition-colors duration-300"
        >
          About
        </Link>
        <Link
          href="#quality"
          className="hover:text-zinc-950 transition-colors duration-300"
        >
          Quality
        </Link>
        <Link
          href="#contact"
          className="hover:text-zinc-950 transition-colors duration-300"
        >
          Contact
        </Link>
      </div>

      {/* SunIcon light mode button on the far right */}
      <div className="flex items-center pointer-events-auto">
        <div
          className="p-2.5 border border-zinc-200/80 rounded-xl bg-white/50 text-zinc-800 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-md cursor-help"
          title="Light Mode Enabled"
        >
          <SunIcon size={16} />
        </div>
      </div>
    </nav>
  );
}
