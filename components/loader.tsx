"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface LoaderProps {
    onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
    const [visible, setVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoWrapperRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const flexContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            // Center position parameters initially handled by GSAP
            gsap.set(flexContainerRef.current, {
                left: "50%",
                top: "50%",
                xPercent: -50,
                yPercent: -50,
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    setVisible(false);
                    if (onComplete) {
                        onComplete();
                    }
                },
            });

            // 1. Spin the logo one round in the middle of the page (Duration: 1.6s)
            tl.to(logoRef.current, {
                rotation: 360,
                duration: 1.6,
                ease: "power2.inOut",
            });

            // 2. Fade/slide in "Deligas Pharma" text from the left (Duration: 0.8s, Ends at 2.4s)
            tl.fromTo(
                textRef.current,
                {
                    opacity: 0,
                    x: -40,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.2" // Slight overlap with the end of the rotation
            );

            // 3. Move/Scale logo + text to the exact position of the navbar brand element (Duration: 1.1s, Ends at 3.5s)
            tl.to(
                flexContainerRef.current,
                {
                    left: () => {
                        const el = document.getElementById("navbar-brand-target");
                        return el ? el.getBoundingClientRect().left : 32; // fallback 32px (2rem)
                    },
                    top: () => {
                        const el = document.getElementById("navbar-brand-target");
                        return el ? el.getBoundingClientRect().top : 24; // fallback 24px (1.5rem)
                    },
                    xPercent: 0,
                    yPercent: 0,
                    scale: 0.625,
                    transformOrigin: "left top",
                    duration: 1.1,
                    ease: "power3.inOut",
                },
                "+=0.2" // Hold for a split second before moving
            );

            // 4. Fade out the white background (Duration: 0.5s, Ends at 4.0s)
            tl.to(
                containerRef.current,
                {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.inOut",
                },
                "+=0.1" // Short hold after reaching final navbar position
            );
        },
        { scope: containerRef }
    );

    if (!visible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[200] flex bg-background text-foreground select-none pointer-events-none"
        >
            <div
                ref={flexContainerRef}
                className="fixed flex items-center gap-4 sm:gap-6 font-sans"
                style={{
                    // Set initial transform origin for smooth scaling to the left
                    transformOrigin: "center center",
                }}
            >
                {/* Logo Container */}
                <div
                    ref={logoWrapperRef}
                    className="relative flex items-center justify-center"
                >
                    {/* relative w-10 h-10 sm:w-15 sm:h-15 transition-transform duration-300 group-hover:scale-105 */}
                    <div ref={logoRef} className="relative w-16 h-16 sm:w-24 sm:h-24">
                        <Image
                            src="/logo/deligas-pharma-logo-without-text.png"
                            alt="Deligas Pharma Logo"
                            fill
                            priority
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Text Container */}
                <div
                    ref={textRef}
                    className="flex flex-col font-heading leading-none opacity-0 select-none"
                >
                    <span className="text-3xl sm:text-4xl font-black tracking-wide text-[#3da0b9] ">
                        DELIGAS
                    </span>
                    <span className="text-[11px] sm:text-[13px] text-nav-brand-text mt-1 pl-[0.15em] tracking-[1.6em]">
                        PHARMA
                    </span>
                </div>
            </div>
        </div>
    );
}