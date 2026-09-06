"use client";

import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  //Hooks
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 8 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.width = `${progress * 100}%`;
      bar.style.opacity = progress > 0.001 ? "1" : "0";
    };
    const queue = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-70 h-1">
      <div ref={barRef} className="scroll-progress__bar h-full"/>
    </div>
  );
};
export default ScrollProgress;