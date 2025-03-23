import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GradientBackground from "@/components/GradientBackground";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { ALL_TESTIMONIALS_QUERY } from "@/sanity/lib/queries";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const testimonials = await client.fetch(ALL_TESTIMONIALS_QUERY);
  const isTestimonials = testimonials.length > 0;

  return (
    <main className=" container mx-auto px-0 sm:px-5">
      <Header
        session={session ? session : undefined}
        isTestimonials={isTestimonials}
      />
      {children}
      <Footer isTestimonials={isTestimonials} />
      <GradientBackground />
    </main>
  );
}
