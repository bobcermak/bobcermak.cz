import { HeroSection, ServicesSection, FeaturedProjects, SharedApis, CalculatorSection, AboutSection, ContactSection, PromoPopup } from "@/components";

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
      <PromoPopup/>
    </>
  );
};
export default HomePage;