"use client";

import React from "react";
import Section from "../Section";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import { BiCodeAlt } from "react-icons/bi";
import { ProjectProps } from "@/types";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { motion } from "framer-motion";
import AnimatedTitle from "../AnimatedTitle";
import { getCurrentYear } from "@/lib/utils";

const ProjectsHero = ({ projects }: { projects: ProjectProps[] }) => {
  const yearsOfExperience = getCurrentYear() - 2024;
  const projectsCount = projects.length;

  return (
    <Section>
      <div className="text-center p-4 sm:p-6 md:p-10 lg:p-20 rounded-lg bg-muted/40">
        <AnimatedTitle
          title="My Creative Projects"
          subtitle="Here's what some of my satisfied clients have to say about my work"
          containerClassName="mb-5"
          variant="third"
        />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3 lg:gap-5 justify-center mt-6 md:mt-10 max-w-4xl mx-auto">
          <Box
            title={`${projectsCount}+ Completed Projects`}
            icon={RiVerifiedBadgeFill}
            delay={0.1}
          />
          <Box
            title={`${yearsOfExperience}+ Year${yearsOfExperience !== 1 ? "s" : ""} of Experience`}
            icon={GiProgression}
            delay={0.3}
          />
          <Box title={`10+ Technologies Used`} icon={BiCodeAlt} delay={0.5} />
        </div>
      </div>
    </Section>
  );
};

const Box = ({
  icon: Icon,
  title,
  delay = 0,
}: {
  icon: LucideIcon | IconType;
  title: string;
  delay?: number;
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: 50,
      scale: 0.9,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: delay,
    }}
    whileHover={{
      scale: 1.05,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 0.95 }}
    className="py-3 px-4 border rounded-md transition-all duration-300 hover:border-primary/50 hover:shadow-md flex items-center justify-center h-full"
  >
    <span className="flex items-center gap-2">
      <motion.span
        initial={{ rotate: -20 }}
        animate={{ rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, delay: delay }}
      >
        <Icon className="size-4 lg:size-5 text-primary flex-shrink-0" />
      </motion.span>
      <span className="font-medium text-[13px] lg:text-base">{title}</span>
    </span>
  </motion.div>
);

export default ProjectsHero;
