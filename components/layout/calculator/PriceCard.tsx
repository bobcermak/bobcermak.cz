"use client";

import { useEffect, useRef, useState, type FC, type FormEvent } from "react";
import { ApproximateEqualsIcon, CheckIcon, LockIcon, WarningIcon } from "@phosphor-icons/react";
import Button from "@/components/buttons/Button";
import LeadModal from "./LeadModal";
import LeadErrorModal, { type LeadErrorKind } from "./LeadErrorModal";
import { ACCENT_STYLES, YEARLY_PRICE } from "@/types/calculator";
import { formatCzk, type CalculatorResult } from "@/lib/calculator";
import { LEAD_ENDPOINT, type LeadResponse, type LeadSelection } from "@/types/lead";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const FIELD =
  "w-full rounded-[10px] border border-border-mid bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-250 placeholder:text-placeholder focus:border-ink";
type PriceCardProps = {
  result: CalculatorResult;
  yearly: boolean;
  selection: LeadSelection;
};
const PriceCard: FC<PriceCardProps> = ({ result, yearly, selection }) => {
  //Hooks
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gdpr, setGdpr] = useState<boolean>(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [failure, setFailure] = useState<{ kind: LeadErrorKind; message: string } | null>(null);
  const [sending, setSending] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmationSent, setConfirmationSent] = useState<boolean>(true);
  const openedAt = useRef<number>(0);
  const accent = ACCENT_STYLES[result.accent];

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
  const reject = (kind: LeadErrorKind, message: string) => {
    setError(message);
    setFailure({ kind, message });
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending) return;
    if (!EMAIL.test(email.trim())) return reject("form", "Zadejte platný e-mail.");
    if (!gdpr) return reject("form", "Potřebuju souhlas se zpracováním e-mailu.");
    setError("");
    setFailure(null);
    setSending(true);
    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selection,
          email: email.trim(),
          name: name.trim(),
          gdpr,
          company: honeypotRef.current?.value ?? "",
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      const data: LeadResponse = await response.json();
      if (!data.ok) {
        reject("send", data.error);
        return;
      }
      setConfirmationSent(data.confirmationSent);
      setSubmitted(true);
      setModalOpen(true);
    } catch {
      reject("send", "Nepodařilo se spojit se serverem. Zkontrolujte připojení a zkuste to znovu.");
    } finally {
      setSending(false);
    }
  };
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
        {yearly ? `+ ${formatCzk(YEARLY_PRICE)} Kč / rok za správu` : "jednorázová realizace · správa volitelně"}
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
          <form onSubmit={submit} className="flex flex-col gap-2.5" noValidate>
            <input
              ref={honeypotRef}
              type="text"
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
              autoComplete="name"
              placeholder="Jméno (volitelné)"
              aria-label="Jméno"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={FIELD}
            />
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="tvůj@email.cz"
              aria-label="E-mail"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              className={FIELD}
            />
            <label className="group flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-[1.45] text-text-3">
              <input
                type="checkbox"
                checked={gdpr}
                onChange={(event) => {
                  setGdpr(event.target.checked);
                  setError("");
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
            {error && (
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
                {error}
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
      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        name={name}
        email={email.trim()}
        confirmationSent={confirmationSent}
      />
      <LeadErrorModal
        open={!!failure}
        onClose={() => setFailure(null)}
        kind={failure?.kind ?? "send"}
        message={failure?.message ?? ""}
      />
    </div>
  );
};
export default PriceCard;