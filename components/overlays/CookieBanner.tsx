"use client";

import { useEffect, useState, type FC } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CookieIcon } from "@phosphor-icons/react";
import { useConsent } from "@/contexts/ConsentContext";
import { CONSENT_DELAY_MS, CONSENT_TEXTS } from "@/types/consent";
import Button from "../buttons/Button";

const LEAVE_MS = 260;
type Phase = "hidden" | "in" | "out";
const STRIPE = ["bg-accent-blue", "bg-accent-peach", "bg-accent-purple", "bg-ink"] as const;
const CookieBanner: FC = () => {
  //Hooks
  const { state, accept, reject } = useConsent();
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (state) return;
    const timer = window.setTimeout(() => setPhase("in"), CONSENT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [state]);
  useEffect(() => {
    if (phase !== "out") return;
    const timer = window.setTimeout(() => setPhase("hidden"), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);
  const close = (decide: () => void) => () => {
    decide();
    setPhase("out");
  };
  if (phase === "hidden" || typeof document === "undefined") return null;
  const leaving = phase === "out";
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className={`fixed inset-0 z-90 grid place-items-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-md ${
        leaving
          ? "pointer-events-none motion-safe:animate-[fadeOut_0.26s_ease-in_both]"
          : "motion-safe:animate-[fadeIn_0.25s_ease-out_both]"
      }`}
    >
      <div
        className={`relative w-full max-w-107 overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-nav ${
          leaving
            ? "motion-safe:animate-[floatDown_0.26s_cubic-bezier(.4,0,.9,.3)_both]"
            : "motion-safe:animate-[floatUp_0.45s_cubic-bezier(.2,.8,.25,1)_both]"
        }`}
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 flex h-1">
          {STRIPE.map((color) => (
            <span key={color} className={`flex-1 ${color}`}/>
          ))}
        </span>
        <div className="p-7 pt-8 xphone:p-9 xphone:pt-10">
          <span
            aria-hidden="true"
            className="mb-5 grid size-13 place-items-center rounded-2xl bg-accent-peach/35 text-accent-peach-strong"
          >
            <CookieIcon size={26} weight="fill"/>
          </span>
          <h2
            id="cookie-title"
            className="mb-2.5 text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-ink"
          >
            {CONSENT_TEXTS.title}
          </h2>
          <p className="mb-2.5 text-[14.5px] leading-[1.55] text-text-2">{CONSENT_TEXTS.lead}</p>
          <p className="mb-7 text-[13px] leading-[1.5] text-text-3">{CONSENT_TEXTS.detail}</p>
          <div className="flex flex-col gap-2.5">
            <Button
              type="button"
              onClick={close(accept)}
              wFull
              ariaLabel={CONSENT_TEXTS.accept}
            >
              {CONSENT_TEXTS.accept}
            </Button>
            <Button
              type="button"
              variant="dark"
              onClick={close(reject)}
              wFull
              ariaLabel={CONSENT_TEXTS.reject}
            >
              {CONSENT_TEXTS.reject}
            </Button>
          </div>
          <p className="mt-5 text-center text-[12.5px] text-text-3">
            <Link
              href="/cookies"
              className="font-medium underline underline-offset-[3px] transition-colors duration-250 hover:text-ink active:text-ink"
            >
              {CONSENT_TEXTS.more}
            </Link>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default CookieBanner;