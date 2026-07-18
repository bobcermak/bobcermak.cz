"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Hamburger from "./Hamburger";
import { type FC } from "react";

type NavbarClientProps = {
  logo: ReactNode,
  children: ReactNode
};
const NavbarClient: FC<NavbarClientProps> = ({ logo, children }) => {
  const DESKTOP_MQ = "(min-width: 641px)";
  const MENU_ID = "hlavni-menu";
  //Hooks
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = () => setIsOpen(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const desktop = window.matchMedia(DESKTOP_MQ);
    const onDesktop = () => {
      if (desktop.matches) close();
    };
    const list = listRef.current;
    const onLinkClick = (e: Event) => {
      if ((e.target as HTMLElement).closest("a")) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    desktop.addEventListener("change", onDesktop);
    list?.addEventListener("click", onLinkClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
      desktop.removeEventListener("change", onDesktop);
      list?.removeEventListener("click", onLinkClick);
    };
  }, [isOpen]);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center w-container desktop:w-section mx-auto">
      <div ref={rootRef} className="pointer-events-none relative w-full">
        <nav
          aria-label="Hlavní navigace"
          className={`pointer-events-auto relative flex items-center justify-between gap-5 rounded-full pl-5 pr-3
            border border-white/70 backdrop-blur-xl backdrop-saturate-150
            animate-[navDrop_0.7s_cubic-bezier(.2,.8,.25,1)_both]
            transition-[box-shadow,background-color,padding] duration-250 motion-reduce:animate-none
            ${scrolled ? "py-2" : "py-2.75"}
            ${isOpen ? "bg-white/85 shadow-nav" : scrolled ? "bg-white/85 shadow-nav-scrolled" : "bg-white/60 shadow-nav"}`}
        >
          {logo}
          <ul
            ref={listRef}
            id={MENU_ID}
            className={`flex list-none flex-col gap-1 text-sm font-medium
              absolute inset-x-0 top-[calc(100%+8px)] rounded-[22px] border border-border bg-white p-3 shadow-[0_16px_40px_-12px_rgba(30,40,80,0.25)]
              transition-opacity duration-400 ease-[cubic-bezier(.4,0,.2,1)] will-change-[opacity]
              laptop:static laptop:flex-row laptop:items-center laptop:gap-[clamp(6px,1.4vw,14px)]
              laptop:rounded-none laptop:border-0 laptop:bg-transparent laptop:p-0 laptop:shadow-none
              laptop:pointer-events-auto laptop:opacity-100
              ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          >
            {children}
          </ul>
          <Hamburger
            isOpen={isOpen}
            onToggle={() => setIsOpen((prev) => !prev)}
            controls={MENU_ID}
            className="laptop:hidden"
          />
        </nav>
      </div>
    </div>
  );
};
export default NavbarClient;