import { Car, Wallet, ShieldCheck, Smartphone } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Car className="w-10 h-10 text-primary" />,
      title: "Flexible Driving",
      description:
        "Drive when you want and earn on your own schedule — no boss, no fixed hours.",
    },
    {
      icon: <Wallet className="w-10 h-10 text-primary" />,
      title: "Weekly Payouts",
      description:
        "Get paid fast and securely with weekly deposits directly to your account.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: "Safety First",
      description:
        "Enjoy rides with advanced safety measures and verified passengers & drivers.",
    },
    {
      icon: <Smartphone className="w-10 h-10 text-primary" />,
      title: "Smart App",
      description:
        "Easy-to-use mobile app with live tracking, instant notifications, and support.",
    },
  ];

  return (
    // <section className="py-16 px-4 bg-gray-50">
    <div className="container mx-auto text-center py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Why Choose <span className="text-primary">GoRide?</span>
      </h2>
      <p className="text-foreground mb-12 max-w-2xl mx-auto">
        We’ve built our platform around safety, reliability, and driver
        empowerment — making every trip rewarding and stress-free.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border border-green-800 border-4 rounded-2xl shadow-sm hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
    // </section>
  );
}
