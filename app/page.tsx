import { HeroSection, ServicesSection, FeaturedProjects, SharedApis, CalculatorSection, AboutSection, ContactSection } from "@/components";
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
      <ServicesSection/>
      <FeaturedProjects/>
      <SharedApis/>
      <CalculatorSection/>
      <AboutSection/>
      <ContactSection/>
    </>
  );
};
export default HomePage;