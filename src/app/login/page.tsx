"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignIn, useUser } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { isLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    if (user) {
      const isOnBoarded = user.publicMetadata?.isOnBoarded;
      if (!isOnBoarded) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      setIsLoading(true);
      const signInAttempt = await signIn?.create({
        identifier: email,
        password,
      });
      if (signInAttempt?.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        toast.success("Login successful. Welcome back to RealtyMate!");
        console.log(signInAttempt);
        router.push("/onboarding");
      }
    } catch (err) {
      console.log("SignIn Failed:", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        toast.error(err.errors[0]?.longMessage ?? DEFAULT_ERROR_MESSAGE);
      } else {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account to continue your real estate journey
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remember-me"
                    className="text-sm text-gray-600"
                  >
                    Remember me
                  </Label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don&apos;t have an account?</span>{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden bg-blue-600 md:flex md:flex-1">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-700 opacity-90"></div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-12 text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Gain a competitive edge with RealtyMate
          </h2>
          <p className="mb-8 max-w-md text-center text-lg">
            Access real-time insights, track competitor activity, and leverage
            AI tools designed specifically for Australian real estate agents.
          </p>
          <div className="grid w-full max-w-md grid-cols-2 gap-4">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <h3 className="mb-1 font-semibold">AI-Powered Insights</h3>
              <p className="text-sm text-blue-100">
                Get smart recommendations based on market data
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <h3 className="mb-1 font-semibold">Competitor Tracking</h3>
              <p className="text-sm text-blue-100">
                Monitor other agents in your target suburbs
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <h3 className="mb-1 font-semibold">Smart CRM</h3>
              <p className="text-sm text-blue-100">
                Manage leads and clients with AI assistance
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <h3 className="mb-1 font-semibold">Pitch Generator</h3>
              <p className="text-sm text-blue-100">
                Create compelling pitches in seconds
              </p>
            </div>
          </div>
        </div>
        <Image
          src="/real-estate-analytics-dashboard.png"
          alt="RealtyMate Dashboard"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
        />
      </div>
    </div>
  );
}
