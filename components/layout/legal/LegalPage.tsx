import type { FC, ReactNode } from "react";
import Link from "next/link";
import { RevealSection } from "@/components";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/structuredData";

type LegalPageProps = {
  title: string;
  updated: string;
  path: string;
  children: ReactNode;
};
const LegalPage: FC<LegalPageProps> = ({ title, updated, path, children }) => (
  <RevealSection aria-label={title} className="w-full pb-20 pt-36 tablet:pt-44">
    <JsonLd data={breadcrumbSchema([{ label: title, path }])}/>
    <div className="mx-auto w-container max-w-[720px]">
      <Link
        href="/"
        className="mb-8 inline-block text-sm font-medium text-text-3 transition-colors duration-250 hover:text-ink active:text-ink"
      >
        ← Zpět na web
      </Link>
      <h1 data-reveal className="mb-3 text-title laptop:text-sub-heading">
        {title}
      </h1>
      <p data-reveal className="mb-10 text-sm text-text-3">
        Naposledy upraveno {updated}
      </p>
      <div
        data-reveal
        className="flex flex-col gap-6 [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_h2]:mb-1 [&_h2]:mt-4 [&_h2]:text-sub [&_li]:list-disc [&_li]:text-text-2 [&_ul]:flex [&_ul]:list-outside [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5"
      >
        {children}
      </div>
    </div>
  </RevealSection>
);
export default LegalPage;