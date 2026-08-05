"use client";

import type { FC } from "react";
import Modal from "./Modal";
import Button from "@/components/buttons/Button";
import { REPLY_WITHIN_HOURS } from "@/types/lead";

type FormSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  email: string;
  what: string;
  confirmationSent: boolean;
};
const FormSuccessModal: FC<FormSuccessModalProps> = ({
  open,
  onClose,
  name,
  email,
  what,
  confirmationSent,
}) => (
  <Modal open={open} onClose={onClose} labelledBy="form-success-title" accentClass="bg-accent-green">
    <p aria-hidden="true" className="mb-4 text-[44px] leading-none">
      🎉
    </p>
    <h2 id="form-success-title" className="mb-3 text-center text-[1.6rem] leading-tight">
      Díky, {name.trim() || "kámo"}!
    </h2>
    <p className="text-center text-[15px] leading-[1.6]">
      {confirmationSent ? (
        <>
          {what} ti letí na <span className="font-semibold text-ink">{email}</span>.
        </>
      ) : (
        <>
          Mám to. Potvrzovací e-mail se ale nepodařilo odeslat — ozvu se ti na{" "}
          <span className="font-semibold text-ink">{email}</span> i tak.
        </>
      )}
    </p>
    <div className="my-6 h-px bg-border"/>
    <p className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-ink">
      <span aria-hidden="true" className="size-2 rounded-full bg-accent-green motion-safe:animate-pulse"/>
      Ozvu se osobně do {REPLY_WITHIN_HOURS} hodin
    </p>
    <p className="mt-2 text-center text-[12.5px] text-text-3">
      Nezávazně — jen si projdeme, co přesně potřebuješ.
    </p>
    <Button type="button" onClick={onClose} wFull isArrow={false} ariaLabel="Zavřít" className="mt-6">
      Zavřít
    </Button>
  </Modal>
);
export default FormSuccessModal;