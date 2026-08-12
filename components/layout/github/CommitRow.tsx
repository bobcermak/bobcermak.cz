import type { FC } from "react";
import { COMMIT_KIND_META } from "./commitKind";
import type { GithubCommit } from "@/types/github";

const DAY_MS = 86_400_000;
const whenLabel = (iso: string): string => {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return "";
  const startOfDay = (date: Date) => Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const days = Math.round((startOfDay(new Date()) - startOfDay(then)) / DAY_MS);
  if (days <= 0) return "dnes";
  if (days === 1) return "včera";
  if (days < 30) return `před ${days} dny`;
  const months = Math.round(days / 30);
  return months <= 1 ? "před měsícem" : `před ${months} měsíci`;
};
const CommitRow: FC<{ commit: GithubCommit }> = ({ commit }) => {
  const meta = COMMIT_KIND_META[commit.kind];
  const Icon = meta.icon;
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3.5 border-b border-border/60 px-5 py-3.5 last:border-b-0 transition-colors duration-250 hover:bg-bg-soft xphone:grid-cols-[auto_minmax(0,1fr)_auto] xphone:px-5.5">
      <span
        aria-hidden="true"
        className={`grid size-7.5 flex-none place-items-center rounded-lg ${meta.tile} ${meta.text}`}
      >
        <Icon size={15} weight="bold"/>
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-ink">{commit.message}</span>
        <span className="mt-0.5 block truncate text-xs text-text-3">{commit.repo}</span>
      </span>
      <time
        dateTime={commit.at}
        className="hidden whitespace-nowrap text-xs tabular-nums text-text-3 xphone:block"
      >
        {whenLabel(commit.at)}
      </time>
    </li>
  );
};
export default CommitRow;