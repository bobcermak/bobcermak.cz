"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const DRAW_LENGTH = 5000;
const STAGGER = 0.09;
const LINES = [
  "M1115.37 2014.78C1167.97 1396.9 1461.72 -4.00459 2215.91 -664.624",
  "M3232.02 1834.88C2667.95 1253.31 1280.91 88.3425 245.356 81.0324",
  "M819.758 2902.09C1257.32 2475.22 2169.41 1444.04 2317.23 734.23",
  "M2494.4 941.325C1739.95 910.073 287.071 963.597 -148.594 354.811",
  "M3866.04 3616.96C3088.16 2691.49 982.215 608.878 832.543 -620.896",
  "M-232.5 2472.4C512.8 2103.6 1402.4 1795.2 2404.6 1148.3",
  "M2062.9 3244.7C1498.4 2618.5 902.7 1908.3 -318.2 1502.6",
  "M296.4 -284.9C702.1 512.7 1258.3 1312.5 1504.8 2618.4",
  "M2648.7 2596.2C1912.5 2348.9 806.4 2204.7 -262.3 2508.1",
  "M1752.6 3556.3C1604.2 2702.8 1448.9 1502.4 1908.7 -344.5",
  "M-352.8 902.6C458.3 1254.7 1306.2 1748.9 2352.4 2054.8",
];
const BackdropLines = () => {
  //Hooks
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const section = svg.closest("section");
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      toggleClass: { targets: svg, className: "is-live" },
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      once: true,
      onEnter: () => svg.classList.add("is-drawn"),
    });
  }, { scope: svgRef });
  return (
    <figure className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        ref={svgRef}
        className="hero-lines-anim pointer-events-none"
        viewBox="0 0 1920 3618"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {LINES.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={DRAW_LENGTH}
            stroke="#6F86D6"
            strokeOpacity="0.32"
            style={{ "--line-delay": `${(i * STAGGER).toFixed(2)}s` } as CSSProperties}
          />
        ))}
      </svg>
    </figure>
  );
};
export default BackdropLines;