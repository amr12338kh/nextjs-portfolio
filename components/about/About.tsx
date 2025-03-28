"use client";

import GridItems from "./GridItems";
import { contactLinks, aboutWords } from "@/data";
import { CodeXml, Cpu, MapPin, MessagesSquare, User } from "lucide-react";
import { LocationGlobe } from "./LocationGlobe";
import Image from "next/image";
import { motion } from "framer-motion";
import TechStack from "./TechStack";
import { Skill } from "@/sanity/types";
import ContactLinks from "./ContactLinks";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1,
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

const About = ({ skills }: { skills: Skill[] }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-5 gap-2 lg:gap-3 mx-auto"
    >
      <motion.div variants={itemVariants} className="md:col-span-2">
        <GridItems
          icon={<User size={16} />}
          title="Who Am I?"
          des="A quick overview of me"
        >
          <motion.div
            className="flex items-center h-full"
            variants={fadeInVariants}
          >
            <motion.div className="font-medium text-center text-sm md:text-base">
              {aboutWords.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={wordAnimation}
                  custom={i}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </GridItems>
      </motion.div>

      <motion.div variants={itemVariants} className="md:col-span-3">
        <GridItems
          icon={<MapPin size={16} />}
          title="Cairo, Egypt"
          des="I'm very flexible with time zone communications"
        >
          <motion.div
            className="absolute left-0 flex justify-center flex-col w-full h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 50,
            }}
          >
            <LocationGlobe />
          </motion.div>
        </GridItems>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-3"
      >
        <GridItems
          icon={<Cpu size={16} />}
          title="Tech Stack"
          des="My tech stack that I use in my work"
          className="relative"
        >
          <TechStack skills={skills} />
        </GridItems>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="md:col-span-2 lg:col-span-1"
      >
        <GridItems
          icon={<MessagesSquare size={16} />}
          title="Contact"
          des="Let's collaborate to turn your vision into reality"
        >
          <ContactLinks />
        </GridItems>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GridItems
          icon={<CodeXml size={16} />}
          title="Framework"
          des="The best framework in the field right now"
        >
          <div className="flex justify-center items-center relative h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 },
              }}
            >
              <Image
                src="/svg/next.svg"
                alt="next.js"
                width={150}
                height={150}
                className="dark:invert"
              />
            </motion.div>
          </div>
        </GridItems>
      </motion.div>
    </motion.div>
  );
};

export default About;
