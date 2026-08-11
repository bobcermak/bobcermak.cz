"use client";

import LanyardScene from "@/components/three/LanyardScene";
import { useEffect, useState } from "react";

const QUERIES = {
  narrow: "(max-width: 761px)",
  md: "(min-width: 1024px)",
  lg: "(min-width: 1537px)",
  xl: "(min-width: 1700px)",
} as const;
type Breakpoints = Record<keyof typeof QUERIES, boolean>;
const measure = (): Breakpoints => ({
  narrow: window.matchMedia(QUERIES.narrow).matches,
  md: window.matchMedia(QUERIES.md).matches,
  lg: window.matchMedia(QUERIES.lg).matches,
  xl: window.matchMedia(QUERIES.xl).matches,
});
const HeroLanyard = () => {
  //Hooks
  const [size, setSize] = useState<Breakpoints | null>(null);

  useEffect(() => {
    const lists = Object.values(QUERIES).map((query) => window.matchMedia(query));
    const update = () => setSize(measure());
    update();
    lists.forEach((list) => list.addEventListener("change", update));
    return () => lists.forEach((list) => list.removeEventListener("change", update));
  }, []);
  return (
    <div className="absolute -top-50 bottom-0 z-0 tablet:z-20 w-full touch-pan-y" aria-hidden="true">
      {size && (
        <LanyardScene
          className="h-full w-full"
          position={size.md ? [0, 0, 16] : [0, 0, 20]}
          offsetX={size.narrow ? 0.3 : size.xl ? 1.8 : size.lg ? 2.5 : size.md ? 1.8 : 1.5}
          bandLength={size.narrow ? 1.9 : 1}
          bandWidth={size.narrow ? 3 : 1}
        />
      )}
    </div>
  );
};
export default HeroLanyard;