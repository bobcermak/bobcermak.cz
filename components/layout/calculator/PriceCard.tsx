"use client";

import { useActionState, useEffect, useRef, useState, type FC } from "react";
import { CheckIcon, WarningIcon } from "@phosphor-icons/react";
import FormSuccessModal from "@/components/overlays/FormSuccessModal";
import FormErrorModal from "@/components/overlays/FormErrorModal";
import PriceDonut from "./PriceDonut";
import { submitLead } from "@/lib/actions/lead";
import PromoClaim from "@/components/layout/PromoClaim";
import { YEARLY_PRICE } from "@/types/calculator";
import { formatCzk, type CalculatorResult } from "@/lib/calculator";
import { type LeadSelection } from "@/types/lead";
import { FORM_IDLE, type FormState } from "@/types/formState";
import { Button } from "@/components";

const FIELD = "w-full rounded-xl border border-white/25 bg-white/15 px-4 py-3 text-[15px] text-white outline-none transition-colors duration-250 placeholder:text-white/65 focus:border-white focus:bg-white/25";
type PriceCardProps = {
  result: CalculatorResult;
  selection: LeadSelection;
};
const PriceCard: FC<PriceCardProps> = ({ result, selection }) => {
  //Hooks
  const [state, formAction, sending] = useActionState(
    submitLead.bind(null, selection),
    FORM_IDLE
  );
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gdpr, setGdpr] = useState<boolean>(false);
  const [dismissedState, setDismissedState] = useState<FormState | null>(null);
  const openedAt = useRef<number>(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
  const submit = (data: FormData) => {
    data.set("elapsedMs", String(Date.now() - openedAt.current));
    formAction(data);
  };
  const clearResult = () => setDismissedState(state);
  const shown = state !== dismissedState;
  const submitted = state.status === "sent";
  const failure = state.status === "failed" && shown ? state : null;
  const paidShare = result.showCompare ? (100 - result.discount) / 100 : 1;
  const paidPct = Math.round(paidShare * 100);
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-[26px] shadow-card">
      <div className="flex flex-1 flex-col justify-center bg-ink p-6 text-white xphone:p-7 laptop:p-8">
        {submitted ? (
          <div>
            <p className="mb-4 text-eyebrow font-semibold uppercase tracking-[0.12em] text-white/50">
              Rozpad ceny
            </p>
            <dl className="flex flex-col gap-2.5">
              {result.rows.map((row) => (
                <div key={row.label} className="flex items-baseline gap-2 text-[13px]">
                  <dt className="min-w-0 text-white/65">{row.label}</dt>
                  <span aria-hidden="true" className="-translate-y-[3px] flex-1 border-b border-dotted border-white/25"/>
                  <dd className="m-0 whitespace-nowrap font-semibold tabular-nums">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-6">
            <div className="min-w-0 flex-1">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
                  <span aria-hidden="true" className="size-2 flex-none rounded-full bg-accent-blue"/>
                  Tvoje cena
                </p>
                <p className="mt-1.5 text-[1.45rem] font-semibold leading-none tabular-nums text-white">
                  {result.oneTimeLabel}
                  {result.showCompare && (
                    <span className="ml-1.5 text-[13px] font-medium text-white/50">({paidPct} %)</span>
                  )}
                </p>
              </div>
              <div className="mt-5">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
                  <span aria-hidden="true" className="size-2 flex-none rounded-full bg-white/25"/>
                  Ušetříš
                </p>
                <p className="mt-1.5 text-[1.45rem] font-semibold leading-none tabular-nums text-white">
                  {result.showCompare ? result.savedLabel : "—"}
                  {result.showCompare && (
                    <span className="ml-1.5 text-[13px] font-medium text-white/50">({100 - paidPct} %)</span>
                  )}
                </p>
              </div>
            </div>
            <PriceDonut share={paidShare}/>
          </div>
        )}
      </div>
      <div className="flex flex-col bg-accent-blue-strong p-6 text-white xphone:p-7 laptop:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
          Orientační cena projektu
        </p>
        <p className="mt-1.5 text-[clamp(1.5rem,2.8vw,2.05rem)] font-bold leading-[1.1] tracking-[-0.03em] tabular-nums text-white">
          {result.rangeLabel}
        </p>
        <p className="mt-1.5 text-xs text-white/70">
          jednorázově · + {formatCzk(YEARLY_PRICE)} Kč / rok za správu
        </p>
        {submitted ? (
          <div className="mt-6">
            <p className="mb-1.5 text-[1.05rem] font-semibold text-white">Díky, {name.trim() || "kámo"} 👋</p>
            <p className="text-sm leading-[1.55] text-white/80">
              Shrnutí ti posílám na {email}. Ozvu se osobně do 24 hodin.
            </p>
          </div>
        ) : (
          <form action={submit} className="mt-5 flex flex-col gap-2" noValidate>
            <PromoClaim/>
            <input
              type="text"
              name="company"
              defaultValue=""
              readOnly
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              data-lpignore="true"
              data-1p-ignore
              data-form-type="other"
              className="pointer-events-none absolute size-px opacity-0"
            />
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Jméno (volitelné)"
              aria-label="Jméno"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={FIELD}
            />
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="tvůj@email.cz"
              aria-label="E-mail"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearResult();
              }}
              className={FIELD}
            />
            <label className="group flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-[1.45] text-white/75">
              <input
                type="checkbox"
                name="gdpr"
                checked={gdpr}
                onChange={(event) => {
                  setGdpr(event.target.checked);
                  clearResult();
                }}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-px grid size-[18px] flex-none place-items-center rounded-md border-[1.5px] transition-colors duration-250 peer-focus-visible:ring-2 peer-focus-visible:ring-white/50 ${
                  gdpr ? "border-white bg-white text-accent-blue-strong" : "border-white/50 bg-transparent"
                }`}
              >
                {gdpr && <CheckIcon size={11} weight="bold"/>}
              </span>
              <span className="transition-colors duration-250 group-hover:text-white group-active:text-white">
                Souhlasím se zpracováním e-mailu pro zaslání kalkulace a kontaktu.
              </span>
            </label>
            {failure && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl bg-white/20 px-3.5 py-2.5 text-[13px] font-medium leading-[1.45] text-white"
              >
                <WarningIcon size={15} weight="fill" aria-hidden="true" className="mt-px flex-none"/>
                {failure.message}
              </p>
            )}
            <Button type="submit" variant="primary-light" wFull disabled={sending} ariaLabel="Odeslat poptávku a zobrazit rozpad ceny" className="mt-1.5">
              {sending ? "Odesílám…" : "Zobrazit rozpad ceny"}
            </Button>
            <p className="text-center text-[11.5px] text-white/60">
              Žádný spam. Pošlu ti shrnutí a ozvu se osobně.
            </p>
          </form>
        )}
      </div>
      <FormSuccessModal
        open={submitted && shown}
        onClose={clearResult}
        name={name}
        email={email.trim()}
        what="Potvrzení se shrnutím"
        confirmationSent={state.status === "sent" ? state.confirmationSent : true}
      />
      <FormErrorModal
        open={failure?.kind === "send"}
        onClose={clearResult}
        kind="send"
        message={failure?.message ?? ""}
      />
    </div>
  );
};
export default PriceCard;