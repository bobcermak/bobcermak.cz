"use client";

import { useRef, useState, type FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const SIZE = 96;
const STROKE = 18;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;
const OPEN_MS = 900;
type Phase = "idle" | "closed" | "opening";
type PriceDonutProps = {
  share: number;
};
const PriceDonut: FC<PriceDonutProps> = ({ share }) => {
  //Hooks
  const svgRef = useRef<SVGSVGElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useGSAP(
    () => {
      const svg = svgRef.current;
      const section = svg?.closest("section");
      if (!svg || !section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setPhase("closed");
      let done = 0;
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        once: true,
        onEnter: () => {
          setPhase("opening");
          done = window.setTimeout(() => setPhase("idle"), OPEN_MS);
        },
      });
      return () => {
        if (done) window.clearTimeout(done);
        trigger.kill();
      };
    },
    { scope: svgRef }
  );
  const paid = Math.min(1, Math.max(0, share)) * CIRC;
  const drawn = phase === "closed" ? 0 : paid;
  return (
    <svg
      ref={svgRef}
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      data-donut={phase}
      className="price-donut flex-none -rotate-90"
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE}
        className="price-donut__track stroke-white/20"
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE}
        style={{ strokeDasharray: `${drawn} ${CIRC - drawn}` }}
        className="price-donut__arc stroke-accent-blue"
      />
    </svg>
  );
};
export default PriceDonut;