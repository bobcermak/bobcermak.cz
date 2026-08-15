import { getServerSupabase } from "../server";
import type { GithubActivity } from "@/types/github";

const TABLE = "github_snapshot";
export const readGithubSnapshot = async (): Promise<GithubActivity | null> => {
  const supabase = getServerSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.from(TABLE).select("data").eq("id", 1).maybeSingle();
  if (error) {
    console.warn("[github_snapshot] Čtení selhalo:", error.message);
    return null;
  }
  return (data?.data as GithubActivity | undefined) ?? null;
};
export const writeGithubSnapshot = async (activity: GithubActivity): Promise<void> => {
  const supabase = getServerSupabase();
  if (!supabase) return;
  const { error } = await supabase.rpc("github_snapshot_save", { p_data: activity });
  if (error) console.warn("[github_snapshot] Zápis selhal:", error.message);
};