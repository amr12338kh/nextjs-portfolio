import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <section className="px-5 md:px-10">
      <section id="home" className="space-y-8 pt-40">
        <Hero />
      </section>

      <section id="about" className="pt-40">
        <About />
      </section>

      <section id="projects" className="pt-40">
        <Projects />
      </section>

      <section id="testimonials" className="pt-40">
        <Testimonials />
      </section>

      <section id="contact" className="pt-40">
        <Contact />
      </section>
    </section>
  );
}
