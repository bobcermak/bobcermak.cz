"use client";

import { useEffect, useMemo, useState, type FC, type ReactNode } from "react";
import CalculatorStep from "./CalculatorStep";
import TypeOption from "./TypeOption";
import OptionTile from "./OptionTile";
import ScopeSlider from "./ScopeSlider";
import PriceCard from "./PriceCard";
import { CALCULATOR_SELECT_EVENT, calculatePrice, type CalculatorSelectDetail, type CalculatorType } from "@/lib/calculator";
import { calculatorExtras, DEFAULT_TYPE, PAGES_DEFAULT, projectTypes, type CalculatorSlot } from "@/types/calculator";

type CalculatorPanelProps = {
  types: CalculatorSlot<CalculatorType>[];
  extras: CalculatorSlot[];
  rushContent: ReactNode;
};
const CalculatorPanel: FC<CalculatorPanelProps> = ({ types, extras, rushContent }) => {
  //Hooks
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
  return (
    <div className="grid grid-cols-1 items-start gap-8 mlaptop:grid-cols-[minmax(0,1fr)_minmax(0,460px)] mlaptop:gap-10 desktop:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
      <div className="flex min-w-0 flex-col">
        <CalculatorStep num="01" title="Typ projektu">
          <div
            role="radiogroup"
            aria-label="Typ projektu"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3"
          >
            {types.map((slot) => (
              <TypeOption key={slot.id} selected={slot.id === type} onSelect={() => setType(slot.id)}>
                {slot.content}
              </TypeOption>
            ))}
          </div>
        </CalculatorStep>
        <CalculatorStep num="02" title="Rozsah">
          <ScopeSlider pages={pages} onChange={setPages}/>
        </CalculatorStep>
        <CalculatorStep num="03" title="Extras" last>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-3">
            {extras.map((slot) => (
              <OptionTile
                key={slot.id}
                on={!!picked[slot.id]}
                onToggle={() => setPicked((state) => ({ ...state, [slot.id]: !state[slot.id] }))}
              >
                {slot.content}
              </OptionTile>
            ))}
          </div>
          <div className="mt-3">
            <OptionTile on={rush} onToggle={() => setRush((value) => !value)}>
              {rushContent}
            </OptionTile>
          </div>
        </CalculatorStep>
      </div>
      <PriceCard result={result} selection={{ type, pages, extras: pickedIds, rush }}/>
    </div>
  );
};
export default CalculatorPanel;