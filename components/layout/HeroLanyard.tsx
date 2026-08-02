"use client";

import LanyardScene from "@/components/three/LanyardScene";
import { useEffect, useState } from "react";

const HeroLanyard = () => {
  //Hooks
  const [narrow, setNarrow] = useState<boolean>(false);
  const [narrowMd, setNarrowMd] = useState<boolean>(false);
  const [narrowLg, setNarrowLg] = useState<boolean>(false);
  const [narrowXl, setNarrowXl] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 761px)");
    const md = window.matchMedia("(min-width: 1024px)");
    const lg = window.matchMedia("(min-width: 1537px)");
    const xl = window.matchMedia("(min-width: 1700px)");
    const update = () => setNarrow(mq.matches);
    const updateMd = () => setNarrowMd(md.matches);
    const updateLg = () => setNarrowLg(lg.matches);
    const updateXl = () => setNarrowXl(xl.matches);
    update();
    updateMd();
    updateLg();
    updateXl();
    mq.addEventListener("change", update);
    md.addEventListener("change", updateMd);
    lg.addEventListener("change", updateLg);
    xl.addEventListener("change", updateXl);
    return () => {
      mq.removeEventListener("change", update);
      md.removeEventListener("change", updateMd);
      lg.removeEventListener("change", updateLg);
      xl.removeEventListener("change", updateXl);
    };
  }, []);
  return (
    <div className="absolute -top-50 bottom-0 z-0 w-full touch-pan-y" aria-hidden="true">
      <LanyardScene
        className="h-full w-full"
        position={narrowMd ? [0, 0, 16] : [0, 0, 20]}
        offsetX={narrow ? 0.3 : narrowXl ? 1.9 : narrowLg ? 2.5 : narrowMd ? 1.8 : 1.5}
        bandLength={narrow ? 1.9 : 1}
        bandWidth={narrow ? 3 : 1}
      />
    </div>
  );
};
export default HeroLanyard;