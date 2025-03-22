"use client";

import { motion } from "framer-motion";
import TextAmbient from "./TextAmbient";
import { cn } from "@/lib/utils";

const animation = {
  hide: {
    x: -30,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
};

const SectionTitle = ({
  title,
  subtitle,
  textAmbient = true,
  variant = "primary",
  animate,
  className,
}: {
  title: string;
  subtitle?: string;
  textAmbient?: boolean;
  variant?: "primary" | "secondary" | "third";
  animate?: boolean;
  className?: string;
}) => {
  const Subtitle = (
    <motion.p
      {...(animate && {
        initial: animation.hide,
        animate: animation.show,
        transition: {
          delay: 0.2,
        },
      })}
      className="text-xs sm:text-base font-medium line-clamp-1"
    >
      {subtitle}
    </motion.p>
  );

  return variant === "primary" ? (
    <div className={cn("relative text-center mb-20", className)}>
      <h1 className={cn("text-4xl sm:text-5xl font-bold", className)}>
        {title}
      </h1>
      {textAmbient && <TextAmbient />}
    </div>
  ) : (
    <div className={cn("space-y-1")}>
      {variant === "third" && Subtitle}
      <motion.h1
        {...(animate && {
          initial: animation.hide,
          animate: animation.show,
          transition: {
            delay: 0.1,
          },
        })}
        className={cn(
          "text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-primary",
          className
        )}
      >
        {title}
      </motion.h1>
      {variant === "secondary" && Subtitle}
    </div>
  );
};

export default SectionTitle;
