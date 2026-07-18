import { PageWrapper, Navbar, ReactiveBg } from "@/components";
import { Montserrat } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat-next",
});
const SITE_URL = "https://bobcermak.cz";
const DESCRIPTION = "Bob Čermák — full stack developer z Prahy a Liberce. Stavím weby, rezervační systémy a mobilní appky v Next.js, React Native a Supabase. Od nápadu po nasazení.";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bob Čermák | Full stack developer — weby, systémy & mobilní appky",
    template: "%s | Bob Čermák",
  },
  description: DESCRIPTION,
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
  authors: [{ name: "Bob Čermák", url: SITE_URL }],
  creator: "Bob Čermák",
  publisher: "Bob Čermák",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: SITE_URL,
    siteName: "Bob Čermák",
    title: "Bob Čermák | Full stack developer",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bob Čermák | Full stack developer",
    description: DESCRIPTION,
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
    <html lang="cs" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bob Čermák",
              url: SITE_URL,
              email: "ahoj@bobcermak.cz",
              jobTitle: "Full stack developer",
              description:
                "Full stack developer — weby s administrací, rezervační a vlastní systémy a mobilní aplikace v Next.js, React Native a Supabase.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Praha",
                addressRegion: "Liberec",
                addressCountry: "CZ",
              },
              sameAs: [
                "https://github.com/bobcermak",
                "https://www.linkedin.com/in/bobcermak",
              ],
              knowsAbout: [
                "TypeScript",
                "React",
                "Next.js",
                "React Native",
                "Supabase",
                ".NET",
                "Figma",
              ],
            }),
          }}
        />
      </head>
      <body className="font-montserrat">
        <ReactiveBg/>
        <header>
          <Navbar/>
        </header>
        <PageWrapper>
          <main>{children}</main>
        </PageWrapper>
      </body>
    </html>
  );
}