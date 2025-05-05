import "./globals.css";
import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { OnboardingProvider } from "@/contexts/onboarding-context";
import { ReactQueryProvider } from "@/components/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RealtyMate - AI-Powered Real Estate Assistant",
  description:
    "Gain a competitive edge with real-time insights into property listings, competitor agent activity, and automated tools for CRM, email outreach, and pitch preparation.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <OnboardingProvider>{children}</OnboardingProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
