import { PageWrapper, Navbar, ReactiveBg, Footer, PromoPopup } from "@/components";
import { Montserrat, Orbitron, Outfit } from "next/font/google";
import type { Metadata, Viewport } from "next";
import SiteSettingsProvider from "@/contexts/SiteSettingsProvider";
import ConsentProvider from "@/contexts/ConsentContext";
import CookieBanner from "@/components/overlays/CookieBanner";
import Analytics from "@/components/analytics/Analytics";
import JsonLd from "@/components/seo/JsonLd";
import { personSchema, websiteSchema } from "@/lib/seo/structuredData";
import { SITE_DESCRIPTION, SITE_LANG, SITE_LOCALE, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/types/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat-next",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-orbitron-next",
});
const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  display: "swap",
  variable: "--font-outfit-next",
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  referrer: "strict-origin-when-cross-origin",
  keywords: [
    "Bob Čermák",
    "full stack developer",
    "freelance vývojář",
    "Next.js vývojář",
    "React Native",
    "Supabase",
    "tvorba webů Praha",
    "tvorba webů Liberec",
    "rezervační systém na míru",
    "mobilní aplikace na míru",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Full stack developer`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Full stack developer`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/images/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/images/assets/apple-touch-icon.png",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SiteSettingsProvider>
      <html lang={SITE_LANG} className={`${montserrat.variable} ${orbitron.variable} ${outfit.variable}`}>
        <head>
          <JsonLd data={personSchema()}/>
          <JsonLd data={websiteSchema()}/>
          <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt"/>
        </head>
        <body className="font-montserrat">
          <ConsentProvider>
            <ReactiveBg/>
            <header>
              <Navbar/>
            </header>
            <PageWrapper>
              <main>{children}</main>
              <Footer/>
            </PageWrapper>
            <PromoPopup/>
            <CookieBanner/>
            <Analytics/>
          </ConsentProvider>
        </body>
      </html>
    </SiteSettingsProvider>
  );
}