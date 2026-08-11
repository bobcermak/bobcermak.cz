import type { ReactNode } from "react";
import { SiteSettingsStore } from "./SiteSettingsContext";
import { getSiteSettings } from "@/lib/services/supabase/queries/siteSettings";

const SiteSettingsProvider = async ({ children }: { children: ReactNode }) => {
  const settings = await getSiteSettings();
  return <SiteSettingsStore settings={settings}>{children}</SiteSettingsStore>;
};
export default SiteSettingsProvider;