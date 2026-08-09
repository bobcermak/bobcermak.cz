import type { ReactNode } from "react";

export const PROJECT_TYPES = ["Web", "Mobilní app", "AI", "Systém/CMS", "Design"] as const;
export const PROJECT_CONTEXTS = ["Klientské", "Vlastní produkt", "Soutěž", "Škola"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];
export type ProjectContext = (typeof PROJECT_CONTEXTS)[number];
export const FILTER_ALL = "";
export type ProjectFilters = {
  query: string;
  type: ProjectType | typeof FILTER_ALL;
  context: ProjectContext | typeof FILTER_ALL;
};
export const NO_FILTERS: ProjectFilters = { query: "", type: FILTER_ALL, context: FILTER_ALL };
export type ProjectIndexEntry = {
  slug: string;
  types: ProjectType[];
  context: ProjectContext;
  search: string;
};
export type ProjectSlot = {
  slug: string;
  content: ReactNode;
};
export type ProjectGroupSlot = {
  id: string;
  header: ReactNode;
  projects: ProjectSlot[];
};