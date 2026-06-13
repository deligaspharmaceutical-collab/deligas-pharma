"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

// Define the product details structure
interface Product {
  name: string;
  chemical: string;
  desc: string;
  image: string;
  color: string;
  dosage: string;
  purity: string;
  halfLife: string;
}

const products: Product[] = [
  {
    name: "BOLDENONE 300",
    chemical: "Boldenone Undecylenate",
    desc: "Engineered for superior nitrogen retention and muscle hardness. Promotes lean, high-quality vascular gains with long-lasting strength performance.",
    image: "/products/boldi.png",
    color: "#018087",
    dosage: "300 mg/ml",
    purity: "99.4%",
    halfLife: "14 Days",
  },
  {
    name: "CUT-MIX 150",
    chemical: "Drostanolone / Trenbolone / Testosterone",
    desc: "A powerful synergistic blend designed for rapid fat loss and competitive conditioning. Amplifies vascularity, definition, and raw athletic power.",
    image: "/products/cut-mix.png",
    color: "#028B9F",
    dosage: "150 mg/ml",
    purity: "99.1%",
    halfLife: "3-4 Days",
  },
  {
    name: "DECA 300",
    chemical: "Nandrolone Decanoate",
    desc: "The gold standard for off-season bulk and joint support. Enhances collagen synthesis, deep cellular recovery, and exceptional muscular mass.",
    image: "/products/deca.png",
    color: "#76A7C9",
    dosage: "300 mg/ml",
    purity: "99.6%",
    halfLife: "15 Days",
  },
  {
    name: "BOLDI SHORT",
    chemical: "Boldenone Acetate",
    desc: "A rapid-acting variant of Boldenone designed for immediate protein synthesis and vascular density. Ideal for high-tempo conditioning cycles.",
    image: "/products/boldi.png",
    color: "#0295B4",
    dosage: "100 mg/ml",
    purity: "99.3%",
    halfLife: "3 Days",
  },
  {
    name: "NPP 100",
    chemical: "Nandrolone Phenylpropionate",
    desc: "Fast-acting Nandrolone for quick gains and joint recovery without long-term water retention. Highly versatile for both cutting and bulking.",
    image: "/products/deca.png",
    color: "#017F89",
    dosage: "100 mg/ml",
    purity: "99.5%",
    halfLife: "4.5 Days",
  },
];

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lenis = useLenis();

  // Scroll smoothly to a specific product slide
  const handleDotClick = (index: number) => {
    if (lenis && containerRef.current) {
      const start = containerRef.current.offsetTop;
      const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
      const targetScroll = start + (index / (products.length - 1)) * totalScroll;
      lenis.scrollTo(targetScroll, { duration: 1.5 });
    }
  };

  // Scroll smoothly to the catalogue section below the showcase
  const handleSeeAllClick = () => {
    if (lenis) {
      lenis.scrollTo("#catalogue-section", { duration: 1.5 });
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current || !bgRef.current) return;

      const bottles = gsap.utils.toArray<HTMLElement>(".product-bottle");
      const textBlocks = gsap.utils.toArray<HTMLElement>(".product-text-block");

      // Set initial states
      gsap.set(bottles, { scale: 0.25, opacity: 0, rotation: -20 });
      gsap.set(textBlocks, { opacity: 0, y: 40 });

      // First item active
      gsap.set(bottles[0], { scale: 1, opacity: 1, rotation: 0 });
      gsap.set(textBlocks[0], { opacity: 1, y: 0 });

      // Create main ScrollTriggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const rawProgress = self.progress;
            const targetIndex = Math.round(rawProgress * (products.length - 1));
            setActiveIndex(targetIndex);
          },
        },
      });

      // Orchestrate slide transitions
      products.forEach((_, i) => {
        if (i === products.length - 1) return;

        const currentBottle = bottles[i];
        const nextBottle = bottles[i + 1];
        const currentText = textBlocks[i];
        const nextText = textBlocks[i + 1];
        const nextColor = products[i + 1].color;

        // Timeline marker
        const label = `slide-${i}`;

        // 1. Fade/Shrink current slide out
        tl.to(
          currentBottle,
          {
            scale: 0.25,
            opacity: 0,
            rotation: 15,
            duration: 0.4,
            ease: "power2.inOut",
          },
          label
        )
          .to(
            currentText,
            {
              opacity: 0,
              y: -40,
              duration: 0.4,
              ease: "power2.inOut",
            },
            label
          )

          // 2. Morph background color
          .to(
            bgRef.current,
            {
              backgroundColor: nextColor,
              duration: 0.5,
              ease: "power1.inOut",
            },
            `${label}+=0.2`
          )

          // 3. Zoom/Fade next slide in (Small to Big)
          .to(
            nextBottle,
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            `${label}+=0.4`
          )
          .to(
            nextText,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            `${label}+=0.4`
          );
      });



      // Continuous floating effect on active bottle container
      gsap.to(".float-wrapper", {
        y: -12,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  const activeProduct = products[activeIndex] || products[0];

  return (
    <div
      ref={containerRef}
      id="products"
      className="relative h-[500vh] w-full bg-background z-10"
    >
      {/* Pinned Screen Viewport */}
      <div className="sticky top-0 left-0 h-screen w-full flex flex-col justify-between p-8 sm:p-12 overflow-hidden text-white">

        {/* Animated Background layer */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-[#018087] z-0 transition-colors duration-500"
        />



        {/* Top Header Placeholder (To align layout with fixed navbar) */}
        <div className="h-24 sm:h-32 z-10 select-none pointer-events-none" />

        {/* Interactive Layout Content Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between my-auto w-full z-10 max-w-7xl mx-auto px-4">

          {/* Left Column: Product Details Stack */}
          <div className="md:col-span-3 flex items-center min-h-[300px] relative">
            {products.map((product, index) => (
              <div
                key={index}
                className="product-text-block absolute top-0 left-0 w-full flex flex-col pointer-events-none select-none"
                style={{
                  pointerEvents: activeIndex === index ? "auto" : "none",
                  userSelect: activeIndex === index ? "auto" : "none",
                }}
              >
                <span className="font-alata font-semibold tracking-widest text-xs sm:text-sm text-white/80 mb-2 uppercase">
                  {product.chemical}
                </span>
                <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight uppercase mb-4 text-white font-outfit">
                  {product.name}
                </h2>
                <p className="font-sans text-sm sm:text-base text-white/85 leading-relaxed max-w-sm mb-6">
                  {product.desc}
                </p>
                <div className="flex gap-4">
                  <div className="border border-white/90 bg-white/10 backdrop-blur-md py-2 px-4 rounded-lg flex flex-col">
                    <span className="text-[10px] uppercase text-white/70">Purity</span>
                    <span className="font-bold text-sm text-white">{product.purity}</span>
                  </div>
                  <div className="border border-white/90 bg-white/10 backdrop-blur-md py-2 px-4 rounded-lg flex flex-col">
                    <span className="text-[10px] uppercase text-white/70">Half-Life</span>
                    <span className="font-bold text-sm text-white">{product.halfLife}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: Product Bottle Stack */}
          <div className="md:col-span-6 flex flex-col items-center justify-center relative min-h-[400px] sm:min-h-[550px]">
            <div className="float-wrapper relative w-full h-80 sm:h-[480px] flex justify-center">
              {/* Product Shadow under the bottle */}
              <div className="absolute bottom-[-15px] sm:bottom-[-20px] w-48 sm:w-64 h-6 bg-black/25 blur-md rounded-[50%] z-0 scale-y-[0.3]" />

              {products.map((product, index) => (
                <div
                  key={index}
                  className="product-bottle absolute top-0 left-1/2 -translate-x-1/2 w-56 h-80 sm:w-80 sm:h-[480px] z-10"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 256px, 320px"
                    priority
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Custom Selector Interface */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end gap-8 text-center md:text-right">

            {/* Color/Slide Selectors */}
            <div className="flex flex-col items-center md:items-end gap-3 pointer-events-auto">
              <span className="font-heading text-xs tracking-wider uppercase text-zinc-200">
                Choose Product
              </span>
              <div className="flex md:flex-col gap-3.5 mt-1">
                {products.map((product, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 cursor-pointer ${activeIndex === index
                      ? "border-white ring-2 ring-white/60 scale-125 shadow-lg"
                      : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                    style={{ backgroundColor: product.color }}
                    title={product.name}
                  />
                ))}
              </div>
            </div>

            {/* Dosage Selector */}
            <div className="flex flex-col items-center md:items-end gap-3 pointer-events-auto">
              <span className="font-heading text-xs tracking-wider uppercase text-zinc-200">
                Active Dosage
              </span>
              <div className="flex gap-2.5 mt-1">
                <button className="border border-white/20 bg-white/10 font-sans font-semibold text-xs tracking-wide py-2 px-4 rounded-full">
                  {activeProduct.dosage}
                </button>
                <button className="border border-white/10 bg-white/5 opacity-55 font-sans font-semibold text-xs tracking-wide py-2 px-4 rounded-full">
                  10ml Vial
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Panel */}
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto z-10 border-t border-white/10 pt-6 mt-auto">
          {/* Social Links */}
          <div className="flex gap-5 text-zinc-300 text-xs sm:text-sm font-sans tracking-wide">
            <a href="#" className="hover:text-white transition-colors duration-300">IG</a>
            <a href="#" className="hover:text-white transition-colors duration-300">FB</a>
            <a href="#" className="hover:text-white transition-colors duration-300">TW</a>
          </div>

          {/* choose label */}
          <div className="hidden sm:block font-heading text-[10px] tracking-[0.3em] uppercase text-zinc-200/60">
            DELIGAS LABORATORY GRADE PRODUCTS
          </div>

          {/* CTA */}
          <button
            onClick={handleSeeAllClick}
            className="bg-white/10 hover:bg-white text-white hover:text-zinc-950 font-heading text-xs font-bold tracking-wider py-2 px-6 rounded-full transition-all duration-300 border border-white/25 hover:shadow-lg cursor-pointer"
          >
            See All Products
          </button>
        </div>

      </div>
    </div>
  );
}
