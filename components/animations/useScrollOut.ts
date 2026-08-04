"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export type ScrollOutOptions = {
  y?: number;
  scale?: number;
  distance?: number;
};
export const useScrollOut = <T extends HTMLElement>({
  y = 110,
  scale = 0.96,
  distance = 0.75,
}: ScrollOutOptions = {}) => {
  const ref = useRef<T>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const targets = el.querySelectorAll<HTMLElement>("[data-scroll-out]");
      targets.forEach((target) => {
        const factor = Number(target.dataset.scrollOut) || 1;
        gsap.to(target, {
          y: -y * factor,
          scale: 1 - (1 - scale) * factor,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${window.innerHeight * distance * factor}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: ref, dependencies: [y, scale, distance] }
  );
  return ref;
};
export default useScrollOut;