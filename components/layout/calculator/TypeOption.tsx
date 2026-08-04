"use client";

import type { FC, ReactNode } from "react";
import { TILE_BASE, tileState } from "./tileStyles";

type TypeOptionProps = {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
};
const TypeOption: FC<TypeOptionProps> = ({ selected, onSelect, children }) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    onClick={onSelect}
    className={`relative p-4 ${TILE_BASE} ${tileState(selected)}`}
  >
    {children}
    <span
      aria-hidden="true"
      className={`absolute right-4 top-4 grid size-[18px] place-items-center rounded-full border-2 transition-colors duration-250 ${
        selected ? "border-ink" : "border-muted-num"
      }`}
    >
      <span
        className={`size-2 rounded-full transition-colors duration-250 ${selected ? "bg-ink" : "bg-transparent"}`}
      />
    </span>
  </button>
);
export default TypeOption;