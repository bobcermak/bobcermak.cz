import { Button, RevealSection } from "@/components";
import LanyardScene from "@/components/three/LanyardScene";
import { type FC } from "react";

type HeroSectionProps = {
  eyebrow?: string,
  title?: string,
  subtitle?: string
};
const HeroSection: FC<HeroSectionProps> = ({ eyebrow = "K dispozici pro nové projekty", title = "Stavím weby a appky, které si na nic nehrajou.", subtitle = "Full stack developer — Next.js, React Native, Supabase. Od statického webu po rezervační systém s vlastním CMS." }) => {
  return (
    <RevealSection scrollTrigger={false} id="hero" aria-label="Úvod" className="relative w-full overflow-hidden">
      <div className="relative mx-auto flex w-container flex-col justify-start pt-44 stablet:pt-48 tablet:min-h-dvh tablet:justify-center tablet:pt-0 desktop:w-section">
        <header className="pointer-events-none">
          <p
            data-reveal
            className="pointer-events-auto relative z-30 mb-8 inline-flex w-fit items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-text-3"
          >
            <span className="size-2 shrink-0 rounded-full bg-ink animate-pulse"/>
            {eyebrow}
          </p>
          <h1
            data-reveal
            className="pointer-events-none relative z-30 max-w-[15ch] text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink"
          >
            <span className="pointer-events-auto">{title}</span>
          </h1>
          <p data-reveal className="pointer-events-none relative z-30 mt-4 max-w-[52ch] text-sub leading-relaxed text-text-2 tablet:max-w-88 laptop:max-w-120">
            <span className="pointer-events-auto">{subtitle}</span>
          </p>
        </header>
        <div
          data-reveal
          className="relative z-30 mt-8 flex flex-col items-stretch gap-2 tablet:flex-row tablet:items-center"
        >
          <Button href="#kalkulacka" ariaLabel="Spočítat cenu projektu">
            Spočítat cenu projektu
          </Button>
          <Button href="/projekty" variant="secondary" isArrow={false} ariaLabel="Moje projekty">
            Moje projekty
          </Button>
        </div>
        <span className="pointer-events-none absolute bottom-36 right-15 min-[1049px]:right-30 desktop:-right-8 xldesktop:right-25 z-30 hidden text-eyebrow font-medium uppercase tracking-[0.14em] text-text-3 tablet:block">
          <span className="mr-1 inline-block motion-safe:animate-bounce">↑</span>Chyť kartu a zatahej
        </span>
      </div>
      <div
        className="relative z-0 -mt-70 stablet:-mt-90 ml-30 h-[78vh] w-full touch-pan-y tablet:absolute tablet:-right-15 xldesktop:right-15 tablet:bottom-30 tablet:top-[-10dvh] tablet:mt-0 tablet:h-auto tablet:w-[54%]"
        aria-hidden="true"
      >
        <LanyardScene className="h-full w-full" position={[0, 0, 15]} />
      </div>
    </RevealSection>
  );
};
export default HeroSection;