import type { GroupAccent } from "@/types/projectCatalog";

export const GROUP_ACCENT: Record<GroupAccent, { bg: string; text: string; halo: string }> = {
  blue: {
    bg: "bg-accent-blue-strong",
    text: "text-accent-blue-strong",
    halo: "shadow-[0_0_0_4px_rgba(111,134,214,0.22)]",
  },
  peach: {
    bg: "bg-accent-peach-strong",
    text: "text-accent-peach-strong",
    halo: "shadow-[0_0_0_4px_rgba(224,163,115,0.22)]",
  },
};