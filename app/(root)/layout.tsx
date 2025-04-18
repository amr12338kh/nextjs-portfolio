import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GradientBackground from "@/components/GradientBackground";
import { client } from "@/sanity/lib/client";
import { ALL_TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { getGitHubStats } from "@/lib/github";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [githubStats, testimonials] = await Promise.all([
    getGitHubStats(),
    client.fetch(ALL_TESTIMONIALS_QUERY),
  ]);
  const isTestimonials = testimonials.length > 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-5 xl:px-0 ">
      <Header isTestimonials={isTestimonials} />
      {children}
      <Footer
        isTestimonials={isTestimonials}
        githubStars={githubStats?.totalStars}
      />
      <GradientBackground />
    </main>
  );
}
