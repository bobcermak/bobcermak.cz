"use client";

import FilterChip from "./FilterChip";
import { FILTER_ALL } from "@/types/projectFilters";

type FilterRowProps<T extends string> = {
  label: string;
  items: readonly T[];
  active: T | typeof FILTER_ALL;
  onPick: (value: T | typeof FILTER_ALL) => void;
  revealDelay?: number;
};
const FilterRow = <T extends string>({ label, items, active, onPick, revealDelay }: FilterRowProps<T>) => (
  <div className="flex flex-wrap items-center gap-2">
    <span
      data-reveal
      data-reveal-delay={revealDelay}
      className="w-17 flex-none text-[11px] font-semibold uppercase tracking-[0.12em] text-text-3"
    >
      {label}
    </span>
    {items.map((item) => (
      <FilterChip
        key={item}
        active={item === active}
        revealDelay={revealDelay}
        onPick={() => onPick(item === active ? FILTER_ALL : item)}
      >
        {item}
      </FilterChip>
    ))}
  </div>
);
export default FilterRow;