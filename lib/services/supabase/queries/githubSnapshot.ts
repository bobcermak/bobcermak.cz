import type { GithubActivity } from "@/types/github";

const TABLE = "github_snapshot";
const restUrl = (base: string) => `${base}/rest/v1/${TABLE}`;
export const readGithubSnapshot = async (): Promise<GithubActivity | null> => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const response = await fetch(`${restUrl(url)}?id=eq.1&select=data&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      console.warn(`[github_snapshot] Čtení selhalo: ${response.status} ${response.statusText}`);
      return null;
    }
    const rows = (await response.json()) as { data: GithubActivity | null }[];
    return rows[0]?.data ?? null;
  } catch (error) {
    console.warn("[github_snapshot] Čtení selhalo:", error);
    return null;
  }
};
export const writeGithubSnapshot = async (activity: GithubActivity): Promise<void> => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("[github_snapshot] Chybí SUPABASE_SERVICE_ROLE_KEY — snapshot se neuloží.");
    return;
  }
  try {
    const response = await fetch(`${restUrl(url)}?on_conflict=id`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({ id: 1, data: activity, updated_at: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.warn(`[github_snapshot] Zápis selhal: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.warn("[github_snapshot] Zápis selhal:", error);
  }
};