"use client";

import type { FC } from "react";
import { pagesCountLabel, pagesFeeLabel, pagesLabel } from "@/lib/calculator";
import { PAGES_MAX, PAGES_MIN } from "@/types/calculator";

type ScopeSliderProps = {
  pages: number;
  onChange: (pages: number) => void;
};
const ScopeSlider: FC<ScopeSliderProps> = ({ pages, onChange }) => {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-none tracking-[-0.02em] text-accent-blue-strong">
          {pagesLabel(pages)}
        </span>
        <span className="text-[13px] font-semibold tabular-nums text-ink">{pagesFeeLabel(pages)}</span>
      </div>
      <input
        type="range"
        min={PAGES_MIN}
        max={PAGES_MAX}
        step={1}
        value={pages}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label="Počet stránek"
        aria-valuetext={pagesCountLabel(pages)}
        className="h-1.5 w-full cursor-pointer accent-accent-blue-strong"
      />
      <div className="mt-2 flex justify-between gap-2 text-[11px] font-medium text-text-3">
        <span>1 stránka</span>
        <span className="text-ink">{pagesCountLabel(pages)}</span>
        <span>{PAGES_MAX}+</span>
      </div>
    </div>
  );
};
export default ScopeSlider;