import { HeroSection, ServicesSection, FeaturedProjects, SharedApis, CalculatorSection, AboutSection, ContactSection } from "@/components";

export const revalidate = 86400;
const HomePage = () => {
  return (
    <>
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