"use client";

import GridItems from "./GridItems";
import { contactLinks, aboutWords } from "@/data";
import { CodeXml, Cpu, MapPin, MessagesSquare, User } from "lucide-react";
import { LocationGlobe } from "./LocationGlobe";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TechStack from "./TechStack";
import { Skill } from "@/sanity/types";

const About = ({ skills }: { skills: Skill[] }) => {
  return (
    <motion.div
      {...mainAnimation}
      className="grid grid-cols-1 md:grid-cols-2 md:grid-row-2 gap-2 lg:gap-3 mx-auto"
    >
      <GridItems
        icon={<User size={16} />}
        title="Who Am I?"
        des="A quick overview of me"
      >
        <div className="flex items-center h-full">
          <p className="font-medium text-center text-sm md:text-base">
            {aboutWords}
          </p>
        </div>
      </GridItems>
      <GridItems
        icon={<MapPin size={16} />}
        title="Cairo, Egypt"
        des="I'm very flexible with time zone communications"
      >
        <motion.div className="absolute left-0 flex justify-center flex-col w-full h-full">
          <LocationGlobe />
        </motion.div>
      </GridItems>
      <GridItems
        icon={<Cpu size={16} />}
        title="Tech Stack"
        des="My tech stack that I use in my work"
        className="relative"
      >
        <TechStack skills={skills} />
      </GridItems>
      <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
        <GridItems
          icon={<MessagesSquare size={16} />}
          title="Contact"
          des="Let's collaborate to turn your vision into reality!"
        >
          <ul className="flex flex-col h-full gap-2 justify-center">
            {contactLinks.map(({ id, name, link, icon }) => {
              const Icon = icon;
              return (
                <Link key={id} href={link} target="_blank">
                  <motion.li
                    {...linksAnimation}
                    className="flex items-center gap-2 text-lg text-muted-foreground hover:text-primary duration-200"
                  >
                    {Icon && <Icon size={16} />}
                    {name}
                  </motion.li>
                </Link>
              );
            })}
          </ul>
        </GridItems>
        <GridItems
          icon={<CodeXml size={16} />}
          title="Framework"
          des="The best framework in the field right now"
        >
          <div className="flex justify-center items-center relative h-full">
            <div>
              <Image
                src="/svg/next.svg"
                alt="next.js"
                width={150}
                height={150}
                className="dark:invert"
              />
            </div>
          </div>
        </GridItems>
      </div>
    </motion.div>
  );
};

export default About;

const mainAnimation = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.3 },
};

const linksAnimation = {
  initial: { x: -50, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  transition: { duration: 0.3 },
  viewport: { once: true },
};
