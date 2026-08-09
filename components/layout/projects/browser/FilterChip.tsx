"use client";

import type { FC, ReactNode } from "react";

type FilterChipProps = {
  active: boolean;
  onPick: () => void;
  children: ReactNode;
};
const FilterChip: FC<FilterChipProps> = ({ active, onPick, children }) => (
  <button
    type="button"
    onClick={onPick}
    aria-pressed={active}
    className={`cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-250 ${
      active
        ? "border border-ink bg-ink text-white"
        : "border border-border-mid bg-white text-text-2 hover:border-ink hover:text-ink active:border-ink active:text-ink"
    }`}
  >
    {children}
  </button>
);
export default FilterChip;