import {
  FooterProps,
  LinksProps,
  ProjectsProps,
  SkillsItemsProps,
  TestimonialsProps,
} from "@/types";
import { Facebook, Github, Instagram, Mail, X } from "lucide-react";

export const lobbylLinks: LinksProps[] = [
  {
    id: 1,
    name: "Home",
    link: "#home",
  },
  {
    id: 2,
    name: "About",
    link: "#about",
  },
  {
    id: 3,
    name: "Projects",
    link: "#projects",
  },
  {
    id: 4,
    name: "Testimonials",
    link: "#testimonials",
  },
  {
    id: 5,
    name: "Contact",
    link: "#contact",
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
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=100022542018631",
    icon: Facebook,
  },
  {
    id: 3,
    name: "Github",
    link: "https://github.com/amr12338kh",
    icon: Github,
  },
  {
    id: 4,
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
    name: "Aceternity ui",
    link: "https://ui.aceternity.com/",
  },
  {
    id: 5,
    name: "Email js",
    link: "https://www.emailjs.com/",
  },
];

export const footerLinks: FooterProps[] = [
  {
    title: "Lobby",
    links: lobbylLinks,
  },
  {
    title: "Credits",
    links: creditsLinks,
  },
  {
    title: "Contact",
    links: contactLinks,
  },
];

export const skillsItems: SkillsItemsProps[] = [
  {
    id: 1,
    title: "HTML",
    img: "/svg/html.svg",
    isDark: false,
  },
  {
    id: 2,
    title: "CSS",
    img: "/svg/css.svg",
    isDark: false,
  },
  {
    id: 3,
    title: "JavaScript",
    img: "/svg/javascript.svg",
    isDark: false,
  },
  {
    id: 4,
    title: "TypeScript",
    img: "/svg/typescript.svg",
    isDark: false,
  },
  {
    id: 5,
    title: "React.js",
    img: "/svg/react.svg",
    isDark: false,
  },
  {
    id: 6,
    title: "Next.js",
    img: "/svg/next.svg",
    isDark: true,
  },
  {
    id: 7,
    title: "Tailwind",
    img: "/svg/tailwind.svg",
    isDark: false,
  },
  {
    id: 8,
    title: "GitHub",
    img: "/svg/github.svg",
    isDark: true,
  },
];

export const aboutWords: string = `I'm Amr, a passionate Front-End Web Developer with a
            specialization in Next.js , the cutting-edge React framework. If
            you're seeking a skilled professional to transform your web
            project into a seamless and dynamic user experience, you've
            come to the right place.`;

export const projectsCards: ProjectsProps[] = [
  {
    id: 1,
    title: "MegaMart",
    tagline: "An e-commerce website",
    image: "/p2.png",
    btnText: "See more",
    link: "https://megamart-ak.netlify.app",
    description:
      "MegaMart is a sleek e-commerce platform showcasing my expertise in web development. Built with Next.js, Tailwind CSS, and Shadcn, this project offers a seamless shopping experience across a wide range of products. With dynamic page rendering and responsive design, MegaMart represents the future of online retail, driven by innovation and excellence in web development. The platform utilizes the dummy JSON API for practice, providing a dynamic and versatile product catalog.",
    githubLink: "https://github.com/amr12338kh/MegaMart",
    tech: [
      {
        id: 1,
        title: "Next.js",
        img: "/svg/nextjs-rounded.svg",
        isDark: true,
      },
      {
        id: 2,
        title: "TypeScript",
        img: "/svg/typescript.svg",
        isDark: false,
      },
      {
        id: 3,
        title: "Tailwind",
        img: "/svg/tailwind.svg",
        isDark: false,
      },
      {
        id: 4,
        title: "Shadcn/ui",
        img: "/svg/shadcn.svg",
        isDark: true,
      },
    ],
  },

  {
    id: 2,
    title: "CarsHub",
    tagline: "Streamline your car rental experience",
    image: "/p3.png",
    btnText: "See more",
    link: "https://carshub-ak.vercel.app/",
    description:
      "Cars Hub epitomizes my expertise in modern web development, showcasing a sleek and dynamic platform for exploring the world of automobiles. Crafted with Next.js, Tailwind CSS, and Headless UI, this project embodies the synergy of cutting-edge technologies and meticulous design principles. Cars Hub redefines the online automotive experience, offering an immersive showcase of car listings, specifications, and comparison tools, all seamlessly integrated into a responsive and intuitive user interface.",
    githubLink: "https://github.com/amr12338kh/cars_hub",
    tech: [
      {
        id: 1,
        title: "Next.js",
        img: "/svg/nextjs-rounded.svg",
        isDark: true,
      },
      {
        id: 2,
        title: "TypeScript",
        img: "/svg/typescript.svg",
        isDark: false,
      },
      {
        id: 3,
        title: "Tailwind",
        img: "/svg/tailwind.svg",
        isDark: false,
      },
      {
        id: 4,
        title: "Headless ui",
        img: "/svg/headless-ui.svg",
        isDark: false,
      },
    ],
  },

  {
    id: 3,
    title: "Disney Clone",
    tagline: "Stream your favorite content",
    image: "/disney-clone-1.png",
    btnText: "See more",
    link: "https://disney-clone-ak.vercel.app",
    description:
      "The Disney Clone project is a meticulous recreation of the popular streaming platform, designed to provide an immersive experience for discovering your favorite movies and TV shows. Built with Next.js, Tailwind CSS, and Shadcn/ui, this project demonstrates the seamless integration of complex UI components and dynamic content delivery, all within a visually appealing and responsive interface.",
    githubLink: "https://github.com/amr12338kh/disney-clone",
    tech: [
      {
        id: 1,
        title: "Next.js",
        img: "/svg/nextjs-rounded.svg",
        isDark: true,
      },
      {
        id: 2,
        title: "TypeScript",
        img: "/svg/typescript.svg",
        isDark: false,
      },
      {
        id: 3,
        title: "Tailwind",
        img: "/svg/tailwind.svg",
        isDark: false,
      },
      {
        id: 4,
        title: "Shadcn/ui",
        img: "/svg/shadcn.svg",
        isDark: true,
      },
    ],
  },
];

export const testimonials: TestimonialsProps[] = [
  {
    id: 1,
    img: "",
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    id: 2,
    img: "",
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    id: 3,
    img: "",
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    id: 4,
    img: "",
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    id: 5,
    img: "",
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
