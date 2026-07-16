import Link from "next/link";
import { FC } from "react";

type LogoProps = {
  onClick?: () => void;
};
const Logo: FC<LogoProps> = ({ onClick }: LogoProps) => {
  const DOTS = ["bg-accent-blue", "bg-accent-peach", "bg-accent-purple", "bg-ink"] as const;
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="bobcermak.cz — domů"
      className="flex items-center text-ink"
    >
      <span className="inline-flex items-center gap-1.5">
        <span className="text-[22px] font-bold leading-none tracking-[-0.11em] text-ink">bc</span>
        <span className="grid grid-cols-2 gap-1">
          {DOTS.map((color) => (
            <span key={color} className={`size-1.25 rounded-full ${color}`} />
          ))}
        </span>
      </span>
    </Link>
  )
}
export default Logo;