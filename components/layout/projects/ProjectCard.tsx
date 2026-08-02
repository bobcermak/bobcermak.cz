import ProjectImage from "./ProjectImage";
import ProjectTag from "./ProjectTag";
import ProjectLinks from "./ProjectLinks";
import type { Project } from "@/types/projects";

const ProjectCard = ({ project }: { project: Project }) => {
  const { num, slug, title, desc, tags, img, href, github, fit } = project;
  const mainHref = href ?? `/projekty/${slug}`;
  return (
    <article
      data-reveal
      className="group relative flex overflow-hidden rounded-[15px] border border-border bg-white text-ink transition-[translate,border-color,box-shadow] duration-250 ease-[cubic-bezier(.2,.8,.25,1)] hover:-translate-y-[5px] active:-translate-y-[5px] hover:border-border-mid hover:shadow-card active:border-border-mid active:shadow-card"
    >
      <div className={`relative w-[42%] flex-none ${num === "03" ? "bg-[#4795a7]" : "bg-bg-tint"}`}>
        <ProjectImage src={img} title={title} sizes="(max-width: 620px) 45vw, 340px" fit={fit} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-6 py-5">
        <span className="mb-auto text-[1.5rem] font-light leading-none text-muted-num">{num}</span>
        <h3 className="mb-2 mt-5 text-[1.3rem] font-semibold tracking-[-0.015em]">{title}</h3>
        <p className="mb-3.5 text-[13.5px] leading-[1.5] text-text-2">{desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <ProjectTag key={tag}>{tag}</ProjectTag>
          ))}
        </div>
      </div>
      <ProjectLinks href={mainHref} github={github} title={title} />
    </article>
  );
};
export default ProjectCard;