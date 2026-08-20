"use client";

import { useEffect, useRef, type FC } from "react";

type Blob = {
  className: string;
  rgb: string;
  alpha: number;
  drift: { x: number; y: number };
  freq: { x: number; y: number };
  parallax: { x: number; y: number };
  breath: { amount: number; freq: number };
};
const BLOBS: Blob[] = [
  {
    className: "left-[-8vw] top-[-16vw] h-[62vw] w-[62vw] blur-[64px]",
    rgb: "150 172 232",
    alpha: 0.62,
    drift: { x: 7, y: 6 },
    freq: { x: 0.021, y: 0.017 },
    parallax: { x: 240, y: 240 },
    breath: { amount: 0.18, freq: 0.013 },
  },
  {
    className: "right-[-10vw] top-[8vw] h-[54vw] w-[54vw] blur-[68px]",
    rgb: "243 204 178",
    alpha: 0.6,
    drift: { x: 6, y: 8 },
    freq: { x: 0.017, y: 0.023 },
    parallax: { x: -300, y: -220 },
    breath: { amount: 0.2, freq: 0.011 },
  },
  {
    className: "left-[22vw] top-[52vw] h-[50vw] w-[50vw] blur-[70px]",
    rgb: "206 190 236",
    alpha: 0.58,
    drift: { x: 8, y: 5 },
    freq: { x: 0.025, y: 0.015 },
    parallax: { x: 185, y: -175 },
    breath: { amount: 0.16, freq: 0.016 },
  },
  {
    className: "right-[14vw] bottom-[-8vw] h-[40vw] w-[40vw] blur-[64px]",
    rgb: "138 185 143",
    alpha: 0.5,
    drift: { x: 5, y: 7 },
    freq: { x: 0.019, y: 0.021 },
    parallax: { x: -160, y: 210 },
    breath: { amount: 0.18, freq: 0.014 },
  },
];
const TAU = Math.PI * 2;
const EASING = 0.08;
const FRAME_STEP = 1000 / 30;
const blobBackground = ({ rgb, alpha }: Blob) =>
  `radial-gradient(circle at 50% 50%, rgb(${rgb} / ${alpha}), rgb(${rgb} / 0) 62%)`;
const ReactiveBg: FC = () => {
  //Hooks
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const blobs = blobRefs.current;
    if (!blobs.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollable = 0;
    const measure = () => {
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
    };
    measure();
    const onMouse = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      targetX = (touch.clientX / window.innerWidth - 0.5) * 2;
      targetY = (touch.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      targetY = (progress - 0.5) * 2;
      targetX = Math.sin(progress * 5) * 0.6;
    };
    if (fine) {
      window.addEventListener("mousemove", onMouse, { passive: true });
    } else {
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    window.addEventListener("resize", measure, { passive: true });
    const start = performance.now();
    let frame = 0;
    let last = 0;
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - last < FRAME_STEP) return;
      last = now;
      currentX += (targetX - currentX) * EASING;
      currentY += (targetY - currentY) * EASING;
      const elapsed = (now - start) / 1000;
      const vw = window.innerWidth / 100;
      BLOBS.forEach((blob, i) => {
        const el = blobs[i];
        if (!el) return;
        const driftX = Math.sin(elapsed * blob.freq.x * TAU + i) * blob.drift.x * vw;
        const driftY = Math.cos(elapsed * blob.freq.y * TAU + i * 1.3) * blob.drift.y * vw;
        const x = driftX + currentX * blob.parallax.x;
        const y = driftY + currentY * blob.parallax.y;
        const breath = 1 - blob.breath.amount * (0.5 + 0.5 * Math.sin(elapsed * blob.breath.freq * TAU + i));
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        el.style.opacity = breath.toFixed(3);
      });
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {BLOBS.map((blob, i) => (
        <div
          key={blob.className}
          ref={(el) => {
            blobRefs.current[i] = el;
          }}
          className={`absolute rounded-full will-change-[transform,opacity] ${blob.className}`}
          style={{ background: blobBackground(blob) }}
        />
      ))}
    </div>
  );
};
export default ReactiveBg;