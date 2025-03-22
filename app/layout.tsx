import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/Themes/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Manrope } from "next/font/google";

export const metadata: Metadata = {
  title: "Amr's Portfolio",
  description: "Amr - Passionate Front-End Developer specializing in Next.js",
};

const getManrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={getManrope.className}>
        <link rel="icon" href="/svg/main-logo-black.svg" />
        <head />
        <body className=" relative">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster />
            <SpeedInsights />
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
