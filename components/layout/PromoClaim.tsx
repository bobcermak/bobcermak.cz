"use client";

import { Suspense, type FC } from "react";
import { useSearchParams } from "next/navigation";
import { SealPercentIcon } from "@phosphor-icons/react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { PROMO_PARAM, PROMO_PARAM_VALUE } from "@/types/promo";

const PromoClaimInner: FC = () => {
  //Hooks
  const { promoClaimLabel, promoClaimNote } = useSiteSettings();
  const promo = useSearchParams().get(PROMO_PARAM) === PROMO_PARAM_VALUE;

  if (!promo) return null;
  return (
    <>
      <p className="flex items-start gap-2.5 rounded-[10px] border border-accent-blue-strong/40 bg-accent-blue/12 px-3.5 py-3 text-[13px] font-medium leading-[1.45] text-ink">
        <SealPercentIcon
          size={17}
          weight="fill"
          aria-hidden="true"
          className="mt-px flex-none text-accent-blue-strong"
        />
        <span>
          {promoClaimLabel}
          <span className="mt-0.5 block font-normal text-text-2">{promoClaimNote}</span>
        </span>
      </p>
      <input type="hidden" name={PROMO_PARAM} value={PROMO_PARAM_VALUE}/>
    </>
  );
};
const PromoClaim = () => (
  <Suspense fallback={null}>
    <PromoClaimInner/>
  </Suspense>
);
export default PromoClaim;