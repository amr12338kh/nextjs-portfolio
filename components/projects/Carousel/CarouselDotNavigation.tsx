"use client";

import React from "react";
import { motion } from "framer-motion";
import { CarouselDotNavigationProps } from "@/types";

const dotVariants = {
  inactive: {
    width: 8,
    opacity: 0.5,
    transition: { duration: 0.3 },
  },
  active: {
    width: 16,
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 200,
    },
  },
  hover: {
    scale: 1.2,
    opacity: 0.8,
  },
  tap: {
    scale: 0.9,
  },
};

export const CarouselDotNavigation = ({
  projectsToRender,
  currentSlide,
  api,
}: CarouselDotNavigationProps) => (
  <div className="flex justify-center items-center gap-2">
    {projectsToRender.map((_, index) => (
      <motion.button
        key={index}
        initial="inactive"
        animate={currentSlide === index ? "active" : "inactive"}
        variants={dotVariants}
        whileHover="hover"
        whileTap="tap"
        className={`h-2 rounded-full cursor-pointer ${
          currentSlide === index ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
        }`}
        onClick={() => {
          if (api) {
            api.scrollTo(index);
          }
        }}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);
