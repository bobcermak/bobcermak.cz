"use client";

import type { FC } from "react";
import Modal from "@/components/overlays/Modal";
import Button from "@/components/buttons/Button";
import { FALLBACK_CONTACT } from "@/types/lead";

export type LeadErrorKind = "form" | "send";
type LeadErrorModalProps = {
  open: boolean;
  onClose: () => void;
  kind: LeadErrorKind;
  message: string;
};
const LeadErrorModal: FC<LeadErrorModalProps> = ({ open, onClose, kind, message }) => {
  const isForm = kind === "form";
  return (
    <Modal open={open} onClose={onClose} labelledBy="lead-error-title" accentClass="bg-accent-peach-strong">
      <p aria-hidden="true" className="mb-4 text-[44px] leading-none">
        {isForm ? "✍️" : "😕"}
      </p>
      <h2 id="lead-error-title" className="mb-3 text-center text-[1.6rem] leading-tight">
        {isForm ? "Ještě to nejde odeslat" : "Tohle se nepovedlo"}
      </h2>
      <p className="text-center text-[15px] leading-[1.6]">{message}</p>
      <div className="my-6 h-px bg-border"/>
      {isForm ? (
        <p className="text-center text-[13px] leading-[1.5] text-text-2">
          Doplňte to prosím ve formuláři a zkuste to znovu — vyplněné údaje zůstávají.
        </p>
      ) : (
        <p className="text-center text-[13px] leading-[1.5] text-text-2">
          Poptávka se ke mně nedostala. Zkuste to prosím znovu, a kdyby to zlobilo dál, napište mi
          rovnou na{" "}
          <a
            href={`mailto:${FALLBACK_CONTACT}`}
            className="font-semibold text-ink underline transition-colors duration-250 hover:text-text-2 active:text-text-2"
          >
            {FALLBACK_CONTACT}
          </a>{" "}
          — dorazí to stejně.
        </p>
      )}
      <Button
        type="button"
        variant="dark"
        onClick={onClose}
        wFull
        isArrow={false}
        ariaLabel={isForm ? "Zpět na formulář" : "Zkusit znovu"}
        className="mt-6"
      >
        {isForm ? "Zpět na formulář" : "Zkusit znovu"}
      </Button>
    </Modal>
  );
};
export default LeadErrorModal;