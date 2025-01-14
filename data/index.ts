import { FooterProps, LinksProps } from "@/types";
import { Facebook, Github, Instagram, Mail, Linkedin } from "lucide-react";

export const headerLinks: LinksProps[] = [
  {
    id: 1,
    name: "Home",
    link: "/#home",
  },
  {
    id: 2,
    name: "About",
    link: "/#about",
  },
  {
    id: 3,
    name: "Projects",
    link: "/#projects",
  },
  {
    id: 4,
    name: "Testimonials",
    link: "/#testimonials",
  },
  {
    id: 5,
    name: "Contact",
    link: "/#contact",
  },
];

export const contactLinks: LinksProps[] = [
  {
    id: 1,
    name: "Instagram",
    link: "https://www.instagram.com/amrrkhaled_9/",
    icon: Instagram,
  },
  {
    id: 2,
    name: "Linkedin",
    link: "https://www.linkedin.com/in/amr-khaled-a411bb217/",
    icon: Linkedin,
  },
  {
    id: 3,
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=100022542018631",
    icon: Facebook,
  },
  {
    id: 4,
    name: "Github",
    link: "https://github.com/amr12338kh",
    icon: Github,
  },
  {
    id: 5,
    name: "E-Mail",
    link: "mailto:amrkhaled12338@gmail.com",
    icon: Mail,
  },
];

export const creditsLinks: LinksProps[] = [
  {
    id: 1,
    name: "Vercel",
    link: "https://vercel.com/",
  },
  {
    id: 2,
    name: "Lucide",
    link: "https://lucide.dev/",
  },
  {
    id: 3,
    name: "Shadcn/ui",
    link: "https://ui.shadcn.com/",
  },
  {
    id: 4,
    name: "Sanity",
    link: "https://www.sanity.io/",
  },
  {
    id: 5,
    name: "Sentry",
    link: "https://sentry.io/welcome/",
  },
  {
    id: 6,
    name: "Email js",
    link: "https://www.emailjs.com/",
  },
];

export const footerLinks: FooterProps[] = [
  {
    title: "Lobby",
    links: headerLinks,
  },
  {
    title: "Contact",
    links: contactLinks,
  },
  {
    title: "Credits",
    links: creditsLinks,
  },
];

export const aboutWords: string = `I'm Amr, a passionate Front-End Web Developer with a
            specialization in Next.js, the cutting-edge React framework. If
            you're seeking a skilled professional to transform your web
            project into a seamless and dynamic user experience, you've
            come to the right place.`;
