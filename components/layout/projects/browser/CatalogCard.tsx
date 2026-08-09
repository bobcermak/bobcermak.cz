import Link from "next/link";
import type { FC } from "react";
import { ArrowSquareOutIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import ProjectImage from "../ProjectImage";
import ProjectTag from "../ProjectTag";
import { GROUP_ACCENT } from "./groupAccent";
import type { CatalogProject, GroupAccent } from "@/types/projectCatalog";

type CatalogCardProps = {
  project: CatalogProject;
  num: string;
  badge: string;
  accent: GroupAccent;
};
const ICON = "pointer-events-auto grid size-9 place-items-center rounded-full border border-border bg-white/92 text-text-2 backdrop-blur-sm transition-colors duration-250 hover:border-ink hover:bg-ink hover:text-white active:border-ink active:bg-ink active:text-white";
const CatalogCard: FC<CatalogCardProps> = ({ project, num, badge, accent }) => {
  const { slug, title, year, status, desc, types, img, href, github, fit, imgBg } = project;
  const tone = GROUP_ACCENT[accent];
  return (
    <article data-reveal className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-white transform-gpu transition-[scale,border-color,box-shadow] duration-250 ease-[cubic-bezier(.2,.8,.25,1)] hover:scale-[1.02] hover:border-border-mid hover:shadow-card active:scale-[1.02] active:border-border-mid active:shadow-card motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100">
      <span aria-hidden="true" className={`h-1 flex-none ${tone.bg}`}/>
      <figure
        style={imgBg ? { backgroundColor: imgBg } : undefined}
        className="relative m-0 aspect-16/11 w-full overflow-hidden bg-bg-tint"
      >
        <ProjectImage src={img} title={title} sizes="(max-width: 761px) 92vw, 400px" fit={fit}/>
        <figcaption className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
          <span className={tone.text}>{num}</span>
          <span className="text-text-2">{badge}</span>
        </figcaption>
        {status && (
          <p className="absolute right-3.5 top-3.5 rounded-full bg-ink px-2.5 py-1 text-xs font-regular text-white">
            {status}
          </p>
        )}
      </figure>
      <div className="flex min-w-0 flex-1 flex-col p-5 xphone:p-6">
        <header className="mb-2 flex items-baseline justify-between gap-3">
          <h3 className="line-clamp-2 text-[1.3rem] font-semibold tracking-[-0.015em]">{title}</h3>
          {year && <span className="flex-none text-[13px] text-text-3 tabular-nums">{year}</span>}
        </header>
        <p className="mb-4 line-clamp-3 text-[13.5px] leading-[1.5] text-text-2">{desc}</p>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {types.map((type) => (
              <ProjectTag key={type}>{type}</ProjectTag>
            ))}
          </div>
          <div className="relative z-10 flex flex-none items-center gap-2">
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} — GitHub`}
                className={ICON}
              >
                <GithubLogoIcon size={15} weight="fill"/>
              </Link>
            )}
            {href && (
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} — otevřít web`}
                className={ICON}
              >
                <ArrowSquareOutIcon size={15} weight="bold"/>
              </Link>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        data-open-project={slug}
        aria-label={`Detail projektu ${title}`}
        className="absolute inset-0 cursor-pointer"
      />
    </article>
  );
};
export default CatalogCard;