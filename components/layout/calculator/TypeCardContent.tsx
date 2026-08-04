import type { FC } from "react";
import { ACCENT_STYLES, type ProjectType } from "@/types/calculator";
import { formatCzk, priceBeforeDiscount } from "@/lib/calculator";

type TypeCardContentProps = {
  type: ProjectType;
};
const TypeCardContent: FC<TypeCardContentProps> = ({ type }) => {
  const accent = ACCENT_STYLES[type.accent];
  const before = priceBeforeDiscount(type.base, type.discount);
  return (
    <>
      <span className="block pr-7 text-[15px] font-semibold leading-snug text-ink xphone:text-base">
        {type.label}
      </span>
      <span className="mt-1.5 block text-[13px] leading-[1.4] text-text-3">{type.desc}</span>
      <span className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        {before > 0 && (
          <span className={`text-[12.5px] font-semibold text-placeholder line-through decoration-2 ${accent.line}`}>
            {formatCzk(before)} Kč
          </span>
        )}
        <span className="text-[13px] font-semibold text-ink">{type.priceLabel}</span>
        {type.discount > 0 && (
          <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold leading-normal text-white ${accent.bg}`}>
            −{type.discount} %
          </span>
        )}
      </span>
    </>
  );
};
export default TypeCardContent;