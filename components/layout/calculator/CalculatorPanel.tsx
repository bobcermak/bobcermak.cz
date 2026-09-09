"use client";

import { useEffect, useMemo, useRef, useState, type FC } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { routeKey, wasVisited } from "@/lib/visitedRoutes";
import CalculatorField from "./CalculatorField";
import TypeRow from "./TypeRow";
import ExtraChip from "./ExtraChip";
import ScopeSlider from "./ScopeSlider";
import PriceCard from "./PriceCard";
import { CALCULATOR_SELECT_EVENT, calculatePrice, formatCzk, type CalculatorSelectDetail, type CalculatorType } from "@/lib/calculator";
import { calculatorExtras, DEFAULT_TYPE, PAGES_DEFAULT, projectTypes, RUSH_LABEL } from "@/types/calculator";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const REDUCED_MQ = "(prefers-reduced-motion: reduce)";
type CalculatorPanelProps = {
  note?: string;
};
const CalculatorPanel: FC<CalculatorPanelProps> = ({ note }) => {
  //Hooks
  const rootRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<CalculatorType>(DEFAULT_TYPE);
  const [pages, setPages] = useState<number>(PAGES_DEFAULT);
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [rush, setRush] = useState<boolean>(false);

  useEffect(() => {
    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<CalculatorSelectDetail>).detail;
      if (detail?.type) setType(detail.type);
    };
    window.addEventListener(CALCULATOR_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(CALCULATOR_SELECT_EVENT, onSelect);
  }, []);
  const pickedExtras = useMemo(
    () => calculatorExtras.filter((extra) => picked[extra.id]),
    [picked]
  );
  const pickedIds = useMemo(() => pickedExtras.map((extra) => extra.id), [pickedExtras]);
  const result = useMemo(
    () =>
      calculatePrice({
        type: projectTypes.find((item) => item.id === type) ?? projectTypes[0],
        pages,
        extras: pickedExtras,
        rush,
      }),
    [type, pages, pickedExtras, rush]
  );
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const boxes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-calc-box], [data-calc-card]"));
      const steps = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-calc-step]"));
      if (!boxes.length) return;
      if (window.matchMedia(REDUCED_MQ).matches || wasVisited(routeKey())) return;
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
      timeline.from(boxes, {
        opacity: 0,
        y: 34,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
        clearProps: "transform,opacity",
      });
      if (steps.length) {
        timeline.from(
          steps,
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.09,
            clearProps: "transform,opacity",
          },
          0.28
        );
      }
    },
    { scope: rootRef }
  );
  return (
    <div ref={rootRef} className="grid items-center gap-4 mlaptop:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] mlaptop:gap-5">
      <div data-calc-box className="min-w-0 rounded-[26px] bg-white p-6 shadow-card xphone:p-7 laptop:p-8">
        <CalculatorField num="01" label="Typ projektu">
          <div role="radiogroup" aria-label="Typ projektu" className="divide-y divide-border">
            {projectTypes.map((item) => (
              <TypeRow
                key={item.id}
                type={item}
                selected={item.id === type}
                onSelect={() => setType(item.id)}
              />
            ))}
          </div>
        </CalculatorField>
        <CalculatorField num="02" label="Rozsah">
          <ScopeSlider pages={pages} onChange={setPages}/>
        </CalculatorField>
        <CalculatorField num="03" label="Co k tomu">
          <div className="flex flex-wrap gap-2">
            {calculatorExtras.map((extra) => (
              <ExtraChip
                key={extra.id}
                label={extra.label}
                price={`+${formatCzk(extra.price)}`}
                on={!!picked[extra.id]}
                onToggle={() => setPicked((state) => ({ ...state, [extra.id]: !state[extra.id] }))}
              />
            ))}
            <ExtraChip
              label={RUSH_LABEL}
              price="+20 %"
              on={rush}
              onToggle={() => setRush((value) => !value)}
            />
          </div>
        </CalculatorField>
        {note && (
          <p className="mt-6 border-t border-border pt-5 text-[11.5px] leading-[1.55] text-text-3">
            {note}
          </p>
        )}
      </div>
      <PriceCard result={result} selection={{ type, pages, extras: pickedIds, rush }}/>
    </div>
  );
};
export default CalculatorPanel;