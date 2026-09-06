"use client";

import { useEffect, useMemo, useState, type FC } from "react";
import CalculatorField from "./CalculatorField";
import TypeRow from "./TypeRow";
import ExtraChip from "./ExtraChip";
import ScopeSlider from "./ScopeSlider";
import PriceCard from "./PriceCard";
import { CALCULATOR_SELECT_EVENT, calculatePrice, formatCzk, type CalculatorSelectDetail, type CalculatorType } from "@/lib/calculator";
import { calculatorExtras, DEFAULT_TYPE, PAGES_DEFAULT, projectTypes, RUSH_LABEL } from "@/types/calculator";

type CalculatorPanelProps = {
  note?: string;
};
const CalculatorPanel: FC<CalculatorPanelProps> = ({ note }) => {
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
    <div className="grid items-center gap-4 mlaptop:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] mlaptop:gap-5">
      <div className="min-w-0 rounded-[26px] bg-white p-6 shadow-card xphone:p-7 laptop:p-8">
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