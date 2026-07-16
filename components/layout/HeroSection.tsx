import { Button, RevealSection } from "@/components";
import { type FC } from "react";

type HeroSectionProps = {
  eyebrow?: string,
  title?: string,
  subtitle?: string
};
const HeroSection: FC<HeroSectionProps> = ({
  eyebrow = "K dispozici pro nové projekty",
  title = "Stavím weby a appky, které si na nic nehrajou.",
  subtitle = "Full stack developer z Prahy a Liberce. Next.js, React Native a Supabase — od prvního nápadu až po nasazení. Bez keců, bez WordPressu.",
}) => {
  return (
    <RevealSection
      scrollTrigger={false}
      id="hero"
      aria-label="Úvod"
      className="relative mx-auto flex min-h-[calc(100dvh-1rem)] w-container max-w-[1120px] flex-col justify-center py-32 slaptop:py-40"
    >
      <div
        data-reveal
        className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-border bg-bg-soft px-4 py-2 text-eyebrow font-semibold tracking-[0.12em] uppercase text-text-3"
      >
        <span className="relative flex size-2.5 shrink-0">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-green opacity-75" />
          <span className="relative size-2.5 rounded-full bg-accent-green" />
        </span>
        {eyebrow}
      </div>
      <h1
        data-reveal
        className="max-w-[16ch] text-[clamp(2.5rem,5.6vw,4.8rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink"
      >
        {title}
      </h1>
      <p data-reveal className="mt-6 max-w-[56ch] text-sub leading-relaxed text-text-2">
        {subtitle}
      </p>
      <div
        data-reveal
        className="mt-9 flex flex-col items-stretch gap-3 xphone:flex-row xphone:items-center"
      >
        <Button href="#kalkulacka" variant="primary" ariaLabel="Spočítat cenu webu">
          Spočítat cenu webu
        </Button>
        <Button
          href="/projekty"
          variant="secondary"
          isArrow={false}
          ariaLabel="Moje projekty"
        >
          Moje projekty
        </Button>
      </div>
    </RevealSection>
  );
};
export default HeroSection;