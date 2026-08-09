import Link from "next/link";
import type { FC } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
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
const CatalogCard: FC<CatalogCardProps> = ({ project, num, badge, accent }) => {
  const { slug, title, year, desc, types, img, href, fit } = project;
  const tone = GROUP_ACCENT[accent];
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[18px] border border-border bg-white transform-gpu transition-[scale,border-color,box-shadow] duration-250 ease-[cubic-bezier(.2,.8,.25,1)] hover:scale-[1.02] hover:border-border-mid hover:shadow-card active:scale-[1.02] active:border-border-mid active:shadow-card motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100">
      <span aria-hidden="true" className={`h-1 flex-none ${tone.bg}`}/>
      <figure className="relative m-0 aspect-16/11 w-full overflow-hidden bg-bg-tint">
        <ProjectImage src={img} title={title} sizes="(max-width: 761px) 92vw, 400px" fit={fit}/>
        <figcaption className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
          <span className={tone.text}>{num}</span>
          <span className="text-text-2">{badge}</span>
        </figcaption>
      </figure>
      <div className="flex min-w-0 flex-1 flex-col p-5 xphone:p-6">
        <header className="mb-2 flex items-baseline justify-between gap-3">
          <h3 className="text-[1.3rem] font-semibold tracking-[-0.015em]">{title}</h3>
          <span className="flex-none text-[13px] text-text-3 tabular-nums">{year}</span>
        </header>
        <p className="mb-4 text-[13.5px] leading-[1.5] text-text-2">{desc}</p>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {types.map((type) => (
              <ProjectTag key={type}>{type}</ProjectTag>
            ))}
          </div>
          <span
            aria-hidden="true"
            className="grid size-9 flex-none place-items-center rounded-full border border-border text-text-2 transition-colors duration-250 group-hover:border-ink group-hover:bg-ink group-hover:text-white group-active:border-ink group-active:bg-ink group-active:text-white"
          >
            <ArrowUpRightIcon size={15} weight="bold"/>
          </span>
        </div>
      </div>
      <Link
        href={href ?? `/projekty/${slug}`}
        aria-label={`Detail projektu ${title}`}
        className="absolute inset-0"
      />
    </article>
  );
};
export default CatalogCard;