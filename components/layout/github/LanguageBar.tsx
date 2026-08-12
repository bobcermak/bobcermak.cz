import type { FC } from "react";
import { GITHUB_LANGS_TITLE, type GithubLanguage } from "@/types/github";

const LanguageBar: FC<{ languages: GithubLanguage[] }> = ({ languages }) => {
  if (!languages.length) return null;
  return (
    <div className="rounded-[18px] border border-border bg-white p-5 xphone:p-5.5">
      <p className="mb-4 text-[15px] font-semibold text-ink">{GITHUB_LANGS_TITLE}</p>
      <div aria-hidden="true" className="mb-4 flex h-2.5 overflow-hidden rounded-full bg-bg-tint">
        {languages.map((language) => (
          <span
            key={language.name}
            style={{ width: `${language.percent}%`, backgroundColor: language.color }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-3.5 gap-y-2">
        {languages.map((language) => (
          <li key={language.name} className="inline-flex items-center gap-[7px] text-[12.5px] text-text-2">
            <span
              aria-hidden="true"
              style={{ backgroundColor: language.color }}
              className="size-2.5 flex-none rounded-full"
            />
            {language.name}
            <span className="tabular-nums text-placeholder">{language.percent} %</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LanguageBar;