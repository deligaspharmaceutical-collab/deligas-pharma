"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-8 py-6 pointer-events-none">
      {/* Brand Logo & Text (Matches final position of loader logo/text) */}
      <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
        <Link href="/" className="flex items-center gap-4 sm:gap-6 group">
          <div className="relative w-10 h-10 sm:w-15 sm:h-15 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo/deligas-pharma-logo-without-text.png"
              alt="Deligas Pharma Logo"
              fill
              className="object-contain"
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
      <div className="hidden md:flex items-center gap-8 pointer-events-auto font-alata font-normal text-sm tracking-wide text-zinc-600">
        <Link
          href="#products"
          className="hover:text-zinc-900 transition-colors duration-300"
        >
          Products
        </Link>
        <Link
          href="#about"
          className="hover:text-zinc-900 transition-colors duration-300"
        >
          About
        </Link>
        <Link
          href="#quality"
          className="hover:text-zinc-900 transition-colors duration-300"
        >
          Quality
        </Link>
        <Link
          href="#contact"
          className="bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 px-5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 hover:shadow-lg"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
