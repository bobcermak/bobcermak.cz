"use client";

import { useActionState, useEffect, useRef, useState, type FC } from "react";
import { useSearchParams } from "next/navigation";
import { CheckIcon, SealPercentIcon, WarningIcon } from "@phosphor-icons/react";
import Button from "@/components/buttons/Button";
import FormSuccessModal from "@/components/overlays/FormSuccessModal";
import FormErrorModal from "@/components/overlays/FormErrorModal";
import { submitContact } from "@/lib/actions/contact";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { CONTACT_TOPICS, DEFAULT_TOPIC, MESSAGE_MAX, type ContactTopic } from "@/types/contact";
import { FORM_IDLE, type FormState } from "@/types/formState";
import { PROMO_PARAM, PROMO_PARAM_VALUE } from "@/types/promo";

const FIELD = "w-full rounded-[10px] border border-border-mid bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-250 placeholder:text-placeholder focus:border-ink";
const LABEL = "mb-1.5 block text-[13px] font-medium text-text-2";
const ContactForm = () => {
  //Hooks
  const [state, formAction, sending] = useActionState(submitContact, FORM_IDLE);
  const { promoClaimLabel, promoClaimNote } = useSiteSettings();
  const promo = useSearchParams().get(PROMO_PARAM) === PROMO_PARAM_VALUE;
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [topic, setTopic] = useState<ContactTopic>(DEFAULT_TOPIC);
  const [message, setMessage] = useState<string>("");
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
  const failure = state.status === "failed" && shown ? state : null;
  return (
    <>
      <form action={submit} className="flex flex-col gap-4" noValidate>
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
        {promo && (
          <p className="flex items-start gap-2.5 rounded-[10px] border border-accent-blue-strong/40 bg-accent-blue/12 px-3.5 py-3 text-[13px] font-medium leading-[1.45] text-ink">
            <SealPercentIcon size={17} weight="fill" aria-hidden="true" className="mt-px flex-none text-accent-blue-strong"/>
            <span>
              {promoClaimLabel}
              <span className="mt-0.5 block font-normal text-text-2">{promoClaimNote}</span>
            </span>
          </p>
        )}
        {promo && <input type="hidden" name={PROMO_PARAM} value={PROMO_PARAM_VALUE}/>}
        <div className="grid grid-cols-1 gap-4 xphone:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={LABEL}>
              Jméno
            </label>
            <input
              id="contact-name"
              name="name"
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
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tvůj@email.cz"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearResult();
              }}
              className={FIELD}
            />
          </div>
        </div>
        <fieldset className="min-w-0">
          <legend className={LABEL}>O co jde?</legend>
          <input type="hidden" name="topic" value={topic}/>
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
            name="message"
            required
            rows={5}
            maxLength={MESSAGE_MAX}
            placeholder="S čím můžu pomoct? Pár vět stačí…"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              clearResult();
            }}
            className={`${FIELD} min-h-32 resize-y`}
          />
        </div>
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
            Souhlasím se zpracováním kontaktních údajů za účelem odpovědi.
          </span>
        </label>
        {failure && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-[10px] border border-accent-peach-strong/50 bg-accent-peach-strong/12 px-3 py-2.5 text-[13px] font-medium leading-[1.45] text-ink"
          >
            <WarningIcon size={15} weight="fill" aria-hidden="true" className="mt-px flex-none text-accent-peach-strong"/>
            {failure.message}
          </p>
        )}
        <Button type="submit" wFull disabled={sending} ariaLabel="Odeslat zprávu" className="mt-1">
          {sending ? "Odesílám…" : "Odeslat zprávu"}
        </Button>
      </form>
      <FormSuccessModal
        open={state.status === "sent" && shown}
        onClose={clearResult}
        name={name}
        email={email.trim()}
        what="Kopie zprávy"
        confirmationSent={state.status === "sent" ? state.confirmationSent : true}
      />
      <FormErrorModal
        open={failure?.kind === "send"}
        onClose={clearResult}
        kind="send"
        message={failure?.message ?? ""}
      />
    </>
  );
};
export default ContactForm;