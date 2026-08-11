const DOTS = [
  { color: "bg-accent-blue", delay: "0ms" },
  { color: "bg-accent-peach", delay: "120ms" },
  { color: "bg-accent-purple", delay: "360ms" },
  { color: "bg-ink", delay: "240ms" },
] as const;
const Loading = () => {
  return (
    <div
      role="status"
      aria-label="Načítání"
      className="flex min-h-dvh flex-col items-center justify-center"
    >
      <div className="flex items-center justify-center gap-5">
        <span
          aria-hidden="true"
          className="text-[clamp(3rem,7vw,4.5rem)] font-bold leading-none tracking-[-0.11em] text-ink"
        >
          bc
        </span>
        <span
          aria-hidden="true"
          className="grid grid-cols-2 gap-2.5 motion-safe:animate-[logoGridSpin_2.6s_cubic-bezier(.2,.8,.25,1)_infinite]"
        >
          {DOTS.map((dot) => (
            <span
              key={dot.color}
              style={{ animationDelay: dot.delay }}
              className={`size-4 rounded-full ${dot.color} motion-safe:animate-[logoDotPulse_1.3s_ease-in-out_infinite]`}
            />
          ))}
        </span>
      </div>
    </div>
  );
};
export default Loading;