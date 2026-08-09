import type { FC } from "react";
import { ArrowSquareOutIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import Button from "@/components/buttons/Button";
import ProjectImage from "../ProjectImage";
import ProjectTag from "../ProjectTag";
import type { CatalogProject } from "@/types/projectCatalog";

const ProjectDetail: FC<{ project: CatalogProject }> = ({ project }) => {
  const { title, year, status, desc, types, stack, img, href, github, fit, imgBg } = project;
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
        {(href || github) && (
          <div className="flex flex-wrap gap-3">
            {href && (
              <Button href={href} ariaLabel={`${title} — otevřít`} size="sm" isArrow={false}>
                <span className="inline-flex items-center gap-2">
                  <ArrowSquareOutIcon size={15} weight="bold" aria-hidden="true"/>
                  živý web
                </span>
              </Button>
            )}
            {github && (
              <Button
                href={github}
                variant="secondary"
                ariaLabel={`${title} — GitHub`}
                size="sm"
                isArrow={false}
              >
                <span className="inline-flex items-center gap-2">
                  <GithubLogoIcon size={15} weight="fill" aria-hidden="true"/>
                  github
                </span>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default ProjectDetail;