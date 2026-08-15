import { getServerSupabase } from "../server";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 10;
export const isFlooding = async (ip: string): Promise<boolean> => {
  const supabase = getServerSupabase();
  if (!supabase) return false;
  const { data, error } = await supabase.rpc("rate_limit_check", {
    p_ip: ip,
    p_window_ms: WINDOW_MS,
    p_max: MAX_HITS,
  });
  if (error) {
    console.error("[rateLimit] Čtení selhalo:", error.message);
    return false;
  }
  return data === true;
};
export const recordAttempt = async (ip: string): Promise<void> => {
  const supabase = getServerSupabase();
  if (!supabase) return;
  const { error } = await supabase.rpc("rate_limit_record", { p_ip: ip });
  if (error) console.error("[rateLimit] Zápis selhal:", error.message);
};