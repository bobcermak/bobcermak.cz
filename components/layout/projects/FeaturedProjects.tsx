import Link from "next/link";
import { RevealSection } from "@/components";
import FeaturedProjectCard from "./FeaturedProjectCard";
import ProjectCard from "./ProjectCard";
import { featuredLead, featuredRest } from "@/types/projects";

const FeaturedProjects = () => {
  return (
    <RevealSection
      id="projekty"
      aria-label="Vybrané projekty"
      className="w-full pt-15 pb-20"
      reveal={{ perTarget: true, y: 44, scale: 0.94, duration: 0.85, stagger: 0.1, ease: "back.out(1.4)", start: "top 88%" }}
    >
      <div className="mx-auto w-container laptop:w-xsection">
        <header data-reveal className="mb-5 min-[663px]:mb-10 flex flex-wrap items-baseline justify-between gap-10">
          <h2>Vybrané projekty</h2>
          <Link href="/projekty" className="text-sm font-medium text-ink transition-colors duration-250 hover:text-text-2 active:text-text-2">
            Všechny projekty →
          </Link>
        </header>
        <div className="flex flex-col gap-5">
          <FeaturedProjectCard project={featuredLead}/>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-5">
            {featuredRest.map((project) => (
              <ProjectCard key={project.slug} project={project}/>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
};
export default FeaturedProjects;