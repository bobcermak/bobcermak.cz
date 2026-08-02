"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export type RevealOptions = {
  scrollTrigger?: boolean;
  /** Počáteční posun po ose Y (px). Default 20. Vyšší = výraznější vjezd. */
  y?: number;
  /** Počáteční posun po ose X (px). Default 0 (např. pro vjezd z boku). */
  x?: number;
  /** Délka animace (s). Default 0.8. */
  duration?: number;
  /** Prodleva mezi prvky (s). Default 0.12. Vyšší = znatelnější stagger. */
  stagger?: number;
  /** GSAP ease. Default "power3.out". */
  ease?: string;
};
export const useRevealAnimation = <T extends HTMLElement>({
  scrollTrigger = true,
  y = 20,
  x = 0,
  duration = 0.8,
  stagger = 0.12,
  ease = "power3.out",
}: RevealOptions = {}) => {
  const ref = useRef<T>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const found = el.querySelectorAll<HTMLElement>("[data-reveal]");
      const targets: HTMLElement[] = found.length ? Array.from(found) : [el];
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { opacity: 1, x: 0, y: 0 });
        return;
      }
      gsap.fromTo(
        targets,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          ease,
          stagger,
          ...(scrollTrigger
            ? { scrollTrigger: { trigger: el, start: "top 80%", once: true } }
            : {}),
        }
      );
    },
    { scope: ref, dependencies: [scrollTrigger, y, x, duration, stagger, ease] }
  );
  return ref;
};
export default useRevealAnimation;