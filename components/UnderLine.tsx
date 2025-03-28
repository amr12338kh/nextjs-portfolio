"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const UnderLine = ({
  containerClassName,
  lineClassName,
}: {
  containerClassName?: string;
  lineClassName?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className={cn("mt-6", containerClassName)}
    >
      <motion.div
        className={cn(
          "h-1 w-16 bg-primary mx-auto sm:mx-0 rounded-full",
          lineClassName
        )}
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default UnderLine;
