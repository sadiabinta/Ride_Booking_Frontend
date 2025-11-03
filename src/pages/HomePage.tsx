import Banner from "@/components/modules/homepage/banner";
import CountSec from "@/components/modules/homepage/CountSec";
import HeroSection from "@/components/modules/homepage/HeroSection";
import Testimonial from "@/components/modules/homepage/testimonial";

export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <Banner />
      <CountSec />
      <Testimonial />
    </div>
  );
}
