import Link from "next/link";
import { EnvelopeSimpleIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/ssr";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, GITHUB_URL, LINKEDIN_URL } from "@/types/contact";
import { LEGAL_LINKS, SOURCE_REPO } from "@/types/legal";
import PoweredBy from "./PoweredBy";

const SOCIALS = [
  { href: GITHUB_URL, label: "GitHub", Icon: GithubLogoIcon },
  { href: LINKEDIN_URL, label: "LinkedIn", Icon: LinkedinLogoIcon },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Email", Icon: EnvelopeSimpleIcon },
];
const MUTED_LINK = "text-text-3 transition-colors duration-250 hover:text-ink active:text-ink";
const Footer = () => (
  <footer id="kontakt" className="mt-15 tablet:mt-20 border-t border-border bg-bg-soft">
    <div className="mx-auto w-container max-w-[1200px]">
      <div className="flex flex-col gap-10 py-14 slaptop:flex-row slaptop:items-start slaptop:justify-between slaptop:py-16">
        <div className="min-w-0">
          <p className="text-[clamp(2.4rem,6.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            Máš projekt?
            <span className="text-placeholder block">Napiš mi.</span>
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {[
              { href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
              { href: CONTACT_PHONE_HREF, label: CONTACT_PHONE },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group block w-fit">
                <span className="relative inline-block text-[clamp(1.05rem,2.2vw,1.35rem)] font-medium tracking-[-0.01em] text-ink">
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-[cubic-bezier(.2,.8,.25,1)] group-hover:scale-x-100 group-active:scale-x-100"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <nav aria-label="Sociální sítě" className="flex flex-col gap-4">
          {SOCIALS.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex w-fit items-center gap-3 text-text-2 transition-colors duration-250 hover:text-ink active:text-ink"
            >
              <social.Icon
                size={26}
                weight="fill"
                className="flex-none transition-transform duration-250 ease-[cubic-bezier(.2,.8,.25,1)] group-hover:-translate-y-0.5 group-hover:scale-110 group-active:-translate-y-0.5 group-active:scale-110"
              />
              <span className="text-[15px] font-medium">{social.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-4 border-t border-border py-6 text-sm laptop:flex-row laptop:items-center laptop:justify-between">
        <p className="text-text-3">© {new Date().getFullYear()} Bob Čermák - Všechna práva vyhrazena</p>
        <nav aria-label="Právní informace" className="flex flex-wrap items-center gap-x-8 gap-y-1.5">
          {LEGAL_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className={MUTED_LINK}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href={SOURCE_REPO} target="_blank" rel="noopener noreferrer" className={MUTED_LINK}>
          tenhle web je open source ↗
        </Link>
      </div>
      <div className="flex justify-center border-t border-border py-5">
        <PoweredBy powered="powered" firstName="Bob" lastName="Čermák" link="#hero"/>
      </div>
    </div>
  </footer>
);
export default Footer;