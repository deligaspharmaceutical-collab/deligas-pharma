"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CompoundDetail {
  name: string;
  dosage: string;
}

interface Product {
  name: string;
  dosage: string;
  compound?: string;
  compounds?: CompoundDetail[];
  type: string;
  concentration: string;
  totalVolume: string;
  totalStrength: string;
  route: string;
  image: string;
}

const products: Product[] = [
  {
    name: "Winstrol",
    dosage: "100mg",
    compound: "Stanozolol",
    type: "Injection USP",
    concentration: "100mg/ml",
    totalVolume: "10ml",
    totalStrength: "1000mg/10ml",
    route: "Intramuscular",
    image: "Winstrol.png"
  },
  {
    name: "Gain Mix",
    dosage: "350mg",
    compounds: [
      { name: "Nandrolone Decanoate", dosage: "100mg" },
      { name: "Testosterone Cypionate", dosage: "100mg" },
      { name: "Boldenone Undecylenate", dosage: "100mg" },
      { name: "Trenbolone Enanthate", dosage: "50mg" }
    ],
    type: "Injection USP",
    concentration: "350mg/ml",
    totalVolume: "10ml",
    totalStrength: "3500mg/10ml",
    route: "Intramuscular",
    image: "GainMix.png"
  },
  {
    name: "NPP",
    dosage: "100mg",
    compound: "Nandrolone Phenylpropionate",
    type: "Injection USP",
    concentration: "100mg/ml",
    totalVolume: "10ml",
    totalStrength: "1000mg/10ml",
    route: "Intramuscular",
    image: "Npp.png"
  },
  {
    name: "Masteron",
    dosage: "100mg",
    compound: "Drostanolone Propionate",
    type: "Injection USP",
    concentration: "100mg/ml",
    totalVolume: "10ml",
    totalStrength: "1000mg/10ml",
    route: "Intramuscular",
    image: "Masteron.png"
  },
  {
    name: "Test-CYP",
    dosage: "250mg",
    compound: "Testosterone Cypionate",
    type: "Injection USP",
    concentration: "250mg/ml",
    totalVolume: "10ml",
    totalStrength: "2500mg/10ml",
    route: "Intramuscular",
    image: "TestCYP.png"
  },
  {
    name: "Tren-E",
    dosage: "200mg",
    compound: "Trenbolone Enanthate",
    type: "Injection USP",
    concentration: "200mg/ml",
    totalVolume: "10ml",
    totalStrength: "2000mg/10ml",
    route: "Intramuscular",
    image: "TrenE.png"
  },
  {
    name: "Cut Mix",
    dosage: "300mg",
    compounds: [
      { name: "Trenbolone Acetate", dosage: "100mg" },
      { name: "Testosterone Propionate", dosage: "100mg" },
      { name: "Drostanolone Propionate", dosage: "100mg" }
    ],
    type: "Injection USP",
    concentration: "300mg/ml",
    totalVolume: "10ml",
    totalStrength: "3000mg/10ml",
    route: "Intramuscular",
    image: "CutMix.png"
  },
  {
    name: "Deca",
    dosage: "250mg",
    compound: "Nandrolone Decanoate",
    type: "Injection USP",
    concentration: "250mg/ml",
    totalVolume: "10ml",
    totalStrength: "2500mg/10ml",
    route: "Intramuscular",
    image: "Deca.png"
  },
  {
    name: "Tren-Ace",
    dosage: "100mg",
    compound: "Trenbolone Acetate",
    type: "Injection USP",
    concentration: "100mg/ml",
    totalVolume: "10ml",
    totalStrength: "1000mg/10ml",
    route: "Intramuscular",
    image: "TrenAce.png"
  },
  {
    name: "Test-Ena",
    dosage: "250mg",
    compound: "Testosterone Enanthate",
    type: "Injection USP",
    concentration: "250mg/ml",
    totalVolume: "10ml",
    totalStrength: "2500mg/10ml",
    route: "Intramuscular",
    image: "Testena.png"
  },
  {
    name: "Test-Prop",
    dosage: "100mg",
    compound: "Testosterone Propionate",
    type: "Injection USP",
    concentration: "100mg/ml",
    totalVolume: "10ml",
    totalStrength: "1000mg/10ml",
    route: "Intramuscular",
    image: "Test-Prop.png"
  },
  {
    name: "Boldi",
    dosage: "250mg",
    compound: "Boldenone Undecylenate",
    type: "Injection USP",
    concentration: "250mg/ml",
    totalVolume: "10ml",
    totalStrength: "2500mg/10ml",
    route: "Intramuscular",
    image: "Boldi.png"
  }
];

