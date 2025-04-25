"use client";

import React from "react";
import { HeaderTitle } from "./ProjectDetails";
import { Eye } from "lucide-react";
import Image from "next/image";
import { ProjectProps } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import ProjectLinks from "./ProjectLinks";
import { motion } from "framer-motion";

const ImagePreview = ({ project }: { project: ProjectProps }) => {
  return (
    <section className="rounded-xl bg-card p-6 border border-border/80 shadow-sm">
      <HeaderTitle
        title="Project Preview"
        icon={Eye}
        className="!border-none !pb-0 !mb-0"
      />

      <motion.div
        initial={{
          filter: "blur(12px)",
          transform: "scale(1.02)",
        }}
        whileInView={{
          filter: "blur(0px)",
          transform: "scale(1)",
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        viewport={{ once: true, amount: 0.2 }}
        className="aspect-video w-full bg-accent/20 rounded-lg flex items-center justify-center border border-border my-6 overflow-hidden"
      >
        <Image
          src={
            project.image
              ? urlFor(project.image).url()
              : "/image-placeholder.png"
          }
          alt={project.title}
          width={1300}
          height={1300}
          className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-200 ease-in-out"
          property="false"
        />
      </motion.div>

      <div className="flex justify-end">
        <ProjectLinks project={project} />
      </div>
    </section>
  );
};

export default ImagePreview;
