const seen = new Set<string>();
let current: string | null = null;
export const wasVisited = (path: string): boolean => seen.has(path);
export const markVisited = (path: string): void => {
  seen.add(path);
};
export const routeKey = (): string =>
  typeof window === "undefined" ? "" : window.location.pathname;

export const enterRoute = (path: string): boolean => {
  if (current !== null && current !== path) markVisited(current);
  current = path;
  return wasVisited(path);
};