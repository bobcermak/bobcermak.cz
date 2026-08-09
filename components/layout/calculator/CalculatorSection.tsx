import { RevealSection } from "@/components";
import CalculatorPanel from "./CalculatorPanel";
import TypeCardContent from "./TypeCardContent";
import OptionContent from "./OptionContent";
import { CALCULATOR_SECTION_ID, formatCzk } from "@/lib/calculator";
import { calculatorExtras, projectTypes, RUSH_LABEL, RUSH_SUB, YEARLY_LABEL, YEARLY_NOTE, YEARLY_PRICE } from "@/types/calculator";

const CalculatorSection = () => {
  return (
    <RevealSection
      id={CALCULATOR_SECTION_ID}
      aria-label="Kalkulačka ceny"
      className="w-full border-y border-border bg-bg-soft py-15"
      reveal={{ perTarget: true, y: 40, scale: 0.96, duration: 0.8, stagger: 0.09, ease: "back.out(1.3)", start: "top 88%" }}
    >
      <div className="mx-auto w-container desktop:w-xsection">
        <header data-reveal className="mb-10">
          <p className="mb-4 text-eyebrow font-semibold uppercase tracking-[0.14em] text-text-3">
            Kalkulačka
          </p>
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="size-3 flex-none rounded-full bg-accent-blue-strong ring-4 ring-accent-blue-strong/20 animate-pulse"
            />
            <h2>Spočítej si cenu webu</h2>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-border tablet:block"/>
            <span className="hidden whitespace-nowrap text-eyebrow font-semibold uppercase tracking-[0.12em] text-text-3 tablet:block">
              nezávazně · do 24 h
            </span>
          </div>
          <p className="mt-3 max-w-[52ch]">
            Poskládej si projekt a uvidíš orientační rozpočet. Přesnou nabídku pak proberem osobně.
          </p>
        </header>
        <CalculatorPanel
          types={projectTypes.map((type) => ({ id: type.id, content: <TypeCardContent type={type}/> }))}
          extras={calculatorExtras.map((extra) => ({
            id: extra.id,
            content: <OptionContent label={extra.label} sub={`+${formatCzk(extra.price)} Kč`} emphasizeSub/>,
          }))}
          rushContent={<OptionContent label={RUSH_LABEL} sub={RUSH_SUB}/>}
        />
        <p data-reveal className="mt-8 text-[12.5px] leading-[1.6] text-text-3">
          * Statický web zdarma a cena mobilní aplikace se odvíjí od rozsahu — ozvi se a probereme to.
          <br/>
          {YEARLY_LABEL} {formatCzk(YEARLY_PRICE)} Kč/rok ({YEARLY_NOTE}) běží ke každé zakázce a je
          v ceně už započítaná.
        </p>
      </div>
    </RevealSection>
  );
};
export default CalculatorSection;