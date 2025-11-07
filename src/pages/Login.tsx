import login from "../assets/images/register.jpg";
import { LoginForm } from "@/components/modules/authentication/LoginForm";

export default function Login() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="">
        <img
          src={login}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      </div>
      <div className="absolute top-0 right-0">
        <LoginForm />
      </div>
    </div>
  );
}
