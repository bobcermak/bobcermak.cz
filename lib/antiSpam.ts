const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 10;
const hits = new Map<string, number[]>();
const recentHits = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < RATE_WINDOW_MS);
  hits.set(ip, recent);
  return recent;
};
const isTracked = (ip: string) => ip !== "unknown";
export const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
export const isFlooding = (ip: string) => isTracked(ip) && recentHits(ip).length >= RATE_MAX;
export const recordAttempt = (ip: string) => {
  if (!isTracked(ip)) return;
  recentHits(ip).push(Date.now());
  if (hits.size > 500) hits.clear();
};