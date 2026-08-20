"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { setLenis } from "@/lib/lenis";
import { enterRoute } from "@/lib/visitedRoutes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
}
export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  //Hooks
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (link.target && link.target !== "_self") return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const targetElem = url.hash ? document.getElementById(url.hash.slice(1)) : null;
      if (!targetElem) return;
      if (url.search === window.location.search) e.preventDefault();
      lenis.scrollTo(targetElem, {
        offset: -80,
        duration: 1.5,
        lock: true
      });
    };
    document.addEventListener("click", handleLinkClick);
    const hash = window.location.hash.slice(1);
    const anchor = window.setTimeout(() => {
      const targetElem = hash ? document.getElementById(hash) : null;
      if (targetElem) lenis.scrollTo(targetElem, { offset: -80, duration: 1.2 });
    }, 120);
    const page = wrapperRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const returning = enterRoute(pathname);
    if (page && !reduced && returning) {
      gsap.fromTo(
        page,
        { opacity: 0, x: 48, scale: 0.985 },
        { opacity: 1, x: 0, scale: 1, duration: 0.55, ease: "power3.out", clearProps: "transform" }
      );
    }
    return () => {
      document.removeEventListener("click", handleLinkClick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(settle);
      window.clearTimeout(late);
      window.clearTimeout(anchor);
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