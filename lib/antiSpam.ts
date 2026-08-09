import { headers } from "next/headers";

export { isFlooding, recordAttempt } from "./services/supabase/queries/rateLimit";
export const clientIp = async (): Promise<string> => {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return list.get("x-real-ip")?.trim() ?? "unknown";
};
export const isTracked = (ip: string) => ip !== "unknown";