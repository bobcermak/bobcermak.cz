import type { ReactNode } from "react";

const ProjectTag = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md border border-border px-2 py-1 text-xs font-medium tracking-[0.04em] text-text-2">
    {children}
  </span>
);
export default ProjectTag;