import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/types/site";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/*?sleva=", "/api/"],
    },
  ],
  sitemap: absoluteUrl("/sitemap.xml"),
  host: absoluteUrl("/"),
});
export default robots;