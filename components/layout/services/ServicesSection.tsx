import { RevealSection } from "@/components";
import ServiceRow from "./ServiceRow";
import { services } from "@/types/services";

const ServicesSection = () => {
  return (
    <RevealSection
      id="co-delam"
      aria-label="Co dělám"
      className="logo-grid-edges w-full pt-20 tablet:pt-0 tablet:-mt-10 slaptop:pt-5 slaptop:mt-0 pb-15"
      reveal={{ y: 48, duration: 1.25, stagger: 0.16 }}
    >
      <div className="mx-auto w-container laptop:w-section">
        <header data-reveal className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
          <h2>
            Co dělám
          </h2>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-text-3">
            tři věci, pořádně
          </p>
        </header>
        <div className="border-t border-border">
          {services.map((service) => (
            <ServiceRow key={service.num} service={service}/>
          ))}
        </div>
      </div>
    </RevealSection>
  );
};
export default ServicesSection;