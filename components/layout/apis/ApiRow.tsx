import type { FC } from "react";
import { ArrowUpRightIcon, BarcodeIcon, DatabaseIcon, EnvelopeSimpleIcon, FilmSlateIcon, ForkKnifeIcon, MapPinIcon, SparkleIcon } from "@phosphor-icons/react/ssr";
import ProjectTag from "../projects/ProjectTag";
import type { Api, ApiIcon } from "@/types/apis";

const icons: Record<ApiIcon, typeof SparkleIcon> = {
  database: DatabaseIcon,
  sparkle: SparkleIcon,
  envelope: EnvelopeSimpleIcon,
  barcode: BarcodeIcon,
  map: MapPinIcon,
  film: FilmSlateIcon,
  fork: ForkKnifeIcon,
};
type ApiRowProps = {
  api: Api;
};
const ApiRow: FC<ApiRowProps> = ({ api }) => {
  const { num, name, free, icon, tags, desc, url } = api;
  const Icon = icons[icon];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — otevřít v novém okně`}
      className="group grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-x-[clamp(12px,2.6vw,32px)] gap-y-3.5 border-b border-border-mint px-6 py-[clamp(28px,2.6vw,36px)] transition-[padding,background-color] duration-250 ease-[cubic-bezier(.2,.8,.25,1)] hover:bg-white/70 hover:pl-5 active:bg-white/70 active:pl-5 laptop:grid-cols-[auto_auto_minmax(0,1.05fr)_minmax(0,1.3fr)_auto]"
    >
      <p className="col-start-1 mt-4 xphone:mt-0 row-start-1 w-[clamp(38px,6vw,72px)] text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[0.9] tracking-[-0.03em] text-muted-num transition-colors duration-250 group-hover:text-ink group-active:text-ink">
        {num}
      </p>
      <span
        aria-hidden="true"
        className="absolute xphone:static top-2 left-2 col-start-2 row-start-1 grid size-9 place-items-center rounded-xl bg-ink text-white transition-transform duration-250 ease-[cubic-bezier(.2,.8,.25,1)] group-hover:-rotate-6 group-hover:scale-105 group-active:-rotate-6 group-active:scale-105 xphone:size-11 laptop:size-12"
      >
        <Icon size={20}/>
      </span>
      <div className="col-start-3 row-start-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
          <h3 className="min-w-0 text-[clamp(1.1rem,2vw,1.45rem)] font-semibold tracking-[-0.015em] text-ink">
            {name}
          </h3>
          <p className="max-w-full rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] leading-[1.2] text-white">
            {free}
          </p>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <ProjectTag key={tag}>{tag}</ProjectTag>
          ))}
        </div>
      </div>
      <p className="col-span-full row-start-2 text-sm leading-[1.55] text-text-2 transition-colors duration-250 group-hover:text-ink group-active:text-ink laptop:col-span-1 laptop:col-start-4 laptop:row-start-1 laptop:text-base">
        {desc}
      </p>
      <span className="col-start-4 row-start-1 inline-flex items-center justify-self-end gap-2 whitespace-nowrap text-[13px] font-semibold text-text-3 laptop:col-start-5">
        <ArrowUpRightIcon
          size={20}
          aria-hidden="true"
          className="text-muted-num transition-[color,rotate] duration-250 ease-[cubic-bezier(.2,.8,.25,1)] group-hover:rotate-45 group-active:rotate-45 group-hover:text-ink group-active:text-ink"
        />
      </span>
    </a>
  );
};
export default ApiRow;