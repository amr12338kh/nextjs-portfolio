"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Separator } from "../../ui/separator";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../ui/carousel";

import ProjectCard from "../ProjectCard";
import { CarouselMobileNavigation } from "./CarouselMobileNavigation";
import { ProjectCarouselViewProps } from "@/types";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 80,
    },
  },
};
export const ProjectCarouselView = ({
  projectsToRender,
  yearTitle,
  mode,
}: ProjectCarouselViewProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    setCurrentSlide(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      setApi={setApi}
      className="w-full"
    >
      {yearTitle && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Projects done in {yearTitle}</h2>
          <div className="hidden sm:flex items-center justify-end gap-2">
            <CarouselPrevious className="rounded-lg" />
            <CarouselNext className="rounded-lg" />
          </div>
        </div>
      )}

      {yearTitle && <Separator className="mb-5" />}

      <CarouselContent>
        {projectsToRender.map((project, index) => (
          <CarouselItem
            key={`project-${index}`}
            className="sm:basis-1/2 lg:basis-1/3"
          >
            <motion.div
              className="h-full"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              transition={{ delay: index * 0.2 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselMobileNavigation
        projectsToRender={projectsToRender}
        currentSlide={currentSlide}
        api={api}
        mode={mode ?? "latest"}
      />
    </Carousel>
  );
};
