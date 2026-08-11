"use client";

import { createContext, useContext, type FC, type ReactNode } from "react";
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "@/types/siteSettings";

const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SITE_SETTINGS);
type SiteSettingsStoreProps = {
  settings: SiteSettings;
  children: ReactNode;
};
export const SiteSettingsStore: FC<SiteSettingsStoreProps> = ({ settings, children }) => (
  <SiteSettingsContext value={settings}>{children}</SiteSettingsContext>
);
export const useSiteSettings = (): SiteSettings => useContext(SiteSettingsContext);