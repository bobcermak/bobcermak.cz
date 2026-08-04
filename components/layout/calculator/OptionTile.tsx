"use client";

import type { FC, ReactNode } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { TILE_BASE, tileState } from "./tileStyles";

type OptionTileProps = {
  on: boolean;
  onToggle: () => void;
  children: ReactNode;
};
const OptionTile: FC<OptionTileProps> = ({ on, onToggle, children }) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onToggle}
    className={`flex w-full items-center gap-3 px-4 py-3.5 ${TILE_BASE} ${tileState(on)}`}
  >
    <span
      aria-hidden="true"
      className={`grid size-[22px] flex-none place-items-center rounded-md border-2 transition-colors duration-250 ${
        on ? "border-ink bg-ink text-white" : "border-muted-num bg-transparent"
      }`}
    >
      {on && <CheckIcon size={13} weight="bold"/>}
    </span>
    {children}
  </button>
);
export default OptionTile;