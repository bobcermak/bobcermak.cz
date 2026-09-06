import type { FC } from "react";

const SIZE = 96;
const STROKE = 18;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;

type PriceDonutProps = {
  share: number;
};
const PriceDonut: FC<PriceDonutProps> = ({ share }) => {
  const paid = Math.min(1, Math.max(0, share)) * CIRC;
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      className="flex-none -rotate-90"
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE}
        className="stroke-white/20"
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE}
        strokeDasharray={`${paid} ${CIRC - paid}`}
        className="stroke-accent-blue transition-[stroke-dasharray] duration-500 ease-[cubic-bezier(.2,.8,.25,1)]"
      />
    </svg>
  );
};
export default PriceDonut;