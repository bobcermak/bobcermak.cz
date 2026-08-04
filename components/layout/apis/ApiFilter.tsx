"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { API_ALL } from "@/types/apis";

export type ApiFilterItem = {
  key: string;
  cats: string[];
  row: ReactNode;
};
type ApiFilterProps = {
  filters: string[];
  items: ApiFilterItem[];
};
const ApiFilter = ({ filters, items }: ApiFilterProps) => {
  //Hooks
  const [active, setActive] = useState<string>(API_ALL);
  const [filtered, setFiltered] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [reserved, setReserved] = useState<number>(0);
  const visible = active === API_ALL ? items : items.filter((item) => item.cats.includes(active));

  useEffect(() => {
    const el = listRef.current;
    if (!el || active !== API_ALL) return;
    let alive = true;
    const measure = () => {
      if (alive) setReserved(el.getBoundingClientRect().height);
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => {
      alive = false;
      window.removeEventListener("resize", measure);
    };
  }, [active]);
  return (
    <>
      <div data-reveal className="mb-8 flex flex-wrap gap-2 xphone:gap-2.5">
        {filters.map((filter) => {
          const on = filter === active;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setActive(filter);
                setFiltered(true);
              }}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-250 xphone:px-4 xphone:py-2 xphone:text-[13px] ${
                on
                  ? "border-ink bg-ink text-white"
                  : "border-border-mint bg-white/60 text-text-2 hover:border-ink hover:text-ink active:border-ink active:text-ink"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
      <div
        ref={listRef}
        className="border-t border-border-mint"
        style={active === API_ALL || !reserved ? undefined : { minHeight: reserved }}
      >
        {visible.map((item, i) => (
          <div
            key={`${active}-${item.key}`}
            data-reveal
            className={filtered ? "animate-[floatUp_0.45s_cubic-bezier(.2,.8,.25,1)_both]" : undefined}
            style={filtered ? { animationDelay: `${i * 60}ms` } : undefined}
          >
            {item.row}
          </div>
        ))}
        {active !== API_ALL && (
          <p className="pt-6 text-center text-[13px] text-text-3">
            Zobrazuji {visible.length} z {items.length} — zbytek najdeš pod „{API_ALL}“.
          </p>
        )}
      </div>
    </>
  );
};
export default ApiFilter;