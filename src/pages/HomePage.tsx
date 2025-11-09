import Banner from "@/components/modules/homepage/Banner";
import CountSec from "@/components/modules/homepage/CountSec";
import HeroSection from "@/components/modules/homepage/HeroSection";
import Testimonial from "@/components/modules/homepage/Testimonial";

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
