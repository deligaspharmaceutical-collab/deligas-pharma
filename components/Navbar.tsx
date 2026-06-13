"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SunIcon, MoonIcon } from "@/components/icons";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check theme status on mount safely
    const isDarkTheme = document.documentElement.classList.contains("dark");
    setIsDark(isDarkTheme);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-7xl z-[100] flex items-center justify-between px-6 py-1.5 bg-nav-bg backdrop-blur-md border border-nav-border shadow-nav-shadow rounded-full pointer-events-auto transition-all duration-300">
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
            <span className="text-[6.875px] sm:text-[8.125px] text-nav-brand-text mt-0.5 pl-[0.15em] tracking-[1.6em] transition-colors duration-300">
              PHARMA
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links (Hidden on mobile, placeholder for navbar utility) */}
      <div className="hidden md:flex items-center gap-8 pointer-events-auto font-alata font-normal text-sm tracking-wide text-nav-text">
        <Link
          href="/products"
          className="hover:text-nav-text-hover transition-colors duration-300"
        >
          Products
        </Link>
        <Link
          href="#about"
          className="hover:text-nav-text-hover transition-colors duration-300"
        >
          About
        </Link>
        <Link
          href="#quality"
          className="hover:text-nav-text-hover transition-colors duration-300"
        >
          Quality
        </Link>
        <Link
          href="#contact"
          className="hover:text-nav-text-hover transition-colors duration-300"
        >
          Contact
        </Link>
      </div>

      {/* Theme toggle button on the far right */}
      <div className="flex items-center pointer-events-auto">
        <button
          onClick={toggleTheme}
          className="p-2.5 border border-nav-border rounded-xl bg-nav-bg text-nav-text shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-nav-text hover:text-background hover:shadow-md cursor-pointer"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </button>
      </div>
    </nav>
  );
}
