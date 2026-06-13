"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Scroll smoothly back to top
  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // GSAP Entrance ScrollTrigger Animation
  useGSAP(
    () => {
      if (!footerRef.current) return;

      const elements = gsap.utils.toArray<HTMLElement>(".footer-fade-item");

      gsap.fromTo(
        elements,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-7xl mx-auto mb-8 bg-card-bg/20 backdrop-blur-2xl border border-card-border/40 py-12 sm:py-16 px-6 sm:px-12 mt-20 overflow-hidden transition-all duration-300 rounded-[2.5rem] shadow-xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Glow highlight line on top edge */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3da0b9]/30 to-transparent" />

      {/* Decorative subtle background gradient glows */}
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#3da0b9]/3 blur-[120px] pointer-events-none select-none" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-[#018087]/3 blur-[120px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-card-border/40">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start footer-fade-item">
            <Link href="/" className="flex items-center gap-3.5 group mb-5">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none">
                <Image
                  src="/logo/deligas-pharma-logo-without-text.png"
                  alt="Deligas Pharma Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col font-heading leading-none select-none">
                <span className="text-2xl font-black tracking-wide text-[#3da0b9]">
                  DELIGAS
                </span>
                <span className="text-[9px] text-card-text-muted mt-0.5 pl-[0.15em] tracking-[1.6em] transition-colors duration-300">
                  PHARMA
                </span>
              </div>
            </Link>

            <p className="font-sans text-sm leading-relaxed text-card-text-muted/90 max-w-sm mb-6">
              Delivering trusted pharmaceutical solutions with quality, safety, and care.
              Your reliable partner in health and wellness. Dedicated to absolute purity
              and professional-grade standards.
            </p>

            {/* Premium Quality Standard Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-badge-bg/50 border border-badge-border text-[10px] font-heading font-bold uppercase tracking-wider text-[#3da0b9] select-none mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3da0b9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3da0b9]"></span>
              </span>
              GMP Certified &bull; USP Grade
            </div>

            {/* Social Icons Grid */}
            <div className="flex items-center gap-3">
              {[
                { name: "Instagram", href: "#", svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /> },
                { name: "LinkedIn", href: "#", svg: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /> },
                { name: "Twitter", href: "#", svg: <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /> }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group flex items-center justify-center w-9 h-9 rounded-xl border border-card-border bg-card-bg/50 text-card-text-muted hover:text-[#3da0b9] hover:border-[#3da0b9]/40 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(61,160,185,0.15)] transition-all duration-300 cursor-pointer"
                  title={social.name}
                >
                  <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {social.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 flex flex-col items-start lg:pl-10 footer-fade-item">
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-6 select-none relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-8 after:bg-[#3da0b9]">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-4 font-sans text-sm text-card-text-muted">
              {["Home", "About Us", "Products", "Contact Us"].map((link) => {
                const href =
                  link === "Home" ? "/" :
                    link === "Products" ? "/products" :
                      link === "About Us" ? "#about" : "#contact";

                return (
                  <li key={link}>
                    <Link
                      href={href}
                      className="group relative inline-flex items-center text-card-text-muted hover:text-[#3da0b9] font-medium transition-colors duration-300"
                    >
                      <span>{link}</span>
                      {/* Underline expanding on hover */}
                      <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-[#3da0b9] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact Details (Turned into modern cards) */}
          <div className="lg:col-span-5 flex flex-col items-start footer-fade-item">
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-6 select-none relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-8 after:bg-[#3da0b9]">
              Contact Details
            </h3>
            <div className="grid grid-cols-1 gap-4 w-full">
              {/* Email Card */}
              <a
                href="mailto:sales@deligaspharma.com"
                className="group flex items-start gap-4 p-4 rounded-2xl border border-card-border/60 bg-card-bg/40 hover:bg-card-bg/85 hover:border-[#3da0b9]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(61,160,185,0.06)] transition-all duration-300"
              >
                <div className="p-2.5 rounded-xl bg-badge-bg border border-badge-border text-[#3da0b9] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4.5 h-4.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#3da0b9]">Email Inquiry</span>
                  <span className="mt-1 text-sm text-card-text font-semibold transition-colors duration-300">sales@deligaspharma.com</span>
                </div>
              </a>

              {/* Manufacturing Address Card */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl border border-card-border/60 bg-card-bg/40 hover:bg-card-bg/85 hover:border-[#3da0b9]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(61,160,185,0.06)] transition-all duration-300">
                <div className="p-2.5 rounded-xl bg-badge-bg border border-badge-border text-[#3da0b9] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4.5 h-4.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#3da0b9]">Manufactured by</span>
                  <span className="mt-1 text-sm leading-relaxed text-card-text font-medium transition-colors duration-300">
                    Deligas Pharma GmbH Friedrichstraße 68,<br />
                    10117 Berlin, Germany
                  </span>
                </div>
              </div>

              {/* Marketing & Distribution Card */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl border border-card-border/60 bg-card-bg/40 hover:bg-card-bg/85 hover:border-[#3da0b9]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(61,160,185,0.06)] transition-all duration-300">
                <div className="p-2.5 rounded-xl bg-badge-bg border border-badge-border text-[#3da0b9] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4.5 h-4.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5-1.5-3-1m-3.102-5.23L9.75 4M2.25 9v12m0-12 3-1m1.5 5.5V21" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#3da0b9]">Marketed & Distributed by</span>
                  <span className="mt-1 text-sm leading-relaxed text-card-text font-medium transition-colors duration-300">
                    Apexor Trading W.L.L. Doha, Qatar<br />
                    P.O. Box: 22456
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 mt-8 gap-4 footer-fade-item">
          <p className="font-sans text-xs text-card-text-muted/80 text-center sm:text-left select-none transition-colors duration-300">
            Copyright &copy; 2026 All Rights Reserved <span className="font-semibold text-[#3da0b9]">Deligas Pharma</span>
          </p>

          {/* Elegant Back to Top Button with Glow */}
          <button
            onClick={handleScrollToTop}
            className="group flex items-center justify-center p-3.5 rounded-full bg-gradient-to-r from-[#3da0b9] to-[#018087] hover:from-[#3da0b9] hover:to-[#028b9f] text-white hover:scale-110 active:scale-95 shadow-[0_8px_20px_rgba(61,160,185,0.25)] hover:shadow-[0_8px_25px_rgba(61,160,185,0.4)] border-none transition-all duration-300 cursor-pointer"
            title="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
