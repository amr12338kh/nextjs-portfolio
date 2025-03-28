"use client";

import { motion } from "framer-motion";
import ProfileImg from "./ProfileImg";
import { TypewriterText } from "../TypewriterText";
import UnderLine from "../UnderLine";

const Hero = () => {
  return (
    <div className="pt-10">
      <div className="flex flex-col md:flex-row md:justify-between items-center sm:items-start md:items-center gap-8">
        <ProfileImg isSmall />

        <motion.div
          className="max-w-md sm:max-w-lg lg:max-w-2xl text-center sm:text-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.h1
            className="font-medium text-lg sm:text-xl mb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hi There! I&apos;m{" "}
            <motion.span
              className="text-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.5,
                type: "spring",
                stiffness: 200,
              }}
            >
              Amr
            </motion.span>
            .
          </motion.h1>
          <motion.div
            className="font-semibold text-2xl sm:text-3xl lg:text-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            a <TypewriterText /> Front-End Developer specializing in Next.js and
            modern web technologies.
          </motion.div>

          <UnderLine />
        </motion.div>

        <ProfileImg />
      </div>
    </div>
  );
};

export default Hero;
