"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

type TextItem = {
  text: string;
  gradient: string;
};

const TEXTS: TextItem[] = [
  { text: "passionate", gradient: "from-[#ff1835] to-[#ffc900]" },
  { text: "creative", gradient: "from-[#00ff87] to-[#60efff]" },
  { text: "innovative", gradient: "from-[#4158D0] to-[#C850C0]" },
  { text: "dedicated", gradient: "from-[#2ecc70] to-[#1ca085]" },
];

const ANIMATION_DURATION = 2000; // 2 seconds

const variants = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export const TypewriterText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TEXTS.length);
    }, ANIMATION_DURATION);

    return () => clearInterval(timer);
  }, []);

  const currentText = TEXTS[currentIndex];

  return (
    <span className=" relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText.text}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="inline-flex items-center justify-center"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <span
            className={`bg-gradient-to-r ${currentText.gradient} bg-clip-text text-transparent`}
          >
            {currentText.text}
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
