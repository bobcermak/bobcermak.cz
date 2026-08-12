export const GITHUB_USER = "bobcermak";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`;
export const GITHUB_SECTION_ID = "github";
export const GITHUB_TITLE = "Co teď kóduju";
export const GITHUB_COMMITS_TITLE = "Poslední commity";
export const GITHUB_COMMITS_NOTE = "veřejná aktivita";
export const GITHUB_LANGS_TITLE = "Jazyky";
export const GITHUB_COMMITS_SHOWN = 5;
export const GITHUB_LANGS_SHOWN = 4;
export const COMMIT_KINDS = ["feat", "fix", "refactor", "chore", "docs", "other"] as const;
export type CommitKind = (typeof COMMIT_KINDS)[number];
export type GithubCommit = {
  id: string;
  message: string;
  repo: string;
  at: string;
  kind: CommitKind;
};
export type GithubLanguage = {
  name: string;
  percent: number;
  color: string;
};
export type GithubActivity = {
  commits: GithubCommit[];
  commitsThisMonth: number;
  activeRepos: number;
  streakDays: number;
  contributionsThisYear: number;
  languages: GithubLanguage[];
};
export type CzechForms = readonly [one: string, few: string, many: string];
export const czPlural = (count: number, forms: CzechForms): string =>
  count === 1 ? forms[0] : count >= 2 && count <= 4 ? forms[1] : forms[2];
export type GithubStat = {
  id: keyof Pick<
    GithubActivity,
    "commitsThisMonth" | "activeRepos" | "streakDays" | "contributionsThisYear"
  >;
  forms: CzechForms;
};
export const GITHUB_STATS: GithubStat[] = [
  { id: "commitsThisMonth", forms: ["commit tento měsíc", "commity tento měsíc", "commitů tento měsíc"] },
  { id: "activeRepos", forms: ["aktivní repozitář", "aktivní repozitáře", "aktivních repozitářů"] },
  { id: "streakDays", forms: ["den v řadě", "dny v řadě", "dní v řadě"] },
  { id: "contributionsThisYear", forms: ["příspěvek za rok", "příspěvky za rok", "příspěvků za rok"] },
];
export const LANGUAGE_COLORS = ["#6f86d6", "#e0a373", "#cebeec", "#8ab98f"] as const;