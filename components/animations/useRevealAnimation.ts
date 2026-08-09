"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { routeKey, wasVisited } from "@/lib/visitedRoutes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export type RevealOptions = {
  scrollTrigger?: boolean;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  perTarget?: boolean;
};
export const useRevealAnimation = <T extends HTMLElement>({
  scrollTrigger = true,
  y = 20,
  x = 0,
  scale = 1,
  duration = 0.8,
  stagger = 0.12,
  ease = "power3.out",
  start = "top 80%",
  perTarget = false,
}: RevealOptions = {}) => {
  const ref = useRef<T>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const found = el.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!found.length) return;
      const targets: HTMLElement[] = Array.from(found);
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        wasVisited(routeKey())
      ) {
        gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }
      const from = { opacity: 0, x, y, scale };
      const to = { opacity: 1, x: 0, y: 0, scale: 1, duration, ease };
      if (perTarget && scrollTrigger) {
        const tops = targets.map((target) => target.getBoundingClientRect().top);
        let rowTop = Number.NEGATIVE_INFINITY;
        let indexInRow = 0;
        targets.forEach((target, i) => {
          if (Math.abs(tops[i] - rowTop) > 8) {
            rowTop = tops[i];
            indexInRow = 0;
          } else {
            indexInRow += 1;
          }
          gsap.fromTo(target, from, {
            ...to,
            delay: indexInRow * stagger,
            scrollTrigger: { trigger: target, start, once: true },
          });
        });
        return;
      }
      gsap.fromTo(targets, from, {
        ...to,
        stagger,
        ...(scrollTrigger ? { scrollTrigger: { trigger: el, start, once: true } } : {}),
      });
    },
    { scope: ref, dependencies: [scrollTrigger, y, x, scale, duration, stagger, ease, start, perTarget] }
  );
  return ref;
};
export default useRevealAnimation;