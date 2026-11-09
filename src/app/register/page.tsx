
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

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
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email Registration
  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading || googleLoading) return;

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const image = String(formData.get("image") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    if (!name) {
      toast.error("Please enter your full name!");
      return;
    }

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    if (!image) {
      toast.error("Please enter your profile photo URL!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain an uppercase letter!");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain a lowercase letter!");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        image,
        password,
      });

      if (error) {
        console.error("Registration Error:", error);
        toast.error(error.message || "Registration failed!");
        return;
      }

      if (data) {
        toast.success("Registration successful!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Google Registration
  const handleGoogleSignUp = async () => {
    if (loading || googleLoading) return;

    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google Sign Up Error:", error);
      toast.error("Google sign up failed!");
      setGoogleLoading(false);
    }
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
                  autoComplete="name"
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

              {/* Profile Photo */}
              <Field>
                <FieldLabel htmlFor="image">
                  Profile Photo URL
                </FieldLabel>

                <Input
                  id="image"
                  name="image"
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
                  Password must contain uppercase and lowercase
                  letters and at least 6 characters.
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
                  disabled={loading || googleLoading}
                  className="h-12 w-full rounded-xl bg-[#237A61] text-base font-semibold text-white hover:bg-[#195E49]"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </Field>

            </FieldGroup>
          </form>

          {/* OR Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm text-gray-500">
                OR
              </span>
            </div>
          </div>

          {/* Google Sign Up */}
          <Button
            type="button"
            variant="outline"
            disabled={loading || googleLoading}
            onClick={handleGoogleSignUp}
            className="h-12 w-full rounded-xl border-[#DCE7DF] bg-white text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            <span className="mr-2 text-lg font-bold text-[#4285F4]">
              G
            </span>

            {googleLoading
              ? "Connecting to Google..."
              : "Continue with Google"}
          </Button>

          {/* Login Link */}
          <FieldDescription className="mt-5 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#237A61] underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </FieldDescription>

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
