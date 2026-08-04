export const TILE_BASE =
  "cursor-pointer rounded-xl border-[1.5px] text-left transition-colors duration-250 ease-[cubic-bezier(.2,.8,.25,1)]";
export const tileState = (on: boolean) =>
  on ? "border-ink bg-bg-tint" : "border-border bg-white hover:border-border-mid active:border-border-mid";