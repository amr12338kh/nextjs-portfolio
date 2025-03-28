"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {
  const dots = [1, 2, 3];

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          },
        }}
        className="text-center flex flex-col items-center justify-center space-y-4"
      >
        <Loader2
          className="animate-spin text-primary"
          size={48}
          strokeWidth={2}
        />

        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Loading
          </span>
          {dots.map((dot) => (
            <motion.span
              key={dot}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  delay: (dot - 1) * 0.5,
                  ease: "easeInOut",
                },
              }}
              className="text-3xl font-bold text-gray-800 dark:text-gray-200"
            >
              .
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;
