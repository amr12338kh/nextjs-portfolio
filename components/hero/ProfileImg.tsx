"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

interface ProfileImgProps {
  isSmall?: boolean;
}

const ProfileImg = memo(({ isSmall = false }: ProfileImgProps) => {
  const sizeClasses = isSmall ? "mb-10 md:hidden" : "hidden md:block";
  const [loaded, setLoaded] = useState(false);

  // Detect when image is loaded to trigger animations
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Main container animations
  const containerVariants = {
    initial: {
      scale: 0.8,
      rotate: isSmall ? "45deg" : "-45deg",
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
        delay: isSmall ? 0 : 0.2,
      },
    },
  };

  // Border animation
  const borderVariants = {
    initial: {
      scale: 1.2,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Decorative elements animations
  const decorVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.8,
        type: "spring",
        stiffness: 200,
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
      scale: [0.5, 1.1, 1],
      transition: {
        duration: 1.5,
        times: [0, 0.7, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className={`relative ${sizeClasses}`}
      variants={containerVariants}
      initial="initial"
      animate={loaded ? "animate" : "initial"}
    >
      <motion.div
        className="profile_pic rounded-full relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 overflow-hidden"
        role="img"
        aria-label="Amr's Profile Picture"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Image
          src="/Amr3.jpg"
          alt="Amr's Profile Picture"
          fill
          priority={isSmall}
          quality={80}
          style={{ objectFit: "cover" }}
          sizes="(min-width: 1024px) 288px, (min-width: 768px) 224px, 192px"
          onLoad={() => setLoaded(true)}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 blur-2xl"
        variants={glowVariants}
        initial="initial"
        animate={loaded ? "animate" : "initial"}
      />

      <motion.div
        className="hidden lg:block dark:bg-dashes bg-dashes_light absolute z-20 top-60 right-58 w-[104px] h-[30px] bg-no-repeat"
        aria-hidden="true"
        variants={decorVariants}
        initial="initial"
        animate={loaded ? "animate" : "initial"}
      />

      <motion.div
        className="hidden lg:block dark:bg-pluses bg-pluses_light absolute z-20 top-2 left-60 w-[50px] h-[56px] bg-no-repeat"
        aria-hidden="true"
        variants={decorVariants}
        initial="initial"
        animate={loaded ? "animate" : "initial"}
      />

      <motion.div
        className="profile_border border-[2px] border-primary absolute z-10 inset-0 rounded-full"
        aria-hidden="true"
        variants={borderVariants}
        initial="initial"
        animate={loaded ? "animate" : "initial"}
      />
    </motion.div>
  );
});

ProfileImg.displayName = "ProfileImg";

export default ProfileImg;
