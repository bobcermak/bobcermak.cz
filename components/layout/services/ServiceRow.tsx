"use client";

import type { FC } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { Service } from "@/types/services";
import { CALCULATOR_SECTION_ID, openCalculator } from "@/lib/calculator";

type ServiceRowProps = {
  service: Service;
};
const ServiceRow: FC<ServiceRowProps> = ({ service }) => {
  const { num, title, tag, desc, calc } = service;
  return (
    <a
      data-reveal
      href={`#${CALCULATOR_SECTION_ID}`}
      onClick={(e) => {
        e.preventDefault();
        openCalculator(calc);
      }}
      aria-label={`${title} — spočítat cenu v kalkulačce`}
      className="group grid cursor-pointer grid-cols-[auto_1fr_auto] items-center tablet:items-start gap-4 border-b border-border px-6 py-[clamp(24px,3.2vw,40px)] transition-[padding,background-color] duration-250 ease-[cubic-bezier(.2,.8,.25,1)] hover:bg-bg-tint hover:pl-6 active:bg-bg-tint active:pl-6 laptop:items-center laptop:gap-8"
    >
      <header>
        <p className="w-[clamp(56px,9vw,120px)] text-[clamp(2.4rem,5vw,4rem)] font-light leading-[0.9] tracking-[-0.03em] text-muted-num transition-colors duration-250 group-hover:text-ink group-active:text-ink">
          {num}
        </p>
      </header>
      <div className="flex flex-col gap-4 laptop:flex-row laptop:items-center laptop:gap-11">
        <div className="laptop:flex-1">
          <h3 className="mb-2.5 text-[clamp(1.3rem,2.4vw,1.9rem)] font-semibold tracking-[-0.02em] text-ink">
            {title}
          </h3>
          <p className="inline-flex rounded-full border border-border-mid px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-text-2 transition-colors duration-250 group-hover:border-ink group-hover:text-ink group-active:border-ink group-active:text-ink">
            {tag}
          </p>
        </div>
        <p className="text-sm tablet:text-base leading-[1.55] text-text-2 transition-colors duration-250 group-hover:text-ink group-active:text-ink laptop:flex-[1.1]">
          {desc}
        </p>
      </div>
      <footer aria-hidden="true" className="pt-1 laptop:pt-0">
        <ArrowUpRightIcon
          size={22}
          className="text-muted-num transition-[color,rotate] duration-250 ease-[cubic-bezier(.2,.8,.25,1)] group-hover:rotate-45 group-active:rotate-45 group-hover:text-ink group-active:text-ink"
        />
      </footer>
    </a>
  );
};
export default ServiceRow;