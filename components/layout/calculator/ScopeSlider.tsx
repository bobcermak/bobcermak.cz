"use client";

import type { FC } from "react";
import { formatCzk, pagesCountLabel, pagesFee, pagesLabel } from "@/lib/calculator";
import { PAGES_MAX, PAGES_MIN } from "@/types/calculator";

type ScopeSliderProps = {
  pages: number;
  onChange: (pages: number) => void;
};
const ScopeSlider: FC<ScopeSliderProps> = ({ pages, onChange }) => {
  const scope = pagesFee(pages);
  return (
    <div className="rounded-[14px] border-[1.5px] border-border bg-white px-4 pb-4 pt-5 xphone:px-5.5 xphone:pb-4.5 xphone:pt-5.5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="text-[1.05rem] font-semibold text-ink">{pagesLabel(pages)}</span>
        <span className="text-[13px] font-semibold text-ink">{scope ? `+${formatCzk(scope)} Kč` : "×1"}</span>
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
        className="h-1.5 w-full cursor-pointer accent-ink"
      />
      <div className="mt-2.5 flex justify-between gap-2 text-[11px] font-medium text-text-3">
        <span>1 stránka</span>
        <span className="text-ink">{pagesCountLabel(pages)}</span>
        <span>{PAGES_MAX}+</span>
      </div>
    </div>
  );
};
export default ScopeSlider;