import { ArrowsClockwiseIcon, BroomIcon, BugIcon, FileTextIcon, GitCommitIcon, SparkleIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { CommitKind } from "@/types/github";

export const COMMIT_KIND_META: Record<CommitKind, { icon: Icon; tile: string; text: string }> = {
  feat: { icon: SparkleIcon, tile: "bg-accent-blue/22", text: "text-accent-blue-strong" },
  fix: { icon: BugIcon, tile: "bg-accent-peach/35", text: "text-accent-peach-strong" },
  refactor: { icon: ArrowsClockwiseIcon, tile: "bg-accent-purple/35", text: "text-accent-purple" },
  chore: { icon: BroomIcon, tile: "bg-bg-tint", text: "text-text-3" },
  docs: { icon: FileTextIcon, tile: "bg-accent-green/25", text: "text-accent-green" },
  other: { icon: GitCommitIcon, tile: "bg-bg-tint", text: "text-text-3" },
};