import { unstable_cache } from "next/cache";
import { GITHUB_ACTIVITY_QUERY, type GithubGraphResponse, type GithubLangNode, type GithubRepoNode } from "./query";
import { readGithubSnapshot, writeGithubSnapshot } from "@/lib/services/supabase/queries/githubSnapshot";
import { COMMIT_KINDS, GITHUB_COMMITS_SHOWN, GITHUB_LANGS_SHOWN, GITHUB_USER, LANGUAGE_COLORS, type CommitKind, type GithubActivity, type GithubCommit, type GithubLanguage } from "@/types/github";

export const GITHUB_ACTIVITY_TAG = "github-activity";
const REVALIDATE_SECONDS = 1800;
const GRAPHQL_URL = "https://api.github.com/graphql";
const startOfMonth = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
};
const yearAgo = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate())).toISOString();
};
const kindOf = (message: string): CommitKind => {
  const prefix = message.match(/^\s*([a-z]+)(\([^)]*\))?!?:/i)?.[1]?.toLowerCase();
  return (COMMIT_KINDS as readonly string[]).includes(prefix ?? "")
    ? (prefix as CommitKind)
    : "other";
};
const streakFrom = (days: { date: string; contributionCount: number }[]): number => {
  const sorted = [...days].sort((a, b) => b.date.localeCompare(a.date));
  const today = new Date().toISOString().slice(0, 10);
  let streak = 0;
  for (const day of sorted) {
    if (day.date > today) continue;
    if (day.contributionCount > 0) {
      streak += 1;
      continue;
    }
    if (day.date === today) continue;
    break;
  }
  return streak;
};
const commitsFrom = (nodes: GithubRepoNode[], login: string): GithubCommit[] => {
  const commits: GithubCommit[] = [];
  const seen = new Set<string>();
  nodes.forEach((repo) => {
    if (!repo || repo.isPrivate) return;
    repo.defaultBranchRef?.target?.history?.nodes?.forEach((commit) => {
      if (!commit?.oid || !commit.messageHeadline || seen.has(commit.oid)) return;
      const author = commit.author?.user?.login;
      if (author && author.toLowerCase() !== login.toLowerCase()) return;
      seen.add(commit.oid);
      commits.push({
        id: commit.oid,
        message: commit.messageHeadline,
        repo: repo.nameWithOwner,
        at: commit.committedDate,
        kind: kindOf(commit.messageHeadline),
      });
    });
  });
  return commits
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, GITHUB_COMMITS_SHOWN);
};
const languagesFrom = (nodes: GithubLangNode[]): GithubLanguage[] => {
  const bytes = new Map<string, number>();
  nodes.forEach((repo) => {
    repo?.languages?.edges?.forEach((edge) => {
      bytes.set(edge.node.name, (bytes.get(edge.node.name) ?? 0) + edge.size);
    });
  });
  const top = [...bytes.entries()].sort((a, b) => b[1] - a[1]).slice(0, GITHUB_LANGS_SHOWN);
  const total = top.reduce((sum, [, size]) => sum + size, 0);
  if (!total) return [];
  const languages = top.map(([name, size], index) => ({
    name,
    percent: Math.round((size / total) * 100),
    color: LANGUAGE_COLORS[index % LANGUAGE_COLORS.length],
  }));
  const drift = 100 - languages.reduce((sum, language) => sum + language.percent, 0);
  languages[0].percent += drift;
  return languages;
};
const fetchActivity = async (token: string): Promise<GithubActivity> => {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": GITHUB_USER,
    },
    body: JSON.stringify({
      query: GITHUB_ACTIVITY_QUERY,
      variables: { monthStart: startOfMonth(), yearStart: yearAgo() },
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`GraphQL ${response.status} ${response.statusText}`);
  const payload = (await response.json()) as GithubGraphResponse;
  if (payload.errors?.length) throw new Error(payload.errors.map((e) => e.message).join("; "));
  const viewer = payload.data?.viewer;
  if (!viewer) throw new Error("GraphQL vrátil prázdného viewera");
  const days = viewer.year?.contributionCalendar?.weeks?.flatMap((week) => week.contributionDays) ?? [];
  return {
    commits: commitsFrom(viewer.recent?.nodes ?? [], viewer.login ?? GITHUB_USER),
    commitsThisMonth:
      (viewer.month?.totalCommitContributions ?? 0) + (viewer.month?.restrictedContributionsCount ?? 0),
    activeRepos: viewer.month?.commitContributionsByRepository?.length ?? 0,
    streakDays: streakFrom(days),
    contributionsThisYear: viewer.year?.contributionCalendar?.totalContributions ?? 0,
    languages: languagesFrom(viewer.langs?.nodes ?? []),
  };
};
const load = async (): Promise<GithubActivity | null> => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("[github] Chybí GITHUB_TOKEN — beru poslední uložený snapshot.");
    return readGithubSnapshot();
  }
  try {
    const activity = await fetchActivity(token);
    await writeGithubSnapshot(activity);
    return activity;
  } catch (error) {
    console.warn("[github] Načtení selhalo, beru snapshot:", error);
    return readGithubSnapshot();
  }
};
export const getGithubActivity = unstable_cache(load, ["github-activity"], {
  revalidate: REVALIDATE_SECONDS,
  tags: [GITHUB_ACTIVITY_TAG],
});