export default function ProductsClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];
  const containerRef = useRef<HTMLDivElement>(null);

  // Switch Animation when activeIndex changes
  useGSAP(
    () => {
      // Transition elements in from starting states
      gsap.fromTo(
        ".active-detail-item",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "power2.out" }
      );

      gsap.fromTo(
        ".product-box-image",
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    },
    { dependencies: [activeIndex], scope: containerRef }
  );

  // Continuous floating animation for active product box
  useGSAP(
    () => {
      gsap.to(".active-image-wrapper", {
        y: -10,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { dependencies: [], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="catalogue-section"
      className="w-full flex flex-col items-center justify-start pb-20 scroll-mt-24"
    >

      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-10 select-none">
        <span className="font-heading text-xs tracking-[0.25em] uppercase text-card-text-muted block mb-2">
          Deligas Laboratory
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-heading text-foreground tracking-tight">
          Pharmaceutical Catalogue
        </h1>
        <p className="font-sans text-sm sm:text-base text-card-text-muted mt-3">
          Explore our certified range of USP grade injections, crafted for absolute purity, consistency, and professional athletic performance.
        </p>
      </div>

      {/* Detail Viewer Card */}
      <div className="relative w-full max-w-5xl mx-auto bg-card-bg backdrop-blur-md border border-card-border shadow-card-shadow rounded-3xl p-6 sm:p-10 mb-12 flex flex-col md:flex-row items-center gap-10 md:gap-12 min-h-[460px] transition-all duration-300">

        {/* Left Column: Details Content */}
        <div className="flex-1 flex flex-col items-start w-full text-left">
          {/* Compound Type Badge */}
          <span className="active-detail-item px-3 py-1 border border-badge-border bg-badge-bg rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase text-badge-text mb-4 transition-colors duration-300">
            {activeProduct.type}
          </span>

          {/* Product Name */}
          <h2 className="active-detail-item text-4xl sm:text-5xl font-extrabold font-outfit text-card-text tracking-tight leading-none mb-1 transition-colors duration-300">
            {activeProduct.name}
          </h2>

          {/* Active Dosage Info */}
          <span className="active-detail-item text-sm font-sans font-semibold text-card-text-muted mb-6 block transition-colors duration-300">
            Dosage: {activeProduct.dosage} / Concentration: {activeProduct.concentration}
          </span>

          {/* Compound(s) Formulation list */}
          <div className="active-detail-item w-full mb-6 border-t border-b border-card-border py-5 transition-colors duration-300">
            <span className="text-[10px] sm:text-xs font-heading tracking-wider uppercase text-card-text-muted block mb-3">
              Active Formulations
            </span>
            {activeProduct.compounds ? (
              <div className="flex flex-col gap-2.5">
                {activeProduct.compounds.map((comp, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-card-sub-bg border border-card-sub-border px-4 py-2.5 rounded-xl text-sm font-sans text-card-sub-text transition-all duration-300">
                    <span className="font-semibold text-card-sub-text">{comp.name}</span>
                    <span className="text-xs font-bold bg-badge-bg border border-badge-border text-badge-text px-2.5 py-1 rounded-md transition-colors duration-300">{comp.dosage}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-between items-center bg-card-sub-bg border border-card-sub-border px-4 py-2.5 rounded-xl text-sm font-sans text-card-sub-text transition-all duration-300">
                <span className="font-semibold text-card-sub-text">{activeProduct.compound}</span>
                <span className="text-xs font-bold bg-badge-bg border border-badge-border text-badge-text px-2.5 py-1 rounded-md transition-colors duration-300">{activeProduct.dosage}</span>
              </div>
            )}
          </div>

          {/* Grid Stats */}
          <div className="active-detail-item grid grid-cols-2 gap-4 w-full">
            <div className="border border-card-sub-border bg-card-sub-bg backdrop-blur-sm p-3.5 rounded-xl flex flex-col transition-all duration-300">
              <span className="text-[10px] uppercase font-bold text-card-text-muted tracking-wider">Total Strength</span>
              <span className="font-bold text-base text-card-text mt-1 transition-colors duration-300">{activeProduct.totalStrength}</span>
            </div>
            <div className="border border-card-sub-border bg-card-sub-bg backdrop-blur-sm p-3.5 rounded-xl flex flex-col transition-all duration-300">
              <span className="text-[10px] uppercase font-bold text-card-text-muted tracking-wider">Administration</span>
              <span className="font-bold text-base text-card-text mt-1 transition-colors duration-300">{activeProduct.route}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Image display */}
        <div className="w-full md:w-[320px] flex justify-center items-center relative py-6">
          <div className="active-image-wrapper relative w-56 h-72 sm:w-64 sm:h-80 flex items-center justify-center">
            {/* Product shadow under box */}
            <div className="absolute bottom-[-15px] w-40 h-5 bg-black/30 dark:bg-black/50 blur-md rounded-[50%] scale-y-[0.3] z-0 transition-colors duration-300" />

            <Image
              src={`/products/with-box/${activeProduct.image}`}
              alt={`${activeProduct.name} box`}
              fill
              priority
              sizes="(max-width: 768px) 224px, 256px"
              className="object-contain product-box-image z-10 select-none pointer-events-none"
            />
          </div>
        </div>

      </div>

      {/* Selector Grid */}
      <div className="w-full max-w-5xl mx-auto px-4 mt-6">
        <span className="font-heading text-xs tracking-[0.2em] uppercase text-card-text-muted block mb-6 text-center md:text-left select-none">
          Catalogue Selection
        </span>

        {/* Row 1 Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {products.slice(0, 6).map((product, idx) => {
              const globalIndex = idx;
              const isActive = activeIndex === globalIndex;
              return (
                <button
                  key={globalIndex}
                  onClick={() => setActiveIndex(globalIndex)}
                  className={`relative group backdrop-blur-sm border rounded-2xl p-4 flex flex-col items-center justify-between transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${isActive
                      ? "border-badge-text ring-2 ring-badge-text/20 scale-105 bg-card-bg text-card-text font-bold"
                      : "border-grid-card-border bg-grid-card-bg hover:bg-grid-card-bg-hover text-grid-card-text hover:text-card-text"
                    }`}
                >
                  <div className="relative w-24 h-32 mb-3 transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none">
                    <Image
                      src={`/products/with-box/${product.image}`}
                      alt={product.name}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-outfit font-bold text-sm leading-tight transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-card-text-muted uppercase tracking-wider block mt-0.5">
                      {product.dosage}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2 Grid */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {products.slice(6, 12).map((product, idx) => {
              const globalIndex = idx + 6;
              const isActive = activeIndex === globalIndex;
              return (
                <button
                  key={globalIndex}
                  onClick={() => setActiveIndex(globalIndex)}
                  className={`relative group backdrop-blur-sm border rounded-2xl p-4 flex flex-col items-center justify-between transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${isActive
                      ? "border-badge-text ring-2 ring-badge-text/20 scale-105 bg-card-bg text-card-text font-bold"
                      : "border-grid-card-border bg-grid-card-bg hover:bg-grid-card-bg-hover text-grid-card-text hover:text-card-text"
                    }`}
                >
                  <div className="relative w-24 h-32 mb-3 transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none">
                    <Image
                      src={`/products/with-box/${product.image}`}
                      alt={product.name}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-outfit font-bold text-sm leading-tight transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-card-text-muted uppercase tracking-wider block mt-0.5">
                      {product.dosage}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
