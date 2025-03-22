import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ProjectProps } from "@/types";
import { X } from "lucide-react";

const LightboxContent = ({
  project,
  previewImage,
  lightboxOpen,
  setLightboxOpen,
}: {
  project: ProjectProps;
  previewImage: string;
  lightboxOpen: boolean;
  setLightboxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toggleLightbox = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxOpen(!lightboxOpen);
  };

  return (
    <AnimatePresence>
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={toggleLightbox}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              delay: 0.1,
            }}
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 z-10 rounded-full shadow-xl border border-muted-foreground/80 h-7 w-7"
              onClick={toggleLightbox}
            >
              <X size={18} />
            </Button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full h-full"
            >
              <Image
                src={previewImage}
                alt={project.title}
                width={1920}
                height={1080}
                className="object-contain w-full h-full rounded-lg"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightboxContent;
