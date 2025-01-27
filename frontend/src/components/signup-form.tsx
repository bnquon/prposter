import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../utils/features/auth";
import { Dumbbell } from "lucide-react";

type formValues = {
  email: string;
  password: string;
};

export const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<formValues>();

  const onSubmit = async (data: formValues) => {
    try {
      await signUp(data.email, data.password);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="w-full flex gap-2 items-center justify-center pt-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Dumbbell className="size-4" />
          </div>
          <span className="font-bold">PRPoster</span>
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Join PRPoster</CardTitle>
          <CardDescription>Sign up with an email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
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
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register("password")}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
