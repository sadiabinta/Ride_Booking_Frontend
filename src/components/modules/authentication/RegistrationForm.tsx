/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    password: z.string(),
    confirmPassword: z.string(),
    email: z.email().min(8),
    phone: z.string(),
    address: z.string(),
    role: z.string(),
    vehicleType: z.string().optional(),
    vehicleNumber: z.string().optional(),
    licenseNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password Do not match",
    path: ["confirmPassword"],
  });

export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      phone: "",
      address: "",
      role: "",
      vehicleType: "",
      vehicleNumber: "",
      licenseNumber: "",
    },
  });
  const role = form.watch("role");
  useEffect(() => {
    if (role !== "DRIVER") {
      form.unregister(["licenseNumber", "vehicleNumber", "vehicleType"]);
    }
  }, [role, form]);

  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: data.role,
      vehicleType: data.vehicleType,
      vehicleNumber: data.vehicleNumber,
      licenseNumber: data.licenseNumber,
    };
    try {
      await register(userInfo).unwrap();
      toast.success("Registration done successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="relative overflow-hidden bg-sky-700 opacity-70 mt-8 mx-8 text-orange-200 border-l-8 border-orange-400">
        <CardContent className="my-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="registration-form">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-2">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mt-2">Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mt-2">Confirm Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-2">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-2">Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-2">Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mt-2">Role</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="Role" {...field} /> */}
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RIDER">Rider</SelectItem>
                          <SelectItem value="DRIVER">Driver</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {role === "DRIVER" && (
                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="vehicleNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="mt-2">Vehicle Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Vehicle Number"
                            {...field}
                            value={field.value as string}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="mt-2">License Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="License Number"
                            {...field}
                            value={field.value as string}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="mt-2">Vehicle Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value as any}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CAR">Car</SelectItem>
                              <SelectItem value="CNG">CNG</SelectItem>
                              <SelectItem value="BIKE">Bike</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <Button
                className="w-full mt-4"
                type="submit"
                id="registration-form"
              >
                submit
              </Button>
              <FieldDescription className="text-center pt-2">
                Already have an account? <Link to="/login">Login</Link>
              </FieldDescription>
            </form>
          </Form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
