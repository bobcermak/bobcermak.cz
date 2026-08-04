import { type FC } from "react";
import { twMerge } from "tailwind-merge";

type HamburgerProps = {
  isOpen: boolean,
  onToggle: () => void,
  controls?: string,
  className?: string
};
const Hamburger: FC<HamburgerProps> = ({ isOpen, onToggle, controls, className }) => {
  const BAR = "absolute left-0 block h-[2px] w-full rounded-full bg-ink transition-all duration-300 ease-[cubic-bezier(.2,.8,.25,1)]";
  return (
    <button
      type="button"
      aria-label={isOpen ? "Zavřít navigaci" : "Otevřít navigaci"}
      aria-expanded={isOpen}
      aria-controls={controls}
      onClick={onToggle}
      className={twMerge(
        "group relative inline-flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-full ring-1 ring-white/60",
        "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.25,1)] hover:scale-110 active:scale-95",
        className
      )}
    >
      <span
        aria-hidden
        className={`absolute inset-[-35%] rounded-full blur-[2px]
          bg-[conic-gradient(from_140deg,#96ace8,#cebeec,#f3ccb2,#cebeec,#96ace8)]
          animate-[spin_7s_linear_infinite] transition-[filter] duration-500
          group-hover:[animation-duration:2.2s] group-hover:saturate-150
          group-active:[animation-duration:2.2s] group-active:saturate-150
          ${isOpen ? "saturate-150" : ""}`}
      />
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full transition-colors duration-300
          ${isOpen ? "bg-white/40" : "bg-white/60 group-hover:bg-white/45 group-active:bg-white/45"}`}
      />
      <span className="relative block h-4 w-4.5">
        <span className={`${BAR} ${isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.75"}`} />
        <span className={`${BAR} ${isOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0.75"}`} />
      </span>
    </button>
  );
};
export default Hamburger;