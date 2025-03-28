"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedTitleProps } from "@/types";

const titleAnimation = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

const AnimatedTitle = ({
  title,
  subtitle,
  variant = "primary",
  titleClassName,
  subtitleClassName,
  containerClassName,
}: AnimatedTitleProps) => {
  if (variant === "primary") {
    return (
      <div className={cn("space-y-4", containerClassName)}>
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100 }}
          className={cn(
            "text-4xl font-bold text-foreground tracking-tight",
            titleClassName
          )}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className={cn(
            "text-base sm:text-xl text-muted-foreground",
            subtitleClassName
          )}
        >
          {subtitle}
        </motion.p>
      </div>
    );
  }

  if (variant === "secondary") {
    return (
      <motion.div
        className={cn("space-y-1", containerClassName)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={titleAnimation}
      >
        {subtitle && (
          <motion.p
            className={cn(
              "text-xs sm:text-base font-medium line-clamp-2 max-w-[230px] sm:max-w-full",
              subtitleClassName
            )}
          >
            {subtitle.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={wordAnimation}
                custom={i}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        )}
        <h1
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-bold text-primary",
            titleClassName
          )}
        >
          {title}
        </h1>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("space-y-4", containerClassName)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={titleAnimation}
    >
      <h1
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold text-primary",
          titleClassName
        )}
      >
        {title}
      </h1>

      {subtitle && (
        <motion.p
          className={cn(
            "text-base sm:text-xl text-muted-foreground",
            subtitleClassName
          )}
        >
          {subtitle.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={wordAnimation}
              custom={i}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </motion.p>
      )}
    </motion.div>
  );
};

export default AnimatedTitle;
