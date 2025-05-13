"use client";

import type React from "react";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignedOut, useSignUp, useUser } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import Otp from "@/components/auth/otp";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    role: "",
    agreeToTerms: false,
    marketingConsent: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isPendingVerification, setIsPendingVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const isOnBoarded = user.publicMetadata?.isOnBoarded;

    if (!isOnBoarded) {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }
  }, [user, isLoaded, router]);

  /***handleChange***/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /***handleSubmit***/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      return setStep(2);
    }
    if (!isLoaded) return;
    try {
      setIsLoading(true);
      await signUp.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.email,
        password: formData.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsPendingVerification(true);
    } catch (err) {
      console.log("SignUp Failed:", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        toast.error(err.errors[0]?.longMessage ?? DEFAULT_ERROR_MESSAGE);
      } else {
        toast.error("An error occurred during signup. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /***handleVerifyOtp***/
  const handleVerifyOtp = async () => {
    if (!isLoaded) return console.log("Clerk is not loaded at handleVerifyOtp");
    console.log("otp", otp);
    if (otp.length !== 6) {
      return toast.error("Please enter a valid code.");
    }
    setIsLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otp,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        await fetch("/api/update-user-metadata", {
          method: "POST",
          body: JSON.stringify({
            role: formData.role,
            company_name: formData.companyName,
            userId: signUpAttempt.createdUserId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        router.push("/onboarding");
      }
    } catch (err) {
      console.log(
        "SignUp Failed At OTP verification:",
        JSON.stringify(err, null, 2),
      );
      if (isClerkAPIResponseError(err)) {
        toast.error(err.errors[0]?.longMessage ?? DEFAULT_ERROR_MESSAGE);
      } else {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    } finally {
      setIsLoading(false);
      setIsPendingVerification(false);
    }
  };

  /***JSX***/
  return (
    <>
      <SignedOut>
        <div className="flex min-h-screen flex-col bg-linear-to-b from-blue-500 to-blue-600">
          {/* Header */}
          <header className="container mx-auto py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white">
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-blue-500">
                    RM
                  </div>
                </div>
                <span className="text-xl font-bold text-white">RealtyMate</span>
              </Link>
              <div className="text-sm text-white">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium underline underline-offset-4"
                >
                  Log in
                </Link>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
              <Card className="border-0 shadow-xl">
                <CardHeader className="space-y-1">
                  <div className="flex items-center">
                    {step === 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2 h-8 w-8 p-0"
                        onClick={() => setStep(1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                      </Button>
                    )}
                    <CardTitle className="text-2xl">
                      Create your account
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {step === 1
                      ? "Enter your information to get started"
                      : "Tell us about your business"}
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    {step === 1 ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              placeholder="John"
                              required
                              value={formData.firstName}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              placeholder="Smith"
                              required
                              value={formData.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john.smith@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              required
                              className="pr-10"
                              value={formData.password}
                              onChange={handleChange}
                            />
                            <button
                              type="button"
                              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {showPassword
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </button>
                          </div>
                          <p className="text-xs text-gray-500">
                            Must be at least 8 characters with 1 uppercase, 1
                            number, and 1 special character
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                agreeToTerms: checked as boolean,
                              })
                            }
                            required
                          />
                          <Label htmlFor="terms" className="text-sm">
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-blue-500 hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-blue-500 hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company name</Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            placeholder="Your real estate company"
                            value={formData.companyName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Your role</Label>
                          <Input
                            id="role"
                            name="role"
                            placeholder="e.g. Agent, Team Leader, Broker"
                            value={formData.role}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="marketing"
                            name="marketingConsent"
                            checked={formData.marketingConsent}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                marketingConsent: checked as boolean,
                              })
                            }
                          />
                          <Label htmlFor="marketing" className="text-sm">
                            I&apos;d like to receive product updates and
                            marketing communications
                          </Label>
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-linear-to-r from-blue-500 to-blue-600"
                      disabled={isLoading}
                    >
                      {step === 1 ? (
                        "Continue"
                      ) : isLoading && !isPendingVerification ? (
                        <>
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                  {/* CAPTCHA Widget */}
                  <div id="clerk-captcha" className="flex justify-center" />
                </form>
              </Card>
              {isPendingVerification && (
                <Otp
                  otp={otp}
                  loading={isLoading}
                  setOtp={(val) => setOtp(val)}
                  email={formData.email}
                  handleVerify={handleVerifyOtp}
                  onClose={() => setIsPendingVerification(false)}
                />
              )}
              {/* Trial info */}
              <div className="mt-6 text-center text-white">
                <p className="text-lg font-medium">
                  No credit card required. Free 14-day trial. Cancel anytime.
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                  <div className="flex items-center">
                    <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                      <Check className="h-3 w-3 text-blue-500" />
                    </div>
                    <span className="text-sm">Full access</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                      <Check className="h-3 w-3 text-blue-500" />
                    </div>
                    <span className="text-sm">No setup fees</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                      <Check className="h-3 w-3 text-blue-500" />
                    </div>
                    <span className="text-sm">Easy setup</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SignedOut>
    </>
  );
}
