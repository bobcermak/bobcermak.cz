"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useRevealAnimation, type RevealOptions } from "../../animations/useRevealAnimation";

type RevealSectionProps = ComponentPropsWithoutRef<"section"> & {
  scrollTrigger?: boolean;
  reveal?: Omit<RevealOptions, "scrollTrigger">;
};
const RevealSection = ({ scrollTrigger = true, reveal, children, ...rest }: RevealSectionProps) => {
  const ref = useRevealAnimation<HTMLElement>({ scrollTrigger, ...reveal });
  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
};
export default RevealSection;