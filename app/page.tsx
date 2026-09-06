import { HeroSection, ServicesSection, FeaturedProjects, CalculatorSection, AboutSection, ContactSection, ScrollStage } from "@/components";
import JsonLd from "@/components/seo/JsonLd";
import { profileSchema, servicesSchema } from "@/lib/seo/structuredData";

export const revalidate = 86400;
const HomePage = () => {
  return (
    <>
      <section hidden aria-hidden="true">
        <JsonLd data={profileSchema()}/>
        <JsonLd data={servicesSchema()}/>
      </section>
      <HeroSection/>
      <ScrollStage>
        <AboutSection/>
        <ServicesSection/>
      </ScrollStage>
      <FeaturedProjects/>
      {/* <SharedApis/> */}
      <ScrollStage direction="vertical">
        <CalculatorSection/>
        <ContactSection/>
      </ScrollStage>
    </>
  );
};
export default HomePage;