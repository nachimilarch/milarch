import HeroSection from "@/components/sections/HeroSection";
import BrandSplitSection from "@/components/sections/BrandSplitSection";
import PharmaShowcase from "@/components/sections/PharmaShowcase";
import MissionVision from "@/components/sections/MissionVision";
import TechServices from "@/components/sections/TechServices";
import StatsSection from "@/components/sections/StatsSection";
import FounderSection from "@/components/sections/FounderSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandSplitSection />
      <PharmaShowcase />
      <MissionVision />
      <TechServices />
      <StatsSection />
      <FounderSection />
      <ContactSection />
    </>
  );
}
