import { RevealSection } from "@/components";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import { CONTACT_EYEBROW, CONTACT_LEAD, CONTACT_SECTION_ID, CONTACT_TITLE } from "@/types/contact";

const ContactSection = () => {
  return (
    <RevealSection
      id={CONTACT_SECTION_ID}
      aria-label="Spolupráce a dotazy"
      className="w-full pt-5"
      drift={{ distance: 120, rotate: 1.5, scale: 0.96, direction: "right" }}
    >
      <div
        data-drift
        className="mx-auto grid w-container grid-cols-1 overflow-hidden rounded-[20px] border border-border bg-white shadow-card mlaptop:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] desktop:w-section"
      >
        <div className="flex flex-col gap-10 p-7 xphone:p-9 mlaptop:justify-between desktop:p-11">
          <header>
            <p className="mb-4 text-eyebrow font-semibold uppercase tracking-[0.14em] text-text-3">
              {CONTACT_EYEBROW}
            </p>
            <h2 className="mb-4 text-[clamp(2rem,5vw,3.1rem)]">{CONTACT_TITLE}</h2>
            <p className="max-w-[38ch]">{CONTACT_LEAD}</p>
          </header>
          <ContactInfo/>
        </div>
        <div className="border-t border-border p-7 xphone:p-9 mlaptop:border-l mlaptop:border-t-0 desktop:p-11">
          <ContactForm/>
        </div>
      </div>
    </RevealSection>
  );
};
export default ContactSection;