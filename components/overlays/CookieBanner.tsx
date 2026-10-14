"use client";

import { useEffect, useState, type FC } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CookieIcon } from "@phosphor-icons/react";
import { useConsent } from "@/contexts/ConsentContext";
import { onFirstInteraction } from "@/lib/firstInteraction";
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
    let timer = 0;
    const stop = onFirstInteraction(() => {
      timer = window.setTimeout(() => setPhase("in"), CONSENT_DELAY_MS);
    });
    return () => {
      stop();
      window.clearTimeout(timer);
    };
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
      aria-modal="false"
      aria-labelledby="cookie-title"
      className={`fixed inset-x-3 bottom-3 z-90 xphone:inset-x-auto xphone:bottom-5 xphone:left-5 xphone:w-full xphone:max-w-100 ${
        leaving ? "pointer-events-none" : ""
      }`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-nav-scrolled ${
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
        <div className="p-5 pt-6 xphone:p-6 xphone:pt-7">
          <div className="mb-2 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-peach/35 text-accent-peach-strong"
            >
              <CookieIcon size={20} weight="fill"/>
            </span>
            <h2
              id="cookie-title"
              className="text-[1.2rem] font-semibold leading-tight tracking-[-0.02em] text-ink"
            >
              {CONSENT_TEXTS.title}
            </h2>
          </div>
          <p className="mb-1.5 text-[13.5px] leading-[1.5] text-text-2">{CONSENT_TEXTS.lead}</p>
          <p className="mb-5 text-[12.5px] leading-[1.5] text-text-3">{CONSENT_TEXTS.detail}</p>
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
          <p className="mt-4 text-center text-[12.5px] text-text-3">
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