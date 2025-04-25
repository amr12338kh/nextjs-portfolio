"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectProps } from "@/types";
import ProjectSkills from "./ProjectSkills";
import { urlFor } from "@/sanity/lib/image";

const imageAnimationVariants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
  },
};

const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectProps;
  index: number;
}) => {
  const imageUrl = project.image
    ? urlFor(project.image).url()
    : "/image-placeholder.png";

  return (
    <motion.div
      className="px-8 py-12 bg-muted/80 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <ProjectSkills project={project} />
        </div>

        <div className="w-full h-full aspect-video rounded-lg relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={project._id}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              variants={imageAnimationVariants}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-full h-full"
            >
              <Link
                href={`/projects/${project._id}`}
                className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`View details for ${project.title || "project"}`}
              >
                <Image
                  src={imageUrl}
                  alt={project.title || "Project Image"}
                  width={500}
                  height={500}
                  className="object-cover aspect-video rounded-lg w-full h-full transition-transform hover:scale-105 duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
