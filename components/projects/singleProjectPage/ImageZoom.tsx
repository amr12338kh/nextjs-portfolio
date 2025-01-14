"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectProps } from "@/types";
import Link from "next/link";

const ImageZoom = ({
  image,
  project,
  handleClose,
}: {
  image: string;
  project: ProjectProps;
  handleClose: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  return (
    <>
      <div
        className="bg-black/90 fixed top-0 left-0 w-full h-full z-40"
        onClick={handleClose}
      />
      <Button
        className="fixed rounded-full w-8 h-8 p-0 top-5 right-5 z-50 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80 bg-primary-foreground text-primary hover:bg-primary-foreground/80"
        size="sm"
        onClick={handleClose}
      >
        <X />
      </Button>
      <Link
        target="_blank"
        href={project.link}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 sm:px-5 md:px-10 max-w-7xl w-full z-40"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 },
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
          }}
        >
          <Image
            src={image}
            alt={project.title}
            width="1800"
            height="1800"
            className="rounded-lg w-full"
          />
        </motion.div>
      </Link>
    </>
  );
};

export default ImageZoom;
