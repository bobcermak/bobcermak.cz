import Link from "next/link";
import { ArrowSquareOutIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";

const isExternal = (url: string) => /^https?:\/\//.test(url);
type ProjectLinksProps = {
  href: string;
  github?: string;
  title: string;
};
const ProjectLinks = ({ href, github, title }: ProjectLinksProps) => (
  <>
    <div className="pointer-events-none absolute right-5 top-5 z-20 flex items-center gap-2.5">
      {github && (
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} — GitHub`}
          className="pointer-events-auto text-text-3 transition-colors duration-250 hover:text-ink active:text-ink"
        >
          <GithubLogoIcon size={20} weight="fill" />
        </Link>
      )}
      <ArrowSquareOutIcon
        size={20}
        weight="bold"
        className="text-text-3 transition-[translate,color] duration-250 ease-[cubic-bezier(.2,.8,.25,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink group-active:-translate-y-0.5 group-active:translate-x-0.5 group-active:text-ink"
      />
    </div>
    <Link
      href={href}
      target={isExternal(href) ? "_blank" : undefined}
      rel={isExternal(href) ? "noopener noreferrer" : undefined}
      aria-label={title}
      className="absolute inset-0 z-10"
    />
  </>
);
export default ProjectLinks;