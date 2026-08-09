"use client";

import { Fragment, type FC, type MouseEvent } from "react";
import CardSwiper from "./CardSwiper";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import type { ProjectGroupSlot } from "@/types/projectFilters";

type ProjectGroupSectionProps = {
  group: ProjectGroupSlot;
  visible: Set<string>;
  onOpen: (slug: string) => void;
};
const SWIPE_UNDER = "(max-width: 1280px)";
const ProjectGroupSection: FC<ProjectGroupSectionProps> = ({ group, visible, onOpen }) => {
  const swipe = useMediaQuery(SWIPE_UNDER);
  const cards = group.projects.filter((project) => visible.has(project.slug));
  if (!cards.length) return null;
  const handleOpen = (event: MouseEvent<HTMLDivElement>) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>("[data-open-project]");
    if (trigger?.dataset.openProject) onOpen(trigger.dataset.openProject);
  };
  return (
    <section aria-labelledby={`group-${group.id}`}>
      {group.header}
      <div onClick={handleOpen}>
        {swipe ? (
          <CardSwiper
            label={`Projekty — ${group.id}`}
            slides={cards.map((project) => ({ key: project.slug, content: project.content }))}
          />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-5">
            {cards.map((project) => (
              <Fragment key={project.slug}>{project.content}</Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default ProjectGroupSection;