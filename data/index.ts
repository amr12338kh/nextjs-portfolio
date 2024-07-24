import {
  FooterProps,
  LinksProps,
  ProjectCardsProps,
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

export const projectsCards: ProjectCardsProps[] = [
  {
    title: "Summertime Sadness",
    description: "Lana Del Rey",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "See more",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return `<p>
          Lana Del Rey, an iconic American singer-songwriter, is celebrated for
          her melancholic and cinematic music style. Born Elizabeth Woolridge
          Grant in New York City, she has captivated audiences worldwide with
          her haunting voice and introspective lyrics. <br /> <br /> Her songs
          often explore themes of tragic romance, glamour, and melancholia,
          drawing inspiration from both contemporary and vintage pop culture.
        </p>`;
    },
  },
  {
    title: "Mitran Di Chhatri",
    description: "Babbu Maan",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "See more",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return `<p>
          Babu Maan, a legendary Punjabi singer, is renowned for his soulful
          voice and profound lyrics that resonate deeply with his audience. Born
          in the village of Khant Maanpur in Punjab, India, he has become a
          cultural icon in the Punjabi music industry. <br /> <br /> His songs
          often reflect the struggles and triumphs of everyday life, capturing
          the essence of Punjabi culture and traditions. With a career spanning
          over two decades, Babu Maan has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>`;
    },
  },

  {
    description: "My old portfolio",
    title: "Amr's Portfolio",
    src: "/p1.png",
    ctaText: "See more",
    ctaLink: "https://portfolio-amrkh.vercel.app/",
    content: () => {
      return `
          Metallica, an iconic American heavy metal band, is renowned for their
          powerful sound and intense performances that resonate deeply with
          their audience. Formed in Los Angeles, California, they have become a
          cultural icon in the heavy metal music industry. <br /> <br /> Their
          songs often reflect themes of aggression, social issues, and personal
          struggles, capturing the essence of the heavy metal genre. With a
          career spanning over four decades, Metallica has released numerous hit
          albums and singles that have garnered them a massive fan following
          both in the United States and abroad.
        `;
    },
  },
  {
    title: "Tech Store",
    description: "An e-commerce website",
    src: "/p2.png",
    ctaText: "See more",
    ctaLink: "https://tech-store-ak.vercel.app/",
    content: () => {
      return `Tech Store is a sleek e-commerce platform showcasing my expertise in web development. Built with Next.js, Tailwind CSS, and Shadcn, this project offers a seamless shopping experience for tech enthusiasts. With dynamic page rendering, responsive design, and immersive visual effects, Tech Store represents the future of online retail, driven by innovation and excellence in web development`;
    },
  },
  {
    title: "CarsHub",
    description: "Streamline your car rental experience",
    src: "/p3.png",
    ctaText: "See more",
    ctaLink: "https://carshub-ak.vercel.app/",
    content: () => {
      return `Cars Hub epitomizes my expertise in modern web development, showcasing a sleek and dynamic platform for exploring the world of automobiles. Crafted with Next.js, Tailwind CSS, and Headless UI, this project embodies the synergy of cutting-edge technologies and meticulous design principles. Cars Hub redefines the online automotive experience, offering an immersive showcase of car listings, specifications, and comparison tools, all seamlessly integrated into a responsive and intuitive user interface.`;
    },
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
    img: "/amr.jfif",
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
