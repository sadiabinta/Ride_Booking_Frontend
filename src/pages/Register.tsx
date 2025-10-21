import ride from "../assets/images/booking.jpg";

import { RegistrationForm } from "@/components/modules/authentication/RegistrationForm";

export default function Register() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute z-10 top-0 left-0">
        <RegistrationForm />
      </div>
      {/* <div className="absolute inset-0 bg-black/40">
        <Card className="relative z-10 w-[350px] bg-sky-800 opacity-70 shadow-xl mt-16 mx-16">
          <CardHeader>
            <CardTitle className="text-center">
              Register to create an account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Register
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
            <p>
              Already Have an Account? Please{" "}
              <Link to="/login" className="text-green-600">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div> */}

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
