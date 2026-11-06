import type { Metadata } from "next";
import { absoluteUrl, SITE_LOCALE, SITE_NAME } from "@/types/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};
// Next merges metadata shallowly: a page without its own openGraph/twitter inherits the
// homepage's og:url and og:title, so every subpage needs the full objects here, including the
// image from app/opengraph-image.tsx, which an own openGraph object would otherwise drop.
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME };
export const pageMetadata = ({ title, description, path }: PageMetadataInput): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    url: absoluteUrl(path),
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [OG_IMAGE],
  },
});
