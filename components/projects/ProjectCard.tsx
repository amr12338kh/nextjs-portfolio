"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/sanity/types";
import { ArrowUpRight } from "lucide-react";

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1], // Custom easing for smoother animation
      }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      className="group relative w-full"
    >
      <Link href={`project/${project._id}`} className="block">
        <div className="relative overflow-hidden bg-background rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.image || "/images/placeholder.jpg"}
              alt={project.title || "Project Image"}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
            <motion.div
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex items-center justify-center backdrop-blur-sm transition-all duration-300"
            >
              <div className="text-white flex flex-col items-center gap-3 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium flex items-center gap-2">
                  View Project{" "}
                  <ArrowUpRight className="size-4" strokeWidth={2} />
                </p>
              </div>
            </motion.div>
          </div>

          {/* Title Container */}
          <div className="p-4 bg-background/80 backdrop-blur-sm border-t">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">
                {project.title}
              </h3>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary/60"
              >
                <ArrowUpRight className="size-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
