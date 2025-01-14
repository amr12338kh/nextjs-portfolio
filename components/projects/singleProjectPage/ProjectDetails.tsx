"use client";

import Hover from "@/components/ui/Hover";
import { ProjectProps } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

const ProjectDetails = ({ project }: { project: ProjectProps }) => {
  return (
    <>
      <div className=" flex items-center justify-between w-full">
        <SectionTitle
          title={project?.title || "Project Title"}
          subtitle={project?.tagline}
          variant="third"
          animate
        />
        <div className="flex gap-x-3 sm:gap-x-5 items-center mt-6">
          <div className="flex sm:gap-x-1">
            {project?.skills?.map(({ title, image, isDark }, index) => {
              index++; // to avoid 0 index for the animation, { start from 1 }
              return (
                <Hover key={index} id={index} title={title || ""}>
                  <motion.div
                    initial={{ marginLeft: 0 }}
                    animate={index > 1 && { marginLeft: -10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className={`z-10 bg-muted p-[6px] border border-muted-foreground/50 rounded-lg flex items-center`}
                  >
                    <Image
                      src={image || ""}
                      alt={title || `Project Skill ${index}`}
                      width={18}
                      height={18}
                      className={`${isDark && "dark:invert z-0"}`}
                      priority={false}
                    />
                  </motion.div>
                </Hover>
              );
            })}
          </div>
        </div>
      </div>
      <p className=" text-sm sm:text-base my-8">{project.description}</p>
    </>
  );
};

export default ProjectDetails;
