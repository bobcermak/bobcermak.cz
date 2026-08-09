"use client";

import { useCallback, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { useRevealAnimation, type RevealOptions } from "../../animations/useRevealAnimation";
import { useScrollOut, type ScrollOutOptions } from "../../animations/useScrollOut";
import { useScrollDrift, type ScrollDriftOptions } from "../../animations/useScrollDrift";

type RevealSectionProps = ComponentPropsWithoutRef<"section"> & {
  scrollTrigger?: boolean;
  reveal?: Omit<RevealOptions, "scrollTrigger">;
  scrollOut?: ScrollOutOptions;
  drift?: ScrollDriftOptions;
};
const RevealSection = ({ scrollTrigger = true, reveal, scrollOut, drift, children, className, ...rest }: RevealSectionProps) => {
  const revealRef = useRevealAnimation<HTMLElement>({ scrollTrigger, ...reveal });
  const scrollOutRef = useScrollOut<HTMLElement>(scrollOut);
  const driftRef = useScrollDrift<HTMLElement>(drift);
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      revealRef.current = node;
      scrollOutRef.current = node;
      driftRef.current = node;
    },
    [revealRef, scrollOutRef, driftRef]
  );
  return (
    <section ref={setRefs} className={twMerge(drift ? "overflow-x-clip" : "", className)} {...rest}>
      {children}
    </section>
  );
};
export default RevealSection;