import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aminul Rahman",
    role: "Driver, Dhaka",
    rating: 5,
    comment:
      "The app changed my life! I can drive whenever I want and earn well. Super easy to use.",
  },
  {
    name: "Tania Chowdhury",
    role: "Rider, Chittagong",
    rating: 4,
    comment:
      "Very reliable and safe. The drivers are professional and the rides are comfortable!",
  },
  {
    name: "Rafiq Hasan",
    role: "Driver, Sylhet",
    rating: 5,
    comment:
      "Flexible hours, great support team, and fair earnings. Highly recommend it!",
  },
];

export default function Testimonial() {
  return (
    <div className="container mx-auto text-center py-16">
      <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
      <p className="text-muted-foreground mb-8">
        Real stories from our happy drivers and riders
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <Card
            key={idx}
            className="shadow-md rounded-2xl p-6 flex flex-col items-center text-center transition hover:shadow-lg"
          >
            <CardContent className="flex mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-yellow-500"
                />
              ))}
            </CardContent>
            <CardDescription>
              <p className="text-green-700 italic mb-4">“{t.comment}”</p>
              <h4 className="text-foreground font-semibold">{t.name}</h4>
              <p className="text-sm text-foreground-300">{t.role}</p>
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}
