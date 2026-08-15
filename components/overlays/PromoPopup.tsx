"use client";

import { useEffect, useState, type FC } from "react";
import Link from "next/link";
import { ArrowRightIcon, SealPercentIcon, XIcon } from "@phosphor-icons/react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useConsent } from "@/contexts/ConsentContext";
import { CALCULATOR_SECTION_ID } from "@/lib/calculator";
import { PROMO_STORAGE_KEY, promoHref } from "@/types/promo";

const storageKey = (version: string) => (version ? `${PROMO_STORAGE_KEY}:${version}` : PROMO_STORAGE_KEY);
const wasDismissed = (version: string) => {
  try {
    return sessionStorage.getItem(storageKey(version)) === "1";
  } catch {
    return false;
  }
};
const rememberDismissed = (version: string) => {
  try {
    sessionStorage.setItem(storageKey(version), "1");
  } catch {
  }
};
const LEAVE_MS = 320;
type Phase = "hidden" | "in" | "out";
type PromoPopupProps = {
  delay?: number;
};
const PromoPopup: FC<PromoPopupProps> = ({ delay }) => {
  //Hooks
  const {
    updatedAt,
    promoEnabled,
    promoEyebrow,
    promoTitleBefore,
    promoTitleHighlight,
    promoTitleAfter,
    promoLead,
    promoCta,
    promoDelayMs,
  } = useSiteSettings();
  const { state: consent } = useConsent();
  const [phase, setPhase] = useState<Phase>("hidden");
  const wait = delay ?? promoDelayMs;

  useEffect(() => {
    if (!promoEnabled || !consent || wasDismissed(updatedAt)) return;
    const timer = window.setTimeout(() => setPhase("in"), wait);
    return () => window.clearTimeout(timer);
  }, [promoEnabled, consent, updatedAt, wait]);
  useEffect(() => {
    if (phase !== "out") return;
    const timer = window.setTimeout(() => setPhase("hidden"), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);
  const dismiss = () => {
    rememberDismissed(updatedAt);
    setPhase("out");
  };
  if (phase === "hidden" || !promoEnabled) return null;
  return (
    <aside
      aria-label="Nabídka slevy"
      className={`fixed bottom-4 right-4 z-45 w-[calc(100%-2rem)] max-w-95 xphone:bottom-6 xphone:right-6 ${
        phase === "out"
          ? "pointer-events-none motion-safe:animate-[promoOut_0.32s_cubic-bezier(.4,0,.9,.3)_both]"
          : "motion-safe:animate-[promoIn_0.6s_cubic-bezier(.22,1.15,.36,1)_both]"
      }`}
    >
      <div className="relative overflow-hidden rounded-[18px] border border-border bg-white shadow-[0_1px_3px_rgba(17,17,17,0.04),0_10px_34px_rgba(111,134,214,0.22)] backdrop-blur-md">
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
              {promoEyebrow}
            </p>
            <p className="mb-1 text-[14.5px] font-medium leading-[1.45] tracking-[-0.01em] text-ink">
              {promoTitleBefore}{" "}
              <span className="text-[17px] font-semibold text-accent-blue-strong">
                {promoTitleHighlight}
              </span>{" "}
              {promoTitleAfter}
            </p>
            <p className="mb-3 text-[12.5px] leading-[1.45] text-text-3">{promoLead}</p>
            <Link
              href={promoHref(CALCULATOR_SECTION_ID)}
              scroll={false}
              onClick={dismiss}
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-text-2 transition-colors duration-250 hover:text-ink"
            >
              {promoCta}
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