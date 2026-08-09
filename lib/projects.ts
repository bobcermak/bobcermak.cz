import type { CatalogProject } from "@/types/projectCatalog";
import { FILTER_ALL, type ProjectFilters, type ProjectIndexEntry } from "@/types/projectFilters";

const fold = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
export const buildIndex = (project: CatalogProject): ProjectIndexEntry => ({
  slug: project.slug,
  types: project.types,
  context: project.context,
  search: fold(
    [project.title, project.desc, project.year, ...project.types, ...project.stack].join(" ")
  ),
});
export const matchesFilters = (entry: ProjectIndexEntry, filters: ProjectFilters) => {
  if (filters.type !== FILTER_ALL && !entry.types.includes(filters.type)) return false;
  if (filters.context !== FILTER_ALL && entry.context !== filters.context) return false;
  const query = fold(filters.query.trim());
  return !query || entry.search.includes(query);
};
export const visibleSlugs = (index: ProjectIndexEntry[], filters: ProjectFilters) =>
  new Set(index.filter((entry) => matchesFilters(entry, filters)).map((entry) => entry.slug));
export const hasActiveFilters = (filters: ProjectFilters) =>
  filters.query.trim() !== "" || filters.type !== FILTER_ALL || filters.context !== FILTER_ALL;