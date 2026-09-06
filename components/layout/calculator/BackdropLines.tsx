"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const DRAW_LENGTH = 100;
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(svg.querySelectorAll("path"), { strokeDashoffset: 0 });
      return;
    }
    gsap.fromTo(
      svg.querySelectorAll("path"),
      { strokeDashoffset: DRAW_LENGTH },
      {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 25%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );
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
        <path
          pathLength={DRAW_LENGTH}
          d="M1115.37 2014.78C1167.97 1396.9 1461.72 -4.00459 2215.91 -664.624M3232.02 1834.88C2667.95 1253.31 1280.91 88.3425 245.356 81.0324M819.758 2902.09C1257.32 2475.22 2169.41 1444.04 2317.23 734.23M2494.4 941.325C1739.95 910.073 287.071 963.597 -148.594 354.811M3866.04 3616.96C3088.16 2691.49 982.215 608.878 832.543 -620.896"
          stroke="#6F86D6"
          strokeOpacity="0.32"
        />
      </svg>
    </figure>
  );
};
export default BackdropLines;