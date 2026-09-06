"use client";

import type { FC } from "react";
import type { ProjectType } from "@/types/calculator";

type TypeRowProps = {
  type: ProjectType;
  selected: boolean;
  onSelect: () => void;
};
const TypeRow: FC<TypeRowProps> = ({ type, selected, onSelect }) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    onClick={onSelect}
    className="group flex w-full cursor-pointer items-start gap-3.5 py-3 text-left transition-colors duration-250"
  >
    <span
      aria-hidden="true"
      className={`mt-1 grid size-4 flex-none place-items-center rounded-full border-[1.5px] transition-colors duration-250 ${
        selected
          ? "border-accent-blue-strong"
          : "border-border-mid group-hover:border-text-3 group-active:border-text-3"
      }`}
    >
      <span
        className={`size-2 rounded-full transition-colors duration-250 ${
          selected ? "bg-accent-blue-strong" : "bg-transparent"
        }`}
      />
    </span>
    <span className="min-w-0 flex-1">
      <span
        className={`block text-[15px] font-semibold leading-snug transition-colors duration-250 ${
          selected ? "text-accent-blue-strong" : "text-ink"
        }`}
      >
        {type.label}
      </span>
      <span
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(.2,.8,.25,1)] ${
          selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <span className="min-h-0 overflow-hidden">
          <span className="mt-1 line-clamp-3 block h-[3.4rem] text-[12.5px] leading-[1.45] text-text-3 stablet:line-clamp-2 stablet:h-[2.3rem]">
            {type.desc}
          </span>
        </span>
      </span>
    </span>
    <span className="flex flex-none items-baseline gap-2 pt-0.5">
      {type.discount > 0 && (
        <span className="text-[11px] font-semibold tabular-nums text-accent-blue-strong">
          -{type.discount} %
        </span>
      )}
      <span className="whitespace-nowrap text-[13px] font-semibold tabular-nums text-ink">
        {type.priceLabel}
      </span>
    </span>
  </button>
);
export default TypeRow;