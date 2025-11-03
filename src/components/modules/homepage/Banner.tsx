import { Button } from "@/components/ui/button";
import bannerImage from "../../../assets/images/bannerImg.png";
import { Link } from "react-router";

export default function Banner() {
  return (
    <div className="my-16 flex flex-col md:flex-row items-center justify-center container mx-auto min-h-screen gap-6 md:gap-12">
      <div className="text-center md:w-1/2">
        <h1 className="text-3xl sm:text-5xl font-bold">
          Drive when you want, what you need
        </h1>
        <p className="py-4 text-lg sm:text-xl">Earn on your own schedule</p>
        <Link to="/register">
          <Button>Sign Up Now</Button>
        </Link>
      </div>

      <div className="md:w-1/2 w-full flex justify-center">
        <img src={bannerImage} alt="Banner" className="max-w-full h-auto" />
      </div>
    </div>
  );
}
