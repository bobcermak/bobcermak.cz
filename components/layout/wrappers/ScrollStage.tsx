"use client";

import { Children, useRef, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const PINNED_MQ = "(min-height: 780px) and (prefers-reduced-motion: no-preference)";
const FLOW_MQ = ["(max-height: 779.98px) and (prefers-reduced-motion: no-preference)"];
const DIM = 0.15;
const CHIP_DIM = 0.25;
type ScrollStageProps = {
  children: ReactNode;
  runway?: number;
  fill?: number;
  hold?: number;
  direction?: "auto" | "vertical";
};
const ScrollStage = ({ children, runway = 2.8, fill = 0.58, hold = 0.07, direction = "auto" }: ScrollStageProps) => {
  const flowOnly = direction === "vertical";
  //Hooks
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panels = Children.toArray(children);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;
      const words = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-fill]"));
      const chips = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-stage-chip]"));
      const stages = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-stage-panel]"));
      const lead = stages[0]?.querySelector<HTMLElement>("[data-stage-depth]") ?? null;
      const follow = stages[1]?.querySelector<HTMLElement>("[data-stage-depth]") ?? null;
      const cue = root.querySelector<HTMLElement>("[data-stage-cue]");
      const chipFrom = { opacity: CHIP_DIM, scale: 0.86, y: 10, transformOrigin: "left center" };
      const mm = gsap.matchMedia();
      if (!flowOnly) mm.add(PINNED_MQ, () => {
        const slide = Math.max(0.1, 1 - fill - hold);
        const turn = fill + hold;
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        if (words.length) {
          gsap.set(words, { opacity: DIM });
          timeline.fromTo(
            words,
            { opacity: DIM },
            {
              opacity: 1,
              duration: fill * 0.3,
              stagger: { amount: fill * 0.7 },
              immediateRender: true,
            },
            0
          );
        }
        if (chips.length) {
          gsap.set(chips, chipFrom);
          timeline.fromTo(
            chips,
            chipFrom,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "back.out(1.6)",
              duration: hold * 1.6,
              stagger: { amount: hold },
              immediateRender: true,
            },
            Math.max(0, fill - hold * 0.4)
          );
        }
        if (cue) {
          timeline
            .fromTo(cue, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: hold }, fill)
            .to(cue, { opacity: 0, duration: slide * 0.35 }, turn);
        }
        timeline.to(track, { xPercent: -50, duration: slide }, turn);
        if (lead) timeline.to(lead, { xPercent: -10, opacity: 0.35, duration: slide }, turn);
        if (follow) timeline.fromTo(follow, { xPercent: 10 }, { xPercent: 0, duration: slide }, turn);
      });
      const flow = () => {
        if (!stages[0]) return;
        if (words.length) {
          gsap.set(words, { opacity: DIM });
          gsap.fromTo(
            words,
            { opacity: DIM },
            {
              opacity: 1,
              ease: "none",
              duration: 0.3,
              stagger: { amount: 0.7 },
              immediateRender: true,
              scrollTrigger: {
                trigger: stages[0],
                start: "top 85%",
                end: "bottom 60%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        }
        if (chips.length) {
          gsap.set(chips, chipFrom);
          gsap.fromTo(chips, chipFrom, {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "back.out(1.6)",
            duration: 0.6,
            stagger: 0.12,
            immediateRender: true,
            scrollTrigger: {
              trigger: stages[0],
              start: "bottom 60%",
              end: "bottom 40%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        }
        if (lead) {
          gsap.to(lead, {
            y: -70,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: stages[0],
              start: "bottom 40%",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }
        if (follow && stages[1]) {
          gsap.fromTo(
            follow,
            { y: 70, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              immediateRender: true,
              scrollTrigger: {
                trigger: stages[1],
                start: "top 85%",
                end: "top 25%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      };
      const flowQueries = flowOnly ? ["(prefers-reduced-motion: no-preference)"] : FLOW_MQ;
      flowQueries.forEach((query) => mm.add(query, flow));
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(words, { opacity: 1 });
        gsap.set(chips, { opacity: 1, scale: 1, y: 0 });
      });
    },
    { scope: rootRef, dependencies: [runway, fill, hold, flowOnly] }
  );
  return (
    <div
      ref={rootRef}
      className={`scroll-stage relative w-full${flowOnly ? " scroll-stage--flow" : ""}`}
      style={{ "--stage-runway": `${runway * 100}svh` } as CSSProperties}
    >
      <div className="scroll-stage__viewport">
        <div ref={trackRef} className="scroll-stage__track">
          {panels.map((panel, i) => (
            <div key={i} data-stage-panel className="scroll-stage__panel w-full">
              {panel}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ScrollStage;