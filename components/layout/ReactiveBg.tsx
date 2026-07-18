"use client";

import { useEffect, useRef, type FC } from "react";

type Blob = {
  /** Pozice, velikost a blur — statické, řeší je Tailwind. */
  className: string;
  /** RGB složky akcentu; alfa se dopočítá zvlášť pro střed a okraj gradientu. */
  rgb: string;
  alpha: number;
  /** Amplituda autonomního driftu ve vw. */
  drift: { x: number; y: number };
  /** Frekvence driftu v Hz. */
  freq: { x: number; y: number };
  /** Vliv kurzoru/scrollu v px. */
  parallax: { x: number; y: number };
  /** Dýchání — amplituda jako podíl a frekvence v Hz. */
  breath: { amount: number; freq: number };
};

const BLOBS: Blob[] = [
  {
    className: "left-[-8vw] top-[-16vw] h-[62vw] w-[62vw] blur-[90px]",
    rgb: "150 172 232",
    alpha: 0.62,
    drift: { x: 7, y: 6 },
    freq: { x: 0.021, y: 0.017 },
    parallax: { x: 240, y: 240 },
    breath: { amount: 0.06, freq: 0.013 },
  },
  {
    className: "right-[-10vw] top-[8vw] h-[54vw] w-[54vw] blur-[96px]",
    rgb: "243 204 178",
    alpha: 0.6,
    drift: { x: 6, y: 8 },
    freq: { x: 0.017, y: 0.023 },
    parallax: { x: -300, y: -220 },
    breath: { amount: 0.07, freq: 0.011 },
  },
  {
    className: "left-[22vw] top-[52vw] h-[50vw] w-[50vw] blur-[100px]",
    rgb: "206 190 236",
    alpha: 0.58,
    drift: { x: 8, y: 5 },
    freq: { x: 0.025, y: 0.015 },
    parallax: { x: 185, y: -175 },
    breath: { amount: 0.05, freq: 0.016 },
  },
  {
    className: "right-[14vw] bottom-[-8vw] h-[40vw] w-[40vw] blur-[90px]",
    rgb: "138 185 143",
    alpha: 0.5,
    drift: { x: 5, y: 7 },
    freq: { x: 0.019, y: 0.021 },
    parallax: { x: -160, y: 210 },
    breath: { amount: 0.06, freq: 0.014 },
  },
];

const TAU = Math.PI * 2;
/** Jak rychle cíl dohání kurzor — nižší = línější. */
const EASING = 0.08;

const blobBackground = ({ rgb, alpha }: Blob) =>
  `radial-gradient(circle at 50% 50%, rgb(${rgb} / ${alpha}), rgb(${rgb} / 0) 62%)`;

const ReactiveBg: FC = () => {
  //Hooks
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const blobs = blobRefs.current;
    if (!blobs.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Bez pohybu nemá smysl držet běžící RAF — bloby zůstanou na svých místech.
    if (reduced) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouse = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    // Na dotyku není kurzor — parallax řídí prst a doplňkově scroll.
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      targetX = (touch.clientX / window.innerWidth - 0.5) * 2;
      targetY = (touch.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      targetY = (progress - 0.5) * 2;
      targetX = Math.sin(progress * 5) * 0.6;
    };

    if (fine) {
      window.addEventListener("mousemove", onMouse);
    } else {
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const start = performance.now();
    let frame = 0;
    const loop = (now: number) => {
      currentX += (targetX - currentX) * EASING;
      currentY += (targetY - currentY) * EASING;
      const elapsed = (now - start) / 1000;
      BLOBS.forEach((blob, i) => {
        const el = blobs[i];
        if (!el) return;
        const driftX = Math.sin(elapsed * blob.freq.x * TAU + i) * blob.drift.x;
        const driftY = Math.cos(elapsed * blob.freq.y * TAU + i * 1.3) * blob.drift.y;
        const scale = 1 + Math.sin(elapsed * blob.breath.freq * TAU + i) * blob.breath.amount;
        const x = `calc(${driftX.toFixed(3)}vw + ${(currentX * blob.parallax.x).toFixed(2)}px)`;
        const y = `calc(${driftY.toFixed(3)}vw + ${(currentY * blob.parallax.y).toFixed(2)}px)`;
        el.style.transform = `translate(${x}, ${y}) scale(${scale.toFixed(4)})`;
      });
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
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
          className={`absolute rounded-full will-change-transform ${blob.className}`}
          style={{ background: blobBackground(blob) }}
        />
      ))}
    </div>
  );
};
export default ReactiveBg;
