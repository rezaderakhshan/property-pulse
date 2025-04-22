import FeaturedProperties from "@/components/featured-properties";
import Hero from "@/components/hero";
import HomeProperties from "@/components/home-properties";
import InfoBoxes from "@/components/info-boxes";

const Page = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default Page;
