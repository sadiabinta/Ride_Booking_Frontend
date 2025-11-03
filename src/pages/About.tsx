import aboutImg1 from "@/assets/images/booking.jpg";
import aboutImg2 from "@/assets/images/register.jpg";

export default function AboutUsSection() {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 py-16">
      <div className="flex-1 grid grid-cols-2 gap-4">
        <img
          src={aboutImg1}
          alt="Drivers working happily"
          className="rounded-2xl shadow-md object-cover w-full h-60 md:h-80"
        />
        <img
          src={aboutImg2}
          alt="Riders enjoying rides"
          className="rounded-2xl shadow-md object-cover w-full h-60 md:h-80 mt-6 md:mt-16"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          About <span className="text-primary">GoRide</span>
        </h2>
        <p className="text-foregound-600 mb-4 leading-relaxed">
          GoRide is a modern ride-sharing platform built to empower drivers and
          provide safe, affordable rides for passengers across Bangladesh. With
          our flexible model, drivers earn on their own schedule while
          passengers enjoy a seamless, comfortable experience.
        </p>
        <p className="text-foreground-600 mb-4 leading-relaxed">
          Since our launch, we’ve completed over{" "}
          <strong>35 million+ trips</strong> and impacted{" "}
          <strong>10 million+ lives</strong>. Our goal is to make every ride
          smoother, safer, and more rewarding — for everyone.
        </p>
        <button className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition">
          Learn More
        </button>
      </div>
    </div>
  );
}
