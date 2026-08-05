import { getServerSupabase } from "../server";

export type MessageRow = {
  name: string;
  email: string;
  topic: string;
  message: string;
};
export const insertMessage = async (row: MessageRow): Promise<boolean> => {
  const supabase = getServerSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from("messages").insert({
    source: "dotazy",
    name: row.name || null,
    email: row.email,
    topic: row.topic,
    message: row.message,
    status: "new",
  });
  if (error) {
    console.error("[messages] Zápis selhal:", error.message);
    return false;
  }
  console.info("[messages] Uloženo");
  return true;
};