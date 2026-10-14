"use client";

import type { FC } from "react";
import { useConsent } from "@/contexts/ConsentContext";
import { CONSENT_TEXTS } from "@/types/consent";
import Button from "@/components/buttons/Button";

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
        <Button
          type="button"
          onClick={accept}
          disabled={state?.analytics === "granted"}
          ariaLabel={CONSENT_TEXTS.accept}
        >
          {CONSENT_TEXTS.accept}
        </Button>
        <Button
          type="button"
          variant="dark"
          onClick={reject}
          disabled={state?.analytics === "denied"}
          ariaLabel={CONSENT_TEXTS.reject}
        >
          {CONSENT_TEXTS.reject}
        </Button>
      </div>
      <p className="mt-3.5 text-[12.5px] leading-[1.5] text-text-3">
        Odmítnutí zabere okamžitě — dokud souhlas nedáte, měřicí skript se do stránky vůbec
        nenačte. Když souhlas odvoláte, dostane Clarity pokyn přestat měřit a smazat svoje
        cookies. Pokud už nějaká data vznikla, smažou se podle lhůty níž.
      </p>
    </div>
  );
};
export default ConsentControls;