import type { FC } from "react";
import Button from "@/components/buttons/Button";
import ProjectImage from "../ProjectImage";
import ProjectTag from "../ProjectTag";
import { PROJECT_LINK_META } from "./projectLinkMeta";
import { detailLinks } from "@/lib/projects";
import type { CatalogProject } from "@/types/projectCatalog";

const ProjectDetail: FC<{ project: CatalogProject }> = ({ project }) => {
  const { title, year, status, desc, types, stack, img, fit, imgBg } = project;
  const links = detailLinks(project);
  return (
    <>
      <figure
        style={imgBg ? { backgroundColor: imgBg } : undefined}
        className="relative -mx-7 -mt-7 mb-6 aspect-16/10 overflow-hidden bg-bg-tint xphone:-mx-9 xphone:-mt-9"
      >
        <ProjectImage src={img} title={title} sizes="(max-width: 761px) 92vw, 720px" fit={fit}/>
      </figure>
      <div className="text-left">
        <header className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="project-detail-title" className="text-[clamp(1.6rem,4vw,2.2rem)]">
            {title}
          </h2>
          {(status || year) && (
            <span className="text-[13px] text-text-3 tabular-nums">
              {[status, year].filter(Boolean).join(" · ")}
            </span>
          )}
        </header>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {types.map((type) => (
            <ProjectTag key={type}>{type}</ProjectTag>
          ))}
        </div>
        <p className="mb-6 text-[14.5px] leading-[1.6] text-text-2">{desc}</p>
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-3">
          Stack
        </p>
        <p className="mb-7 text-[14px] text-ink">{stack.join(" · ")}</p>
        {links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {links.map((link, index) => {
              const meta = PROJECT_LINK_META[link.kind];
              const Icon = meta.icon;
              const label = link.label ?? meta.label;
              return (
                <Button
                  key={`${link.kind}-${link.href}`}
                  href={link.href}
                  variant={index === 0 ? "primary" : "secondary"}
                  hover={index === 0 ? "hover:translate-y-[-2px] active:translate-y-[-2px] duration-250" : ""}
                  ariaLabel={`${title} — ${label}`}
                  size="sm"
                  isArrow={false}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={15} weight={meta.weight} aria-hidden="true"/>
                    {label}
                  </span>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default ProjectDetail;