import type { FC } from "react";
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import CommitRow from "./CommitRow";
import LanguageBar from "./LanguageBar";
import { czPlural, GITHUB_COMMITS_NOTE, GITHUB_COMMITS_TITLE, GITHUB_PROFILE_URL, GITHUB_SECTION_ID, GITHUB_STATS, GITHUB_TITLE, GITHUB_USER, type GithubActivity } from "@/types/github";

const GithubSection: FC<{ activity: GithubActivity | null }> = ({ activity }) => {
  if (!activity) return null;
  return (
    <section
      id={GITHUB_SECTION_ID}
      aria-labelledby={`${GITHUB_SECTION_ID}-title`}
      className="mt-16 scroll-mt-28"
    >
      <header data-reveal className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span
          aria-hidden="true"
          className="size-3 flex-none rounded-full animate-pulse bg-accent-purple shadow-[0_0_0_4px_rgba(206,190,236,0.3)]"
        />
        <h2 id={`${GITHUB_SECTION_ID}-title`} className="min-w-0 text-[clamp(1.5rem,3.2vw,2rem)]">
          {GITHUB_TITLE}
        </h2>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-border stablet:block"/>
        <Link
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex flex-none items-center gap-2 whitespace-nowrap text-[13px] font-semibold text-ink transition-colors duration-250 hover:text-text-2 active:text-text-2 stablet:ml-0"
        >
          <GithubLogoIcon size={16} weight="fill" aria-hidden="true"/>@{GITHUB_USER}
        </Link>
      </header>
      <div className="grid grid-cols-1 gap-4.5 mlaptop:grid-cols-[1.4fr_minmax(0,1fr)]">
        <div data-reveal className="overflow-hidden rounded-[18px] border border-border bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 xphone:px-5.5">
            <p className="text-[15px] font-semibold text-ink">{GITHUB_COMMITS_TITLE}</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-3">
              {GITHUB_COMMITS_NOTE}
            </p>
          </div>
          {activity.commits.length ? (
            <ul>
              {activity.commits.map((commit) => (
                <CommitRow key={commit.id} commit={commit}/>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-8 text-center text-sm text-text-3">
              Poslední commity byly v privátních repozitářích.
            </p>
          )}
        </div>
        <div className="flex h-full flex-col gap-4.5">
          <dl
            data-reveal
            className="grid flex-1 grid-cols-2 content-between gap-5 rounded-[18px] border border-border bg-white p-5 xphone:p-5.5"
          >
            {GITHUB_STATS.map((stat) => {
              const value = activity[stat.id];
              const label = czPlural(value, stat.forms);
              return (
                <div key={stat.id}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="p-2">
                    <span className="block text-[clamp(1.6rem,3vw,2.2rem)] font-light leading-none tracking-[-0.03em] tabular-nums text-ink">
                      {value}
                    </span>
                    <span className="mt-1.5 block text-xs text-text-3">{label}</span>
                  </dd>
                </div>
              );
            })}
          </dl>
          <div data-reveal>
            <LanguageBar languages={activity.languages}/>
          </div>
        </div>
      </div>
    </section>
  );
};
export default GithubSection;