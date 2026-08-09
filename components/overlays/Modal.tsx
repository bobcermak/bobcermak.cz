"use client";

import { useEffect, useRef, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "@phosphor-icons/react";
import { lockScroll, unlockScroll } from "@/lib/lenis";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  accentClass: string;
  wide?: boolean;
  children: ReactNode;
};
const Modal: FC<ModalProps> = ({ open, onClose, labelledBy, accentClass, wide = false, children }) => {
  //Hooks
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    lockScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      restoreRef.current?.focus();
    };
  }, [open]);
  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div
      className="fixed inset-0 z-100 grid place-items-center overflow-y-auto bg-ink/45 p-4 backdrop-blur-sm motion-safe:animate-[fadeIn_0.2s_ease-out_both]"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={`relative w-full overflow-hidden rounded-[26px] border border-white/70 bg-white p-7 text-center shadow-nav outline-none xphone:p-9 motion-safe:animate-[floatUp_0.4s_cubic-bezier(.2,.8,.25,1)_both] ${
          wide ? "my-8 max-w-3xl" : "max-w-105"
        }`}
      >
        <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${accentClass}`}/>
        <button
          type="button"
          onClick={onClose}
          aria-label="Zavřít"
          className="absolute right-4 top-4 grid size-9 cursor-pointer place-items-center rounded-full text-text-3 transition-colors duration-250 hover:bg-bg-tint hover:text-ink active:bg-bg-tint active:text-ink"
        >
          <XIcon size={18} weight="bold"/>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
export default Modal;