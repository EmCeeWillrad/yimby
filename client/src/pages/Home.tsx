import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import AffordabilityGuide from "@/components/home/AffordabilityGuide";
import PopularListings from "@/components/home/PopularListings";
import HousingProgramsSection from "@/components/home/HousingProgramsSection";
import MapSearch from "@/components/home/MapSearch";
import MobileAppSection from "@/components/home/MobileAppSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AffordableHomes - Find Your Next Affordable Home</title>
        <meta name="description" content="Search thousands of affordable housing options across the country. Find Section 8, income-restricted, and subsidized housing properties that match your needs." />
      </Helmet>
      
      <HeroSection />
      <AffordabilityGuide />
      <PopularListings />
      <HousingProgramsSection />
      <MapSearch />
      <MobileAppSection />
      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
