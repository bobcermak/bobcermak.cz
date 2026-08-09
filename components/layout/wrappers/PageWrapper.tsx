"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { setLenis } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  //Hooks
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    const settle = window.setTimeout(refresh, 500);
    const late = window.setTimeout(refresh, 2000);
    window.addEventListener("load", refresh);
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || !href.includes("#")) return;
      const [path, hash] = href.split("#");
      if ((path === "" || path === pathname) && hash) {
        const targetElem = document.getElementById(hash);
        if (targetElem) {
          e.preventDefault();
          lenis.scrollTo(targetElem, {
            offset: -80,
            duration: 1.5,
            lock: true
          });
        }
      }
    };
    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(settle);
      window.clearTimeout(late);
      setLenis(null);
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, { scope: wrapperRef, dependencies: [pathname] });
  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
};
export default PageWrapper;