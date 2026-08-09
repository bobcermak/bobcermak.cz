import type { FC } from "react";
import { GROUP_ACCENT } from "./groupAccent";
import type { ProjectGroup } from "@/types/projectCatalog";

const ProjectGroupHeader: FC<{ group: ProjectGroup }> = ({ group }) => {
  const tone = GROUP_ACCENT[group.accent];
  return (
    <header className="mb-6 flex items-center gap-4">
      <span aria-hidden="true" className={`size-3 flex-none rounded-full ${tone.bg} ${tone.halo}`}/>
      <h2 id={`group-${group.id}`} className="flex-none text-[clamp(1.5rem,3.2vw,2rem)]">
        {group.title}
      </h2>
      <span aria-hidden="true" className="hidden h-px flex-1 bg-border stablet:block"/>
      <p className="hidden flex-none text-[11px] font-semibold uppercase tracking-[0.12em] text-text-3 stablet:block">
        {group.meta}
      </p>
    </header>
  );
};
export default ProjectGroupHeader;