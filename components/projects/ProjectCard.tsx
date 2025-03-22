"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, SetStateAction } from "react";
import { Button } from "../ui/button";
import { ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { ProjectProps } from "@/types";
import ProjectSkills from "./ProjectSkills";
import LightboxContent from "./LightboxContent";

const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectProps;
  index: number;
}) => {
  const [previewImage, setPreviewImage] = useState(project.image);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const toggleLightbox = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxOpen(!lightboxOpen);
  };

  return (
    <>
      <div className="px-8 py-12 bg-muted/80 rounded-xl">
        <div className="space-y-10">
          <div className="flex justify-between items-center">
            <h3 className=" text-lg font-semibold">{project.title}</h3>
            <ProjectSkills project={project} />
          </div>

          <div className="w-full h-full aspect-video rounded-lg relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={previewImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <Link
                  href={`/project/${project._id}`}
                  className="block w-full h-full"
                >
                  <Image
                    src={previewImage || "/images/placeholder.jpg"}
                    alt={project.title || "Project Image"}
                    width={500}
                    height={500}
                    className="object-cover aspect-video rounded-lg w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                </Link>
              </motion.div>
            </AnimatePresence>

            <Button
              size="sm"
              variant="secondary"
              className="absolute bottom-2 right-2 z-10 border border-muted-foreground/80 p-2 shadow-lg"
              onClick={toggleLightbox}
            >
              <ZoomIn size={18} />
            </Button>
          </div>

          {(project.sections?.length ?? 0) > 0 && (
            <div className="flex gap-2 relative">
              <div
                className="w-full h-full cursor-pointer relative group overflow-hidden"
                onClick={() => setPreviewImage(project.image)}
              >
                <div className="rounded-md border border-muted-foreground/60 overflow-hidden">
                  <Image
                    src={project.image || "/images/placeholder.jpg"}
                    alt={project.title || "Project Image"}
                    width={200}
                    height={200}
                    className="object-cover transition-transform duration-300 aspect-video group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                {previewImage !== project.image && (
                  <div className="absolute inset-0 bg-black/50 rounded-md transition-all duration-300 group-hover:bg-black/30" />
                )}
                {previewImage === project.image && (
                  <motion.div
                    layoutId="selectedIndicator"
                    className="absolute -bottom-1 inset-x-0 h-1.5 bg-primary rounded-full mx-1"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>

              {project?.sections?.map(
                (section, i) =>
                  i < 3 && (
                    <div
                      key={i}
                      className="w-full h-full cursor-pointer relative group overflow-hidden"
                      onClick={() => setPreviewImage(section.image)}
                    >
                      <div className="rounded-md border border-muted-foreground/60 overflow-hidden">
                        <Image
                          src={section.image || "/images/placeholder.jpg"}
                          alt={project.title || "Project Image"}
                          width={500}
                          height={500}
                          className="object-cover transition-transform duration-300 aspect-video group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      {previewImage !== section.image && (
                        <div className="absolute inset-0 bg-black/50 rounded-md transition-all duration-300 group-hover:bg-black/30" />
                      )}
                      {previewImage === section.image && (
                        <motion.div
                          layoutId="selectedIndicator"
                          className="absolute -bottom-1 inset-x-0 h-1.5 bg-primary rounded-full mx-1"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>

      {mounted &&
        createPortal(
          <LightboxContent
            project={project}
            previewImage={previewImage || "/images/placeholder.jpg"}
            lightboxOpen={lightboxOpen}
            setLightboxOpen={setLightboxOpen}
          />,
          document.body
        )}
    </>
  );
};

export default ProjectCard;
