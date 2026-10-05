import type { Config } from "@netlify/functions";

export default async () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Chybi SUPABASE_URL nebo SUPABASE_ANON_KEY");
    return new Response("missing env", { status: 500 });
  }

  const res = await fetch(`${url}/rest/v1/keepalive?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });

  console.log("Supabase ping:", res.status, await res.text());
  return new Response(null, { status: res.status });
};
export const config: Config = { schedule: "0 8 * * 1,4" };