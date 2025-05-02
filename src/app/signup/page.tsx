"use client";

import type React from "react";

import Link from "next/link";
import { useState, useEffect } from "react";
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

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("onboardingComplete") === "true";
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsLoading(true);

      // Simulate API call with a short timeout
      setTimeout(() => {
        // Handle form submission - would connect to backend in production
        console.log("Form submitted:", formData);

        // Store partial user data but don't mark onboarding as complete yet
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            companyName: formData.companyName,
            role: formData.role,
          }),
        );

        // Redirect to onboarding
        router.push("/onboarding");
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-blue-600">
      {/* Header */}
      <header className="container py-6 mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex gap-2 items-center">
            <div className="overflow-hidden relative w-8 h-8 bg-white rounded-full">
              <div className="flex absolute inset-0 justify-center items-center font-bold text-blue-500">
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
      <main className="container flex flex-1 justify-center items-center py-12 px-4 mx-auto">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1">
              <div className="flex items-center">
                {step === 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 mr-2 w-8 h-8"
                    onClick={() => setStep(1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                )}
                <CardTitle className="text-2xl">Create your account</CardTitle>
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
                          className="absolute right-3 top-1/2 text-gray-500 -translate-y-1/2 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
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
                        I'd like to receive product updates and marketing
                        communications
                      </Label>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
                  disabled={isLoading}
                >
                  {step === 1 ? (
                    "Continue"
                  ) : isLoading ? (
                    <>
                      <svg
                        className="mr-2 w-4 h-4 animate-spin"
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
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Trial info */}
          <div className="mt-6 text-center text-white">
            <p className="text-lg font-medium">
              No credit card required. Free 14-day trial. Cancel anytime.
            </p>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="flex items-center">
                <div className="flex justify-center items-center mr-2 w-5 h-5 bg-white rounded-full">
                  <Check className="w-3 h-3 text-blue-500" />
                </div>
                <span className="text-sm">Full access</span>
              </div>
              <div className="flex items-center">
                <div className="flex justify-center items-center mr-2 w-5 h-5 bg-white rounded-full">
                  <Check className="w-3 h-3 text-blue-500" />
                </div>
                <span className="text-sm">No setup fees</span>
              </div>
              <div className="flex items-center">
                <div className="flex justify-center items-center mr-2 w-5 h-5 bg-white rounded-full">
                  <Check className="w-3 h-3 text-blue-500" />
                </div>
                <span className="text-sm">Easy setup</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
