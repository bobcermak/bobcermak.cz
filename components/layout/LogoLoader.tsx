import type { FC } from "react";
import { twMerge } from "tailwind-merge";

const DOTS = [
  { color: "bg-accent-blue", delay: "0ms" },
  { color: "bg-accent-peach", delay: "120ms" },
  { color: "bg-accent-purple", delay: "360ms" },
  { color: "bg-ink", delay: "240ms" },
] as const;
type LogoLoaderProps = {
  className?: string;
  label?: string;
};
const LogoLoader: FC<LogoLoaderProps> = ({ className, label = "Načítání" }) => {
  return (
    <div
      role="status"
      aria-label={label}
      className={twMerge("flex flex-col items-center justify-center", className)}
    >
      <span
        aria-hidden="true"
        className="grid grid-cols-2 gap-3 motion-safe:animate-[logoGridSpin_2.6s_cubic-bezier(.2,.8,.25,1)_infinite]"
      >
        {DOTS.map((dot) => (
          <span
            key={dot.color}
            style={{ animationDelay: dot.delay }}
            className={`size-5 rounded-full ${dot.color} motion-safe:animate-[logoDotPulse_1.3s_ease-in-out_infinite]`}
          />
        ))}
      </span>
    </div>
  );
};
export default LogoLoader;