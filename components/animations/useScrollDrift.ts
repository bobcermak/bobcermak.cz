"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { routeKey, wasVisited } from "@/lib/visitedRoutes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export type ScrollDriftOptions = {
  distance?: number;
  rotate?: number;
  scale?: number;
  scrub?: number;
  start?: string;
  end?: string;
  direction?: "left" | "right";
  maxShift?: number;
};
export const useScrollDrift = <T extends HTMLElement>({
  distance = 220,
  rotate = 3,
  scale = 0.94,
  scrub = 0.8,
  start = "top bottom",
  end = "top 20%",
  direction = "left",
  maxShift = 0.12,
}: ScrollDriftOptions = {}) => {
  const ref = useRef<T>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        wasVisited(routeKey())
      ) {
        gsap.set(el.querySelectorAll("[data-drift]"), { x: 0, rotate: 0, scale: 1, opacity: 1 });
        gsap.set(el.querySelectorAll("[data-drift-item]"), { y: 0, opacity: 1 });
        return;
      }
      const side = direction === "right" ? 1 : -1;
      el.querySelectorAll<HTMLElement>("[data-drift]").forEach((target) => {
        const factor = Number(target.dataset.drift) || 1;
        const fit = () => Math.min(1, (window.innerWidth * maxShift) / (distance * factor));
        const travel = () => distance * factor * side * fit();
        const tilt = () => rotate * factor * side * fit();
        const items = target.querySelectorAll<HTMLElement>("[data-drift-item]");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
            invalidateOnRefresh: true,
          },
        });
        timeline.fromTo(
          target,
          { x: travel, rotate: tilt, scale, opacity: 0 },
          { x: 0, rotate: 0, scale: 1, opacity: 1, ease: "none", duration: 1 }
        );
        if (items.length) {
          timeline.fromTo(
            items,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, ease: "none", duration: 0.5, stagger: 0.06 },
            "<0.4"
          );
        }
      });
    },
    { scope: ref, dependencies: [distance, rotate, scale, scrub, start, end, direction, maxShift] }
  );
  return ref;
};
export default useScrollDrift;