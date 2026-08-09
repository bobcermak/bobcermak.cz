"use client";

import { useActionState, useEffect, useRef, useState, type FC } from "react";
import { ApproximateEqualsIcon, CheckIcon, LockIcon, WarningIcon } from "@phosphor-icons/react";
import Button from "@/components/buttons/Button";
import FormSuccessModal from "@/components/overlays/FormSuccessModal";
import FormErrorModal from "@/components/overlays/FormErrorModal";
import { submitLead } from "@/lib/actions/lead";
import { ACCENT_STYLES, YEARLY_PRICE } from "@/types/calculator";
import { formatCzk, type CalculatorResult } from "@/lib/calculator";
import { type LeadSelection } from "@/types/lead";
import { FORM_IDLE, type FormState } from "@/types/formState";

const FIELD =
  "w-full rounded-[10px] border border-border-mid bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-250 placeholder:text-placeholder focus:border-ink";
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
  const accent = ACCENT_STYLES[result.accent];

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
  return (
    <div
      data-reveal
      className="relative min-w-0 overflow-hidden rounded-[20px] border border-border bg-white p-6 shadow-card xphone:p-7 mlaptop:sticky mlaptop:top-32 desktop:p-8"
    >
      <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 transition-colors duration-250 ${accent.bg}`}/>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
        <span className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-text-3">
          Orientační cena
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
          <ApproximateEqualsIcon size={12} weight="bold" aria-hidden="true"/>
          odhad
        </span>
      </div>
      {result.showCompare && (
        <div className="mb-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-placeholder">
            Jinde by tě to stálo
          </span>
          <span
            className={`text-[1.15rem] font-semibold tabular-nums text-text-3 line-through decoration-2 ${accent.line}`}
          >
            {result.beforeLabel}
          </span>
          <span
            className={`ml-auto inline-flex -rotate-[4deg] items-center rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-primary ${accent.bg}`}
          >
            -{result.discount} %
          </span>
        </div>
      )}
      <p className="text-[clamp(1.9rem,5.2vw,3rem)] font-bold leading-[1.02] tracking-[-0.03em] tabular-nums text-ink">
        {result.rangeLabel}
      </p>
      <p className="mt-2.5 text-xs text-text-3">
        jednorázově · + {formatCzk(YEARLY_PRICE)} Kč / rok za správu
      </p>
      {result.showCompare && (
        <p className="mt-2 flex items-center gap-1.5 text-[12.5px] font-semibold text-text-2">
          <span aria-hidden="true" className={`size-1.5 flex-none rounded-full ${accent.bg}`} />
          ušetříš zhruba {result.savedLabel}
        </p>
      )}
      <div className="my-6 h-px bg-border" />
      {submitted ? (
        <div>
          <p className="mb-3.5 text-eyebrow font-semibold uppercase tracking-[0.12em] text-text-3">
            Rozpad ceny
          </p>
          <dl className="mb-5 flex flex-col gap-2.5">
            {result.rows.map((row) => (
              <div key={row.label} className="flex items-baseline gap-2 text-sm">
                <dt className="min-w-0 text-text-2">{row.label}</dt>
                <span aria-hidden="true" className="-translate-y-[3px] flex-1 border-b border-dotted border-border-mid" />
                <dd className="m-0 whitespace-nowrap font-semibold tabular-nums text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-xl border border-ink p-4 xphone:p-[18px]">
            <p className="mb-1.5 text-[1.05rem] font-semibold text-ink">
              Díky, {name.trim() || "kámo"} 👋
            </p>
            <p className="text-sm leading-[1.55] text-text-2">
              Shrnutí ti posílám na {email}. Ozvu se osobně do 24 hodin.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4 flex items-start gap-2 text-sm leading-[1.5] text-text-2">
            <LockIcon size={16} weight="fill" aria-hidden="true" className="mt-0.5 flex-none text-text-3" />
            Detailní rozpad a shrnutí ti pošlu na e-mail.
          </p>
          <form action={submit} className="flex flex-col gap-2.5" noValidate>
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
            <label className="group flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-[1.45] text-text-3">
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
                className={`mt-px grid size-[18px] flex-none place-items-center rounded-md border-2 transition-[background-color,border-color,box-shadow] duration-250 ease-[cubic-bezier(.2,.8,.25,1)] peer-focus-visible:ring-2 peer-focus-visible:ring-ink/25 ${
                  gdpr
                    ? "border-ink bg-ink text-white"
                    : "border-muted-num bg-white group-hover:border-border-mid group-active:border-border-mid"
                }`}
              >
                {gdpr && <CheckIcon size={11} weight="bold"/>}
              </span>
              <span className="transition-colors duration-250 group-hover:text-text-2 group-active:text-text-2">
                Souhlasím se zpracováním e-mailu za účelem zaslání kalkulace a kontaktu.
              </span>
            </label>
            {failure && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-[10px] border border-accent-peach-strong/50 bg-accent-peach-strong/12 px-3 py-2.5 text-[13px] font-medium leading-[1.45] text-ink"
              >
                <WarningIcon
                  size={15}
                  weight="fill"
                  aria-hidden="true"
                  className="mt-px flex-none text-accent-peach-strong"
                />
                {failure.message}
              </p>
            )}
            <Button
              type="submit"
              variant="dark"
              wFull
              disabled={sending}
              ariaLabel="Odeslat poptávku a zobrazit rozpad ceny"
              className="mt-1 min-[376px]:hidden"
            >
              {sending ? "Odesílám…" : "Zobrazit rozpad ceny"}
            </Button>
            <Button
              type="submit"
              wFull
              disabled={sending}
              ariaLabel="Odeslat poptávku a zobrazit rozpad ceny"
              className="mt-1 hidden min-[376px]:inline-flex"
            >
              {sending ? "Odesílám…" : "Zobrazit rozpad ceny"}
            </Button>
            <p className="text-center text-[11.5px] text-placeholder">
              Žádný spam. Pošlu ti shrnutí a ozvu se osobně.
            </p>
          </form>
        </div>
      )}
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