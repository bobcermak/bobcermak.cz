const ScrollHint = () => (
  <div
    aria-hidden="true"
    data-scroll-out="0.75"
    className="pointer-events-none absolute inset-x-0 bottom-4 z-30 hidden flex-col items-center gap-1.5 laptop:flex desktop:bottom-8 desktop:gap-2.5"
  >
    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-3 [@media(max-height:700px)_and_(max-width:1536px)]:hidden desktop:text-eyebrow">
      Scroll
    </span>
    <span className="flex h-7 w-5 justify-center rounded-full border-2 border-border-mid pt-1.5 desktop:h-9 desktop:w-6 desktop:pt-2">
      <span className="size-1 rounded-full bg-text-3 motion-safe:animate-[scrollDot_1.5s_cubic-bezier(.2,.8,.25,1)_infinite] desktop:size-1.5" />
    </span>
  </div>
);
export default ScrollHint;