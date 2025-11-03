import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center py-16 px-4">
      {/* Left Side - Contact Info */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Get in Touch with <span className="text-primary">GoRide</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Have questions about driving, riding, or partnerships? Reach out to us
          — we’d love to hear from you.
        </p>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="text-primary w-5 h-5" />
            <p>support@test.com</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-primary w-5 h-5" />
            <p>+1 (800) 555-1234</p>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-primary w-5 h-5" />
            <p>5020 Sunridge Palms Drive, Florida, USA</p>
          </div>
        </div>
      </div>

      <form className="border-l-4 shadow-lg rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-2xl font-semibold mb-4">Send us a Message</h3>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <Input id="name" placeholder="Your name" />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <Textarea id="message" rows={4} placeholder="Write your message..." />
        </div>

        <Button type="submit" className="w-full mt-4">
          Send Message
        </Button>
      </form>
    </div>
  );
}
