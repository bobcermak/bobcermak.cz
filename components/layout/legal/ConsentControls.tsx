"use client";

import type { FC } from "react";
import { useConsent } from "@/contexts/ConsentContext";
import { CONSENT_TEXTS } from "@/types/consent";

const LABELS = {
  granted: "Souhlas s analytikou máte udělený.",
  denied: "Analytiku máte odmítnutou — běží tu jen nezbytné cookies.",
  none: "Zatím jste se nerozhodli.",
} as const;
const ConsentControls: FC = () => {
  //Hooks
  const { state, accept, reject } = useConsent();
  const status = state ? LABELS[state.analytics] : LABELS.none;
  return (
    <div className="not-prose rounded-[18px] border border-border bg-bg-soft p-5 xphone:p-6">
      <p className="mb-1 text-[15px] font-semibold text-ink">Vaše nastavení</p>
      <p className="mb-4 text-sm text-text-2">
        {status}
        {state?.decidedAt && (
          <span className="block text-[12.5px] text-text-3">
            Rozhodnuto {new Date(state.decidedAt).toLocaleDateString("cs-CZ")}
          </span>
        )}
      </p>
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={accept}
          disabled={state?.analytics === "granted"}
          className="cursor-pointer rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-250 hover:bg-ink-hover active:bg-ink-hover disabled:pointer-events-none disabled:opacity-40"
        >
          {CONSENT_TEXTS.accept}
        </button>
        <button
          type="button"
          onClick={reject}
          disabled={state?.analytics === "denied"}
          className="cursor-pointer rounded-full border border-border-mid px-5 py-2.5 text-[13px] font-medium text-ink transition-colors duration-250 hover:border-ink hover:bg-ink/3 active:border-ink active:bg-ink/3 disabled:pointer-events-none disabled:opacity-40"
        >
          {CONSENT_TEXTS.reject}
        </button>
      </div>
      <p className="mt-3.5 text-[12.5px] leading-[1.5] text-text-3">
        Odmítnutí zabere okamžitě — měřicí skript se do stránky vůbec nenačte. Pokud už nějaká
        data vznikla, smažou se podle lhůty níž.
      </p>
    </div>
  );
};
export default ConsentControls;