"use client";

import { useMemo, useState, type FC } from "react";
import Link from "next/link";
import ProjectsFilter from "./ProjectsFilter";
import ProjectGroupSection from "./ProjectGroupSection";
import ProjectDetailModal from "./ProjectDetailModal";
import { visibleSlugs } from "@/lib/projects";
import { CONTACT_SECTION_ID } from "@/types/contact";
import { NO_FILTERS, type ProjectFilters, type ProjectGroupSlot, type ProjectIndexEntry } from "@/types/projectFilters";

type ProjectsBrowserProps = {
  groups: ProjectGroupSlot[];
  index: ProjectIndexEntry[];
};
const ProjectsBrowser: FC<ProjectsBrowserProps> = ({ groups, index }) => {
  //Hooks
  const [filters, setFilters] = useState<ProjectFilters>(NO_FILTERS);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const visible = useMemo(() => visibleSlugs(index, filters), [index, filters]);
  const open = openSlug
    ? groups
        .flatMap((group) => group.projects.map((project) => ({ project, accent: group.accent })))
        .find((item) => item.project.slug === openSlug)
    : undefined;
  return (
    <>
      <ProjectsFilter
        filters={filters}
        onChange={setFilters}
        shown={visible.size}
        total={index.length}
      />
      <div className="mt-12 flex flex-col gap-16">
        {groups.map((group) => (
          <ProjectGroupSection key={group.id} group={group} visible={visible} onOpen={setOpenSlug}/>
        ))}
      </div>
      <ProjectDetailModal
        detail={open?.project.detail}
        accent={open?.accent ?? "blue"}
        onClose={() => setOpenSlug(null)}
      />
      {!visible.size && (
        <p className="mt-12 rounded-[18px] border border-dashed border-border-mid bg-bg-soft px-6 py-10 text-center text-[15px] text-text-2">
          Na tohle nic nesedí. Zkus jiný filtr, nebo mi rovnou{" "}
          <Link
            href={`/#${CONTACT_SECTION_ID}`}
            className="font-semibold text-ink underline underline-offset-[3px] transition-colors duration-250 hover:text-text-2 active:text-text-2"
          >
            napiš
          </Link>
          .
        </p>
      )}
    </>
  );
};
export default ProjectsBrowser;