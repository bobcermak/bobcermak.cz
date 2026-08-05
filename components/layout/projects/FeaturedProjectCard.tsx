import ProjectImage from "./ProjectImage";
import ProjectTag from "./ProjectTag";
import ProjectLinks from "./ProjectLinks";
import type { CSSProperties } from "react";
import type { Project } from "@/types/projects";

const FeaturedProjectCard = ({ project }: { project: Project }) => {
  const { num, slug, title, desc, tags, img, href, github, fit, accent } = project;
  const mainHref = href ?? `/projekty/${slug}`;
  return (
    <article
      data-reveal
      style={{ "--accent": accent ?? "var(--color-border-mid)" } as CSSProperties}
      className="group relative grid grid-cols-1 overflow-hidden rounded-[20px] border border-border bg-white text-ink transition-[translate,border-color,box-shadow] duration-250 ease-[cubic-bezier(.2,.8,.25,1)] hover:-translate-y-[5px] hover:border-(--accent) hover:shadow-card active:-translate-y-[5px] active:border-(--accent) active:shadow-card tablet:grid-cols-[1.25fr_1fr]"
    >
      <figure
        style={{ background: accent ?? "var(--color-white)" }}
        className="relative min-h-40 max-tablet:aspect-16/11 tablet:min-h-full"
      >
        <ProjectImage src={img} title={title} sizes="(max-width: 761px) 100vw, 55vw" fit={fit} />
      </figure>
      <div className="flex flex-col p-[clamp(26px,3vw,44px)]">
        <div className="mb-auto flex items-center gap-3">
          <span className="text-[2.4rem] font-light leading-none tracking-[-0.03em] text-muted-num">{num}</span>
          <span className="text-eyebrow font-semibold uppercase tracking-[0.14em] text-text-3">Featured</span>
        </div>
        <h3 className="mb-3 mt-7 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.025em]">{title}</h3>
        <p className="mb-5 max-w-[40ch] text-[15px] leading-[1.6] text-text-2">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <ProjectTag key={tag}>{tag}</ProjectTag>
          ))}
        </div>
      </div>
      <ProjectLinks href={mainHref} github={github} title={title} />
    </article>
  );
};
export default FeaturedProjectCard;