import ride from "../assets/images/booking.jpg";

import { RegistrationForm } from "@/components/modules/authentication/RegistrationForm";

export default function Register() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute z-10 top-0 left-0">
        <RegistrationForm />
      </div>

      <div className="w-full h-screen">
        <img
          src={ride}
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
      </div>
    </div>
  );
}
