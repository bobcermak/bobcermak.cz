const seen = new Set<string>();
export const wasVisited = (path: string): boolean => seen.has(path);
export const markVisited = (path: string): void => {
  seen.add(path);
};
export const routeKey = (): string =>
  typeof window === "undefined" ? "" : window.location.pathname;