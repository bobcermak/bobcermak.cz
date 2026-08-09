"use client";

import { useEffect, useState, type FC } from "react";
import Link from "next/link";
import { ArrowRightIcon, SealPercentIcon, XIcon } from "@phosphor-icons/react";
import { CONTACT_SECTION_ID } from "@/types/contact";
import { PROMO_CTA, PROMO_DELAY, PROMO_EYEBROW, PROMO_LEAD, PROMO_STORAGE_KEY, PROMO_TITLE_AFTER, PROMO_TITLE_BEFORE, PROMO_TITLE_HIGHLIGHT, promoHref } from "@/types/promo";

const wasDismissed = () => {
  try {
    return sessionStorage.getItem(PROMO_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};
const rememberDismissed = () => {
  try {
    sessionStorage.setItem(PROMO_STORAGE_KEY, "1");
  } catch {
  }
};
type PromoPopupProps = {
  delay?: number;
};
const PromoPopup: FC<PromoPopupProps> = ({ delay = PROMO_DELAY }) => {
  //Hooks
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (wasDismissed()) return;
    const timer = window.setTimeout(() => setOpen(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);
  const dismiss = () => {
    rememberDismissed();
    setOpen(false);
  };
  if (!open) return null;
  return (
    <aside
      aria-label="Nabídka slevy"
      className="fixed bottom-4 right-4 z-45 w-[calc(100%-2rem)] max-w-95 xphone:bottom-6 xphone:right-6 motion-safe:animate-[promoIn_0.6s_cubic-bezier(.22,1.15,.36,1)_both]"
    >
      <div className="relative overflow-hidden rounded-[18px] border border-border bg-white/95 shadow-[0_1px_3px_rgba(17,17,17,0.04),0_10px_34px_rgba(111,134,214,0.22)] backdrop-blur-md">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-accent-blue-strong"/>
        <div className="flex gap-3.5 p-4 pt-5 xphone:gap-4 xphone:p-5 xphone:pt-6">
          <span
            aria-hidden="true"
            className="grid size-11 flex-none place-items-center rounded-xl bg-accent-blue/20 text-accent-blue-strong"
          >
            <SealPercentIcon size={22} weight="fill"/>
          </span>
          <div className="min-w-0 pr-5">
            <p className="mb-1.5 text-eyebrow font-semibold uppercase tracking-[0.12em] text-accent-blue-strong">
              {PROMO_EYEBROW}
            </p>
            <p className="mb-1 text-[14.5px] font-medium leading-[1.45] tracking-[-0.01em] text-ink">
              {PROMO_TITLE_BEFORE}{" "}
              <span className="text-[17px] font-semibold text-accent-blue-strong">
                {PROMO_TITLE_HIGHLIGHT}
              </span>{" "}
              {PROMO_TITLE_AFTER}
            </p>
            <p className="mb-3 text-[12.5px] leading-[1.45] text-text-3">{PROMO_LEAD}</p>
            <Link
              href={promoHref(CONTACT_SECTION_ID)}
              onClick={dismiss}
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-text-2 transition-colors duration-250 hover:text-ink"
            >
              {PROMO_CTA}
              <ArrowRightIcon
                size={13}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-250 ease-[cubic-bezier(.2,.8,.25,1)] group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Zavřít nabídku"
          className="absolute right-2.5 top-3 grid size-7 cursor-pointer place-items-center rounded-full text-text-3 transition-colors duration-250 hover:bg-ink/6 hover:text-ink active:bg-ink/6 active:text-ink"
        >
          <XIcon size={13} weight="bold"/>
        </button>
      </div>
    </aside>
  );
};
export default PromoPopup;