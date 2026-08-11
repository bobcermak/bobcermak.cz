import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "@/types/siteSettings";

export const SITE_SETTINGS_TAG = "site-settings";
const REVALIDATE_SECONDS = 300;
type SiteSettingsRow = {
  hero_eyebrow: string | null;
  hero_available: boolean | null;
  promo_enabled: boolean | null;
  promo_eyebrow: string | null;
  promo_title_before: string | null;
  promo_title_highlight: string | null;
  promo_title_after: string | null;
  promo_lead: string | null;
  promo_cta: string | null;
  promo_delay_ms: number | null;
  promo_claim_label: string | null;
  promo_claim_note: string | null;
  promo_subject_tag: string | null;
  updated_at: string | null;
};
const str = (value: unknown, fallback: string) => (typeof value === "string" ? value : fallback);
const bool = (value: unknown, fallback: boolean) => (typeof value === "boolean" ? value : fallback);
const num = (value: unknown, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;
const toSettings = (row: Partial<SiteSettingsRow> | undefined): SiteSettings => {
  if (!row) return DEFAULT_SITE_SETTINGS;
  const fallback = DEFAULT_SITE_SETTINGS;
  return {
    updatedAt: str(row.updated_at, fallback.updatedAt),
    heroEyebrow: str(row.hero_eyebrow, fallback.heroEyebrow),
    heroAvailable: bool(row.hero_available, fallback.heroAvailable),
    promoEnabled: bool(row.promo_enabled, fallback.promoEnabled),
    promoEyebrow: str(row.promo_eyebrow, fallback.promoEyebrow),
    promoTitleBefore: str(row.promo_title_before, fallback.promoTitleBefore),
    promoTitleHighlight: str(row.promo_title_highlight, fallback.promoTitleHighlight),
    promoTitleAfter: str(row.promo_title_after, fallback.promoTitleAfter),
    promoLead: str(row.promo_lead, fallback.promoLead),
    promoCta: str(row.promo_cta, fallback.promoCta),
    promoDelayMs: num(row.promo_delay_ms, fallback.promoDelayMs),
    promoClaimLabel: str(row.promo_claim_label, fallback.promoClaimLabel),
    promoClaimNote: str(row.promo_claim_note, fallback.promoClaimNote),
    promoSubjectTag: str(row.promo_subject_tag, fallback.promoSubjectTag),
  };
};
export const getSiteSettings = async (): Promise<SiteSettings> => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("[site_settings] Chybí SUPABASE_URL nebo SUPABASE_ANON_KEY — beru výchozí texty.");
    return DEFAULT_SITE_SETTINGS;
  }
  try {
    const response = await fetch(
      `${url}/rest/v1/site_settings?id=eq.1&select=*&limit=1`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" },
        next: { revalidate: REVALIDATE_SECONDS, tags: [SITE_SETTINGS_TAG] },
      }
    );
    if (!response.ok) {
      console.warn(`[site_settings] Čtení selhalo: ${response.status} ${response.statusText}`);
      return DEFAULT_SITE_SETTINGS;
    }
    const rows = (await response.json()) as SiteSettingsRow[];
    return toSettings(rows[0]);
  } catch (error) {
    console.warn("[site_settings] Čtení selhalo:", error);
    return DEFAULT_SITE_SETTINGS;
  }
};