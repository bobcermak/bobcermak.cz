import { Button, RevealSection } from "@/components";
import HeroLanyard from "./HeroLanyard";
import ScrollHint from "./ScrollHint";
import { type FC } from "react";

type HeroSectionProps = {
  eyebrow?: string,
  title?: string,
  subtitle?: string
};
const HeroSection: FC<HeroSectionProps> = ({ eyebrow = "K dispozici pro nové projekty", title = "Stavím weby a appky, které si na nic nehrajou.", subtitle = "Full stack developer — Next.js, React Native, Supabase. Od statického webu po rezervační systém s vlastním CMS." }) => {
  return (
    <RevealSection scrollTrigger={false} id="hero" aria-label="Úvod" className="relative w-full overflow-hidden">
      <div className="pointer-events-none relative mx-auto flex min-h-[150dvh] w-container flex-col justify-start pt-44 stablet:pt-48 tablet:min-h-dvh tablet:justify-center tablet:pt-0 desktop:w-section">
        <div className="pointer-events-none tablet:pointer-events-auto backdrop-blur-md tablet:backdrop-blur-none bg-white/10 tablet:bg-transparent z-10 tablet:z-auto w-fit py-10 px-5 tablet:p-0 rounded-[20px] tablet:rounded-none">
          <header className="pointer-events-none tablet:pointer-events-auto">
            <p
              data-reveal
              className="pointer-events-none relative mb-8 inline-flex w-fit items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-text-3"
            >
              <span className="size-2 shrink-0 rounded-full bg-ink animate-pulse"/>
              {eyebrow}
            </p>
            <h1
              data-reveal
              className="pointer-events-none relative max-w-[15ch] text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink"
            >
              <span className="pointer-events-none">{title}</span>
            </h1>
            <p data-reveal className="pointer-events-none relative mt-4 max-w-[52ch] text-sub leading-relaxed text-text-2 tablet:max-w-88 laptop:max-w-120">
              <span className="pointer-events-none">{subtitle}</span>
            </p>
          </header>
          <div
            data-reveal
            className="pointer-events-auto relative z-30 mt-8 flex flex-col items-stretch gap-2 tablet:flex-row tablet:items-center"
          >
            <Button className="flex" href="#calculator" ariaLabel="Spočítat cenu projektu">
              <span className="whitespace-nowrap">
                Spočítat cenu <span className="hidden phone:inline">projektu</span>
              </span>
            </Button>
            <Button href="/projekty" variant="secondary" isArrow={false} ariaLabel="Moje projekty">
              Moje projekty
            </Button>
          </div>
        </div>
        <span className="pointer-events-none absolute bottom-36 laptop:right-40 min-[1400px]:right-50 min-[1500px]:right-60 desktop:-right-25 min-[1700px]:right-10 xldesktop:right-25 z-0 hidden text-eyebrow font-medium uppercase tracking-[0.14em] text-text-3 laptop:block motion-safe:animate-[floatUp_1.2s_cubic-bezier(.2,.8,.25,1)_1s_both]">
          <span className="mr-1 inline-block motion-safe:animate-bounce">↑</span>Chyť kartu a zatahej
        </span>
      </div>
      <HeroLanyard/>
      <ScrollHint/>
    </RevealSection>
  );
};
export default HeroSection;