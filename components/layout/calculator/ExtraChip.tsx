"use client";

import type { FC } from "react";

type ExtraChipProps = {
  label: string;
  price?: string;
  on: boolean;
  onToggle: () => void;
};
const ExtraChip: FC<ExtraChipProps> = ({ label, price, on, onToggle }) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onToggle}
    className={`cursor-pointer rounded-full px-3.5 py-2 text-[12.5px] leading-none transition-colors duration-250 ease-[cubic-bezier(.2,.8,.25,1)] ${
      on
        ? "bg-accent-blue-strong text-white"
        : "bg-bg-tint text-text-2 hover:bg-border hover:text-ink active:bg-border active:text-ink"
    }`}
  >
    <span className="font-medium">{label}</span>
    {price && (
      <span className={`ml-2 font-semibold tabular-nums ${on ? "text-white/75" : "text-text-3"}`}>
        {price}
      </span>
    )}
  </button>
);
export default ExtraChip;