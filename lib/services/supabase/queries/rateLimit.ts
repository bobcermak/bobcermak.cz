import { getServerSupabase } from "../server";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 10;
export const isFlooding = async (ip: string): Promise<boolean> => {
  const supabase = getServerSupabase();
  if (!supabase) return false;
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { count, error } = await supabase
    .from("rate_limit_hits")
    .select("*", { count: "exact", head: true })
    .eq("ip", ip)
    .gte("created_at", since);
  if (error) {
    console.error("[rateLimit] Čtení selhalo:", error.message);
    return false;
  }
  return (count ?? 0) >= MAX_HITS;
};
export const recordAttempt = async (ip: string): Promise<void> => {
  const supabase = getServerSupabase();
  if (!supabase) return;
  const { error } = await supabase.from("rate_limit_hits").insert({ ip });
  if (error) console.error("[rateLimit] Zápis selhal:", error.message);
};