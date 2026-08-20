import { RevealSection } from "@/components";
import ApiFilter from "./ApiFilter";
import ApiRow from "./ApiRow";
import { apis, apiFilters } from "@/types/apis";

const SharedApis = () => {
  return (
    <RevealSection
      id="api-tipy"
      aria-label="Rád sdílím dobré API"
      className="w-full border-y border-border-mint bg-bg-mint pt-20 pb-15"
    >
      <div className="mx-auto w-container laptop:w-xsection">
        <header data-reveal className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <h2>Rád sdílím dobré API</h2>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.12em] text-text-3">
            / dev tipy
          </p>
        </header>
        <p data-reveal className="mb-8 max-w-[54ch]">
          Když někdo staví projekt, rád poradím. Tohle jsou služby se štědrým free tierem, po
          kterých sáhnu jako první — ať se dá začít bez placeného předplatného.
        </p>
        <ApiFilter
          filters={apiFilters}
          items={apis.map((api) => ({ key: api.num, cats: api.cats, row: <ApiRow api={api}/> }))}
        />
      </div>
    </RevealSection>
  );
};
export default SharedApis;