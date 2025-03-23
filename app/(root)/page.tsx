import Section from "@/components/Section";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Testimonials from "@/components/Testimonials";
import SocialMediaStats from "@/components/SocialMediaStats";
import { getGitHubStats } from "@/lib/github";
import { getInstagramStats } from "@/lib/instagram";
import { client } from "@/sanity/lib/client";
import { ALL_SKILLS_QUERY, ALL_TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { ContactFormContainer } from "@/components/contact/ContactFormContainer";
import { ContactForm } from "@/components/contact/ContactForm";

export default async function Home() {
  const githubStats = await getGitHubStats();
  const instagramStats = await getInstagramStats();
  const [skills, testimonials] = await Promise.all([
    client.fetch(ALL_SKILLS_QUERY),
    client.fetch(ALL_TESTIMONIALS_QUERY),
  ]);

  return (
    <main>
      <Section id="home" className="pt-40 pb-20">
        <Hero />
      </Section>

      <Section id="about">
        <About skills={skills} />
      </Section>

      <Section id="projects">
        <Projects />
      </Section>

      {testimonials.length > 0 && (
        <Section id="testimonials">
          <Testimonials testimonials={testimonials} />
        </Section>
      )}

      <Section>
        <SocialMediaStats
          githubFollowers={githubStats?.followers}
          totalStars={githubStats?.totalStars}
          instagramFollowers={instagramStats?.followers}
        />
      </Section>

      <Section id="contact">
        <ContactFormContainer>
          <ContactForm />
        </ContactFormContainer>
      </Section>
    </main>
  );
}
