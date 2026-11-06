import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_ROUTES } from "@/types/site";

const sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();
  return SITE_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    // Legal pages rarely change; a fresh build date on them would make lastmod untrustworthy.
    ...(route.changeFrequency === "yearly" ? {} : { lastModified }),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
};
export default sitemap;