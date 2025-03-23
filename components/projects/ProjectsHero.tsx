import React from "react";
import Section from "../Section";
import SectionTitle from "../SectionTitle";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import { BiCodeAlt } from "react-icons/bi";
import { ProjectProps } from "@/types";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

const ProjectsHero = ({ projects }: { projects: ProjectProps[] }) => {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;
  const projectsCount = projects.length;

  return (
    <Section>
      <div className="text-center p-4 sm:p-6 md:p-10 lg:p-20 rounded-lg bg-muted/40">
        <SectionTitle
          title="My Creative Projects"
          subtitle="Here's what some of my satisfied clients have to say about my work"
          variant="secondary"
          className="mb-5"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 justify-center mt-6 md:mt-10 max-w-4xl mx-auto">
          <Box
            title={`${projectsCount}+ Completed Projects`}
            icon={RiVerifiedBadgeFill}
          />
          <Box
            title={`${yearsOfExperience}+ Year${yearsOfExperience !== 1 && "s"} of Experience`}
            icon={GiProgression}
          />
          <Box title={`10+ Technologies Used`} icon={BiCodeAlt} />
        </div>
      </div>
    </Section>
  );
};

const Box = ({
  icon: Icon,
  title,
}: {
  icon: LucideIcon | IconType;
  title: string;
}) => (
  <div className="py-3 px-4 border rounded-md transition-all duration-300 hover:border-primary/50 hover:shadow-md flex items-center justify-center h-full">
    <span className="flex items-center gap-2">
      <Icon className="size-4 md:size-5 text-primary flex-shrink-0" />
      <span className="font-medium text-sm md:text-base">{title}</span>
    </span>
  </div>
);

export default ProjectsHero;
