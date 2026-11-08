
"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Password matching validation
    if (user.password !== user.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    console.log(user);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-[#F5F7F2] px-4 py-10">

      {/* Register Card */}
      <Card className="w-full max-w-md rounded-2xl border border-[#E0E9E1] bg-white shadow-lg">

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#183F35]">
            Create an Account
          </CardTitle>

          <CardDescription className="text-gray-500">
            Join BookNook and explore your reading journey.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister}>
            <FieldGroup>

              {/* Full Name */}
              <Field>
                <FieldLabel htmlFor="name">
                  Full Name
                </FieldLabel>

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA]"
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA]"
                />
              </Field>

              {/* Photo URL */}
              <Field>
                <FieldLabel htmlFor="photo">
                  Profile Photo URL
                </FieldLabel>

                <Input
                  id="photo"
                  name="photo"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  required
                  className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA]"
                />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA]"
                />

                <FieldDescription>
                  Password must contain uppercase and lowercase letters
                  and at least 6 characters.
                </FieldDescription>
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA]"
                />
              </Field>

              {/* Register Button */}
              <Field>
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#237A61] text-base font-semibold text-white hover:bg-[#195E49]"
                >
                  Create Account
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#237A61] underline-offset-4 hover:underline"
                  >
                    Login
                  </Link>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* Terms & Privacy */}
      <FieldDescription className="w-full max-w-md px-4 text-center leading-6">
        By creating an account, you agree to our{" "}
        <a href="#" className="font-medium underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="font-medium underline">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
