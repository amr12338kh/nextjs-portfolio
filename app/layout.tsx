import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/Themes/theme-provider";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Amr's Portfolio",
  description: "Amr - Passionate Front-End Developer specializing in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <link rel="icon" href="/svg/main-logo-black.svg" />
        <head />
        <body className="relative">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="max-w-7xl mx-auto">
              <Header />
              {children}
              <Footer />
            </main>
            <Toaster />
            <Image
              width={1512}
              height={550}
              className="absolute left-1/2 top-0 -z-10 -translate-x-1/2"
              src="/gradient-background-top.png"
              alt=""
              role="presentation"
              priority
            />
            <Image
              width={1512}
              height={447}
              className="absolute -bottom-6 left-1/2 -z-10 -translate-x-1/2"
              src="/gradient-background-bottom.png"
              alt=""
              role="presentation"
              priority
            />
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </>
  );
}
