import type { Metadata } from "next";
import "./styles/globals.css";
import { ThemeProvider } from "@/components/Themes/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Manrope } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://amr-portfolio-dev.vercel.app"),
  title: "Amr's Portfolio | Front-End Developer",
  description:
    "Amr - Passionate Front-End Developer specializing in Next.js, React, and modern web technologies. View my projects and expertise.",
  keywords: [
    "front-end developer",
    "Next.js developer",
    "React developer",
    "web development",
    "portfolio",
    "Amr",
  ],
  authors: [{ name: "Amr" }],
  creator: "Amr",
  publisher: "Amr",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://amr-portfolio-dev.vercel.app",
    title: "Amr's Portfolio | Front-End Developer",
    description:
      "Front-End Developer specializing in Next.js, React, and modern web technologies",
    siteName: "Amr's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amr - Front-End Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amr's Portfolio | Front-End Developer",
    description:
      "Front-End Developer specializing in Next.js, React, and modern web technologies",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/svg/main-logo-black.svg" }],
    apple: { url: "/svg/main-logo-black.svg" },
  },
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
