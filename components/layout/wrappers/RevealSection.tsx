"use client";

import { useCallback, type ComponentPropsWithoutRef } from "react";
import { useRevealAnimation, type RevealOptions } from "../../animations/useRevealAnimation";
import { useScrollOut, type ScrollOutOptions } from "../../animations/useScrollOut";

type RevealSectionProps = ComponentPropsWithoutRef<"section"> & {
  scrollTrigger?: boolean;
  reveal?: Omit<RevealOptions, "scrollTrigger">;
  /** Ladění odjezdu prvků s `data-scroll-out`. Bez nich se nic neděje. */
  scrollOut?: ScrollOutOptions;
};
const RevealSection = ({ scrollTrigger = true, reveal, scrollOut, children, ...rest }: RevealSectionProps) => {
  const revealRef = useRevealAnimation<HTMLElement>({ scrollTrigger, ...reveal });
  const scrollOutRef = useScrollOut<HTMLElement>(scrollOut);
  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      revealRef.current = node;
      scrollOutRef.current = node;
    },
    [revealRef, scrollOutRef]
  );
  return (
    <section ref={setRefs} {...rest}>
      {children}
    </section>
  );
};
export default RevealSection;
