import { HeroSection, ServicesSection, FeaturedProjects, SharedApis, CalculatorSection, AboutSection } from "@/components";

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
    </>
  );
};
export default HomePage;