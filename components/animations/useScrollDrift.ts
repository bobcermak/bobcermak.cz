"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export type ScrollDriftOptions = {
  distance?: number;
  rotate?: number;
  scale?: number;
  hold?: number;
  scrub?: number;
  direction?: "left" | "right";
};
export const useScrollDrift = <T extends HTMLElement>({
  distance = 220,
  rotate = 3,
  scale = 0.94,
  hold = 0.6,
  scrub = 1.5,
  direction = "left",
}: ScrollDriftOptions = {}) => {
  const ref = useRef<T>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const side = direction === "right" ? 1 : -1;
      el.querySelectorAll<HTMLElement>("[data-drift]").forEach((target) => {
        const factor = Number(target.dataset.drift) || 1;
        const travel = distance * factor * side;
        const tilt = rotate * factor * side;
        const items = target.querySelectorAll<HTMLElement>("[data-drift-item]");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
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
        timeline
          .to(target, { duration: hold })
          .to(target, {
            x: -travel,
            rotate: -tilt,
            scale,
            opacity: 0,
            ease: "none",
            duration: 1,
          });
      });
    },
    { scope: ref, dependencies: [distance, rotate, scale, hold, scrub, direction] }
  );
  return ref;
};
export default useScrollDrift;