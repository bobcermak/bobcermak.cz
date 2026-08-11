import { AppStoreLogoIcon, ArrowSquareOutIcon, BehanceLogoIcon, DribbbleLogoIcon, FigmaLogoIcon, FileTextIcon, GithubLogoIcon, GooglePlayLogoIcon, InstagramLogoIcon, LinkSimpleIcon, PlayCircleIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { ProjectLinkKind } from "@/types/projectCatalog";

type LinkMeta = {
  icon: Icon;
  label: string;
  weight: "bold" | "fill";
};
export const PROJECT_LINK_META: Record<ProjectLinkKind, LinkMeta> = {
  web: { icon: ArrowSquareOutIcon, label: "živý web", weight: "bold" },
  github: { icon: GithubLogoIcon, label: "github", weight: "fill" },
  youtube: { icon: PlayCircleIcon, label: "video", weight: "fill" },
  appstore: { icon: AppStoreLogoIcon, label: "app store", weight: "fill" },
  googleplay: { icon: GooglePlayLogoIcon, label: "google play", weight: "fill" },
  figma: { icon: FigmaLogoIcon, label: "figma", weight: "fill" },
  instagram: { icon: InstagramLogoIcon, label: "instagram", weight: "fill" },
  behance: { icon: BehanceLogoIcon, label: "behance", weight: "fill" },
  dribbble: { icon: DribbbleLogoIcon, label: "dribbble", weight: "fill" },
  doc: { icon: FileTextIcon, label: "dokumentace", weight: "bold" },
  link: { icon: LinkSimpleIcon, label: "odkaz", weight: "bold" },
};