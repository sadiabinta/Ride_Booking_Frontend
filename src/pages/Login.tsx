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
      {/* <div className="absolute inset-0 bg-black/40" dir="rtl">
        <Card className="relative z-10 w-[350px] bg-white/10 shadow-xl mt-16 mx-16"> */}
      <div className="absolute top-0 right-0">
        <LoginForm />
      </div>
      {/* <Form {...form}>
              <form>
                <div className="flex flex-col gap-2">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center"></div>
                    <Label htmlFor="email">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                </div>
              </form>
            </Form> */}
    </div>
  );
}
