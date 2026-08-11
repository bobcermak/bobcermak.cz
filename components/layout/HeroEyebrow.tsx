"use client";

import { type FC } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

type HeroEyebrowProps = {
  text?: string;
};
const HeroEyebrow: FC<HeroEyebrowProps> = ({ text }) => {
  //Hooks
  const { heroEyebrow, heroAvailable } = useSiteSettings();
  const label = text ?? heroEyebrow;
  if (!label) return null;
  return (
    <p
      data-reveal
      className="pointer-events-none relative mb-8 inline-flex w-fit items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-text-3"
    >
      <span
        aria-hidden="true"
        className={`size-2 shrink-0 rounded-full ${
          heroAvailable ? "bg-ink motion-safe:animate-pulse" : "bg-muted-num"
        }`}
      />
      {label}
    </p>
  );
};
export default HeroEyebrow;