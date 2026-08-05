import Image from "next/image";
import { RevealSection } from "@/components";
import ProjectTag from "../projects/ProjectTag";
import { yearsSince } from "@/lib/age";
import { ABOUT_BIRTH, ABOUT_PHOTO, ABOUT_SECTION_ID, ABOUT_STACK, aboutBio } from "@/types/about";

const AboutSection = () => {
  const age = yearsSince(ABOUT_BIRTH);
  return (
    <RevealSection
      id={ABOUT_SECTION_ID}
      aria-label="O mně"
      className="w-full py-15"
      drift={{ distance: 160, rotate: 3.5, duration: 1.35, direction: "left" }}
    >
      <div className="mx-auto grid w-container grid-cols-1 items-center gap-8 stablet:grid-cols-[200px_minmax(0,1fr)] stablet:gap-11 laptop:grid-cols-[240px_minmax(0,1fr)] desktop:w-section">
        <header
          data-drift
          className="relative aspect-square w-full max-w-55 overflow-hidden rounded-2xl border border-border bg-bg-tint stablet:max-w-none"
        >
          <Image
            src={ABOUT_PHOTO}
            alt="Bob Čermák"
            fill
            sizes="(max-width: 640px) 220px, (max-width: 1280px) 200px, 240px"
            className="object-cover"
          />
        </header>
        <div data-drift="0.55" className="min-w-0">
          <p className="mb-4 text-eyebrow font-semibold uppercase tracking-[0.14em] text-text-3">
            O mně
          </p>
          <p className="mb-6 text-[clamp(1.15rem,2.4vw,1.85rem)] font-medium leading-[1.4] tracking-[-0.015em] text-ink">
            {aboutBio(age)}
          </p>
          <ul className="flex flex-wrap gap-2">
            {ABOUT_STACK.map((item) => (
              <li key={item} data-drift-item>
                <ProjectTag>{item}</ProjectTag>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </RevealSection>
  );
};
export default AboutSection;