'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import AnimatedLogo from "./components/AnimatedLogo";

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    // Control body scrolling
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  useEffect(() => {
    if (!headingRef.current || isLoading) return;

    // Split and animate the text
    const split = SplitText.create(headingRef.current, {
      type: "chars,words",
      charsClass: "char",
      wordsClass: "word",
      autoSplit: true,
      onSplit: (self) => {
        return gsap.from(self.chars, {
          duration: 1,
          y: 100,
          autoAlpha: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        });
      }
    });

    // Initialize ScrollSmoother
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      split.revert();
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
    };
  }, [isLoading]);

  return (
    <div id="smooth-wrapper" className="w-full overflow-hidden">
      <AnimatedLogo />
      <div id="smooth-content" className="relative z-10" ref={mainRef}>
        <main className="min-h-screen w-full z-10">

          <div className={`container max-w-screen-2xl mx-auto z-20 min-h-screen flex items-center justify-center transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <h1 ref={headingRef} className="text-[8vw] font-light tracking-tight leading-none text-center w-full">
              Building software your clients love to use
            </h1>
          </div>

          <div className="spacer h-[25vh]"></div>

          <div className="container max-w-screen-xl mx-auto z-20 min-h-screen flex flex-col items-center justify-center gap-6">
            <h2 className="text-5xl font-light">Success Cases</h2>
            <div className="grid grid-cols-2 gap-8 w-full">
              <div className="rounded-3xl h-80 bg-black/40"></div>
              <div className="rounded-3xl h-80 bg-black/40"></div>
              <div className="rounded-3xl h-80 bg-black/40"></div>
              <div className="rounded-3xl h-80 bg-black/40"></div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
