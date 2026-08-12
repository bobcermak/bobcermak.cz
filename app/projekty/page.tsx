import type { Metadata } from "next";
import { RevealSection } from "@/components";
import GithubSection from "@/components/layout/github/GithubSection";
import CatalogCard from "@/components/layout/projects/browser/CatalogCard";
import ProjectDetail from "@/components/layout/projects/browser/ProjectDetail";
import ProjectGroupHeader from "@/components/layout/projects/browser/ProjectGroupHeader";
import ProjectsBrowser from "@/components/layout/projects/browser/ProjectsBrowser";
import { getGithubActivity } from "@/lib/services/github/activity";
import { buildIndex } from "@/lib/projects";
import { PROJECT_GROUPS, PROJECTS_TITLE, PROJECTS_TOTAL } from "@/types/projectCatalog";

export const metadata: Metadata = {
  title: "Projekty",
  description: "Weby s administrací, rezervační systémy a mobilní appky — klientské zakázky i vlastní produkty a soutěžní projekty.",
  alternates: { canonical: "/projekty" },
  robots: { index: true, follow: true },
};
const ProjectsPage = async () => {
  const github = await getGithubActivity();
  return (
    <RevealSection
      aria-label="Projekty"
      className="mx-auto w-container mt-40 desktop:w-section"
      reveal={{ perTarget: true, y: 40, scale: 0.96, duration: 0.8, stagger: 0.09, ease: "back.out(1.3)", start: "top 90%" }}
    >
      <header data-reveal className="mb-9 flex flex-wrap items-baseline gap-4.5">
        <h1 className="m-0">{PROJECTS_TITLE}</h1>
        <p className="text-sm font-regular tracking-[0.08em] text-text-3">
          {PROJECTS_TOTAL} projektů celkem
        </p>
      </header>
      <ProjectsBrowser
        index={PROJECT_GROUPS.flatMap((group) => group.projects.map(buildIndex))}
        groups={PROJECT_GROUPS.map((group) => ({
          id: group.id,
          accent: group.accent,
          header: <ProjectGroupHeader group={group}/>,
          projects: group.projects.map((project, index) => ({
            slug: project.slug,
            content: (
              <CatalogCard
                project={project}
                num={String(index + 1).padStart(2, "0")}
                badge={group.badge}
                accent={group.accent}
              />
            ),
            detail: <ProjectDetail project={project}/>,
          })),
        }))}
      />
      <GithubSection activity={github}/>
    </RevealSection>
  );
};
export default ProjectsPage;