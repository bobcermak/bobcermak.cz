"use client";

import { Fragment, type FC } from "react";
import CardSwiper from "./CardSwiper";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import type { ProjectGroupSlot } from "@/types/projectFilters";

type ProjectGroupSectionProps = {
  group: ProjectGroupSlot;
  visible: Set<string>;
};
/** Pod laptopem se karty listují, nad ním se vejdou vedle sebe do mřížky. */
const SWIPE_UNDER = "(max-width: 1280px)";
const ProjectGroupSection: FC<ProjectGroupSectionProps> = ({ group, visible }) => {
  const swipe = useMediaQuery(SWIPE_UNDER);
  const cards = group.projects.filter((project) => visible.has(project.slug));
  if (!cards.length) return null;
  return (
    <section aria-labelledby={`group-${group.id}`}>
      {group.header}
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
    </section>
  );
};
export default ProjectGroupSection;