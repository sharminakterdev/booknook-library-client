import { cn } from "@/lib/utils";

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

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-[#F5F7F2] px-4 py-10",
        className
      )}
      {...props}
    >
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
          <form>
            <FieldGroup>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
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

                  <a
                    href="#"
                    className="text-sm font-medium text-[#237A61] hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="h-12 rounded-xl border-[#DCE7DF] bg-[#FAFCFA]"
                />
              </Field>

              {/* Login Button */}
              <Field>
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#237A61] text-base font-semibold text-white hover:bg-[#195E49]"
                >
                  Login
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a
                    href="/register"
                    className="font-semibold text-[#237A61] underline-offset-4 hover:underline"
                  >
              Register
                  </a>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
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