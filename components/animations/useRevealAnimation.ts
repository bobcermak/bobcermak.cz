"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
type RevealOptions = {
  scrollTrigger?: boolean;
};
export const useRevealAnimation = <T extends HTMLElement>({ scrollTrigger = true }: RevealOptions = {}) => {
  const ref = useRef<T>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const found = el.querySelectorAll<HTMLElement>("[data-reveal]");
      const targets: HTMLElement[] = found.length ? Array.from(found) : [el];
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        targets,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          ...(scrollTrigger
            ? { scrollTrigger: { trigger: el, start: "top 80%", once: true } }
            : {}),
        }
      );
    },
    { scope: ref, dependencies: [scrollTrigger] }
  );
  return ref;
};
export default useRevealAnimation;