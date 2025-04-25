"use client";

import { ProjectProps } from "@/types";
import React from "react";
import Hover from "../ui/Hover";
import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const ProjectSkills = ({ project }: { project: ProjectProps }) => {
  return (
    <div className="flex gap-x-3 sm:gap-x-5 items-center">
      <div className="flex sm:gap-x-1">
        {project?.skills?.map(({ title, image, isDark }, index) => {
          index++; // to avoid 0 index for the animation, { start from 1 }
          return (
            <Hover key={index} id={index} title={title || ""}>
              <motion.div
                initial={{ marginLeft: 0 }}
                whileInView={index > 1 ? { marginLeft: -10 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className={`z-10 bg-muted p-[6px] border border-muted-foreground/50 rounded-lg flex items-center`}
              >
                <Image
                  src={image ? urlFor(image).url() : "/image-placeholder.png"}
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
  );
};

export default ProjectSkills;
