"use client";

import type { FC } from "react";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import FilterRow from "./FilterRow";
import { hasActiveFilters } from "@/lib/projects";
import { NO_FILTERS, PROJECT_CONTEXTS, PROJECT_TYPES, type ProjectFilters } from "@/types/projectFilters";

type ProjectsFilterProps = {
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
  shown: number;
  total: number;
};
const ProjectsFilter: FC<ProjectsFilterProps> = ({ filters, onChange, shown, total }) => {
  const active = hasActiveFilters(filters);
  const patch = (next: Partial<ProjectFilters>) => onChange({ ...filters, ...next });
  return (
    <div>
      <div className="relative mb-6 max-w-130">
        <MagnifyingGlassIcon
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute left-4.5 top-1/2 -translate-y-1/2 text-text-3"
        />
        <input
          type="search"
          value={filters.query}
          onChange={(event) => patch({ query: event.target.value })}
          placeholder="Hledat projekt, tag, technologii…"
          aria-label="Hledat mezi projekty"
          className="w-full rounded-xl border border-border-mid bg-white py-3.5 pl-11 pr-4 text-[15px] text-ink outline-none transition-colors duration-250 placeholder:text-placeholder focus:border-ink"
        />
      </div>
      <div className="flex flex-col gap-3">
        <FilterRow
          label="typ"
          items={PROJECT_TYPES}
          active={filters.type}
          onPick={(type) => patch({ type })}
        />
        <FilterRow
          label="kontext"
          items={PROJECT_CONTEXTS}
          active={filters.context}
          onPick={(context) => patch({ context })}
        />
      </div>
      <div
        aria-live="polite"
        className="mt-5.5 flex flex-wrap items-center gap-3.5 text-[13px] font-medium text-text-3"
      >
        <span>
          {active ? `zobrazuji ${shown} z ${total}` : `zobrazuji všech ${total}`}
        </span>
        {active && (
          <button
            type="button"
            onClick={() => onChange(NO_FILTERS)}
            className="inline-flex cursor-pointer items-center gap-1 text-[13px] font-medium text-ink underline underline-offset-[3px] transition-colors duration-250 hover:text-text-2 active:text-text-2"
          >
            <XIcon size={11} weight="bold" aria-hidden="true"/>
            zrušit filtry
          </button>
        )}
      </div>
    </div>
  );
};
export default ProjectsFilter;