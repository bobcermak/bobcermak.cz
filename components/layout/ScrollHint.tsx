const ScrollHint = () => (
  <div
    aria-hidden="true"
    data-scroll-out="0.75"
    className="pointer-events-none absolute inset-x-0 bottom-8 z-30 hidden flex-col items-center gap-2.5 laptop:flex"
  >
    <span className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-text-3">Scroll</span>
    <span className="flex h-9 w-6 justify-center rounded-full border-2 border-border-mid pt-2">
      <span className="size-1.5 rounded-full bg-text-3 motion-safe:animate-[scrollDot_1.5s_cubic-bezier(.2,.8,.25,1)_infinite]" />
    </span>
  </div>
);
export default ScrollHint;