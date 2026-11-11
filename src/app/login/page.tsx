
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

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

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email and Password Login
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading || googleLoading) return;

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      toast.error("Please enter email and password!");
      return;
    }

    try {
      setLoading(true);

      console.log("Login Started");
      console.log("Email:", email);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      console.log("Login Response:", { data, error });

      if (error) {
        console.error("Login Error:", error);
        toast.error(error.message || "Invalid email or password!");
        return;
      }

      if (data) {
        console.log("Login Successful!");
        console.log("User Data:", data.user);

        toast.success("Login successful!");

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login Failed:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    if (loading || googleLoading) return;

    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        console.error("Google Login Error:", error);
        toast.error(error.message || "Google login failed!");
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google Login Failed:", error);
      toast.error("Something went wrong!");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-[#F5F7F2] px-4 py-10">

      {/* Login Card */}
      <Card className="w-full max-w-md rounded-2xl border border-[#E0E9E1] bg-white shadow-lg">

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#183F35]">
            Welcome back
          </CardTitle>

          <CardDescription className="text-gray-500">
            Login to your BookNook account
          </CardDescription>
        </CardHeader>

        <CardContent>

          {/* Email Login Form */}
          <form onSubmit={handleLogin}>
            <FieldGroup>

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

              {/* Password */}
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <span className="text-sm text-gray-400">
                    Forgot password?
                  </span>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA]"
                />
              </Field>

              {/* Login Button */}
              <Field>
                <Button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="h-12 w-full rounded-xl bg-[#237A61] text-base font-semibold text-white hover:bg-[#195E49]"
                >
                  {loading ? "Logging in..." : "Login"}
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

          {/* Google Login Button */}
          <Button
            type="button"
            variant="outline"
            disabled={loading || googleLoading}
            onClick={handleGoogleLogin}
            className="h-12 w-full rounded-xl border-[#DCE7DF] bg-white text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            <span className="mr-2 text-lg font-bold text-[#4285F4]">
              G
            </span>

            {googleLoading
              ? "Connecting to Google..."
              : "Continue with Google"}
          </Button>

          {/* Register Link */}
          <FieldDescription className="mt-5 text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#237A61] underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </FieldDescription>

        </CardContent>
      </Card>

      {/* Terms & Privacy */}
      <FieldDescription className="w-full max-w-md px-4 text-center leading-6">
        By clicking continue, you agree to our{" "}
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
