"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

const ProfileImg = memo(() => {
  // Main container animations
  const containerVariants = {
    initial: {
      scale: 0.8,
      rotate: "-45deg",
      opacity: 0,
    },
    animate: {
      scale: 1,
      rotate: "0deg",
      opacity: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  // Background glow animation
  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      opacity: [0, 0.4, 0.3],
      scale: [0.5, 1.4, 1.1],
      transition: {
        duration: 1.5,
        times: [0, 0.7, 1],
        delay: 0.2,
      },
    },
  };

  // Image blur animation
  const imageVariants = {
    initial: {
      filter: "blur(20px)",
      scale: 1.1,
    },
    animate: {
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="rounded-full bg-primary dark:bg-[#000] p-6"
        role="img"
        aria-label="Amr's Profile Picture"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.div
          variants={imageVariants}
          initial="initial"
          animate={"animate"}
        >
          <Image
            src="/svg/main-logo-white.svg"
            alt="Amr's Profile Picture"
            className="max-w-20"
            width={200}
            height={200}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 blur-lg"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
    </motion.div>
  );
});

ProfileImg.displayName = "ProfileImg";

export default ProfileImg;
