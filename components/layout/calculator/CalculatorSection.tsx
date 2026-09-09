import { RevealSection } from "@/components";
import BackdropLines from "./BackdropLines";
import CalculatorPanel from "./CalculatorPanel";
import { CALCULATOR_SECTION_ID, formatCzk } from "@/lib/calculator";
import { YEARLY_LABEL, YEARLY_NOTE, YEARLY_PRICE } from "@/types/calculator";

const CalculatorSection = () => {
  return (
    <RevealSection
      id={CALCULATOR_SECTION_ID}
      aria-label="Kalkulačka ceny"
      className="relative flex min-h-svh w-full items-center overflow-hidden bg-bg-soft py-30"
      reveal={{ y: 40, duration: 0.9, stagger: 0.12, start: "top 88%" }}
    >
      <BackdropLines/>
      <div data-stage-depth className="relative mx-auto w-container laptop:w-content">
        <header data-reveal className="mb-6">
          <p className="mb-3 text-eyebrow font-semibold uppercase tracking-[0.14em] text-text-3">
            Kalkulačka
          </p>
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="size-3 flex-none rounded-full bg-accent-blue-strong ring-4 ring-accent-blue-strong/25 motion-safe:animate-pulse"
            />
            <h2>Spočítej si cenu webu</h2>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-border tablet:block"/>
            <span className="hidden whitespace-nowrap text-eyebrow font-semibold uppercase tracking-[0.12em] text-text-3 tablet:block">
              nezávazně · do 24 h
            </span>
          </div>
          <p className="mt-3 max-w-[78ch]">
            Poskládej si projekt a uvidíš orientační rozpočet. Přesnou nabídku pak proberem osobně.
          </p>
        </header>
        <CalculatorPanel
          note={`* Statický web zdarma a cena mobilní aplikace se odvíjí od rozsahu — ozvi se a probereme to. ${YEARLY_LABEL} ${formatCzk(YEARLY_PRICE)} Kč/rok (${YEARLY_NOTE}) běží ke každé zakázce a je v ceně už započítaná.`}
        />
      </div>
    </RevealSection>
  );
};
export default CalculatorSection;