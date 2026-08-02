import Link from "next/link";
import { RevealSection } from "@/components";
import FeaturedProjectCard from "./FeaturedProjectCard";
import ProjectCard from "./ProjectCard";
import { featuredLead, featuredRest } from "@/types/projects";

const FeaturedProjects = () => {
  return (
    <RevealSection id="projekty" aria-label="Vybrané projekty" className="w-full py-15">
      <div className="mx-auto w-container desktop:w-xsection">
        <header data-reveal className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
          <h2>Vybrané projekty</h2>
          <Link href="/projekty" className="text-sm font-medium text-ink transition-colors duration-250 hover:text-text-2">
            Všechny projekty →
          </Link>
        </header>
        <div className="flex flex-col gap-5">
          <FeaturedProjectCard project={featuredLead}/>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5">
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