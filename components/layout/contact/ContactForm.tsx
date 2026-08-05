"use client";

import { useEffect, useRef, useState, type FC, type FormEvent } from "react";
import { CheckIcon, WarningIcon } from "@phosphor-icons/react";
import Button from "@/components/buttons/Button";
import FormSuccessModal from "@/components/overlays/FormSuccessModal";
import FormErrorModal, { type FormErrorKind } from "@/components/overlays/FormErrorModal";
import { CONTACT_ENDPOINT, CONTACT_TOPICS, DEFAULT_TOPIC, MESSAGE_MAX, type ContactTopic } from "@/types/contact";
import type { LeadResponse } from "@/types/lead";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const FIELD = "w-full rounded-[10px] border border-border-mid bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-250 placeholder:text-placeholder focus:border-ink";
const LABEL = "mb-1.5 block text-[13px] font-medium text-text-2";
const ContactForm: FC = () => {
  //Hooks
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [topic, setTopic] = useState<ContactTopic>(DEFAULT_TOPIC);
  const [message, setMessage] = useState<string>("");
  const [gdpr, setGdpr] = useState<boolean>(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [failure, setFailure] = useState<{ kind: FormErrorKind; message: string } | null>(null);
  const [sending, setSending] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [confirmationSent, setConfirmationSent] = useState<boolean>(true);
  const openedAt = useRef<number>(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
  const reject = (kind: FormErrorKind, text: string) => {
    setError(text);
    setFailure({ kind, message: text });
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending) return;
    if (!EMAIL.test(email.trim())) return reject("form", "Zadejte platný e-mail.");
    if (!message.trim()) return reject("form", "Napište prosím pár vět, s čím můžu pomoct.");
    if (!gdpr) return reject("form", "Potřebuju souhlas se zpracováním údajů.");
    setError("");
    setFailure(null);
    setSending(true);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
          message: message.trim(),
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
      setDone(true);
    } catch {
      reject("send", "Nepodařilo se spojit se serverem. Zkontrolujte připojení a zkuste to znovu.");
    } finally {
      setSending(false);
    }
  };
  return (
    <>
      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
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
        <div className="grid grid-cols-1 gap-4 xphone:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={LABEL}>
              Jméno
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder="Jak ti mám říkat?"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={LABEL}>
              E-mail
            </label>
            <input
              id="contact-email"
              type="email"
              required
              autoComplete="email"
              placeholder="tvůj@email.cz"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              className={FIELD}
            />
          </div>
        </div>
        <fieldset className="min-w-0">
          <legend className={LABEL}>O co jde?</legend>
          <div className="flex flex-wrap gap-2">
            {CONTACT_TOPICS.map((item) => {
              const on = item === topic;
              return (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setTopic(item)}
                  className={`cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors duration-250 ${
                    on
                      ? "border-ink bg-ink text-white"
                      : "border-border-mid text-text-2 hover:border-ink hover:text-ink active:border-ink active:text-ink"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </fieldset>
        <div>
          <label htmlFor="contact-message" className={LABEL}>
            Zpráva
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            maxLength={MESSAGE_MAX}
            placeholder="S čím můžu pomoct? Pár vět stačí…"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              setError("");
            }}
            className={`${FIELD} min-h-32 resize-y`}
          />
        </div>
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
            Souhlasím se zpracováním kontaktních údajů za účelem odpovědi.
          </span>
        </label>
        {error && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-[10px] border border-accent-peach-strong/50 bg-accent-peach-strong/12 px-3 py-2.5 text-[13px] font-medium leading-[1.45] text-ink"
          >
            <WarningIcon size={15} weight="fill" aria-hidden="true" className="mt-px flex-none text-accent-peach-strong"/>
            {error}
          </p>
        )}
        <Button type="submit" wFull disabled={sending} ariaLabel="Odeslat zprávu" className="mt-1">
          {sending ? "Odesílám…" : "Odeslat zprávu"}
        </Button>
      </form>
      <FormSuccessModal
        open={done}
        onClose={() => setDone(false)}
        name={name}
        email={email.trim()}
        what="Kopie zprávy"
        confirmationSent={confirmationSent}
      />
      <FormErrorModal
        open={!!failure}
        onClose={() => setFailure(null)}
        kind={failure?.kind ?? "send"}
        message={failure?.message ?? ""}
      />
    </>
  );
};
export default ContactForm;