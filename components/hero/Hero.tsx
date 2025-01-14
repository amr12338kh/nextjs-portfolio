"use client";

import { motion } from "framer-motion";
import ProfileImg from "./ProfileImg";
import { Suspense, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TypeAnimation } from "react-type-animation";
import { TypewriterText } from "../TypewriterText";

const HERO_ANIMATIONS = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
} as const;

const Hero = () => {
  return (
    <section aria-label="Introduction" className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between items-center sm:items-start md:items-center gap-8">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileImg isSmall />
        </Suspense>

        <motion.div
          className="max-w-md sm:max-w-lg lg:max-w-2xl text-center sm:text-start"
          {...HERO_ANIMATIONS}
        >
          <h1 className="font-medium text-lg sm:text-xl mb-1">
            Hi There! I&apos;m <span className="text-primary">Amr</span>.
          </h1>
          <div className="font-semibold text-2xl sm:text-3xl lg:text-4xl">
            a <TypewriterText /> Front-End Developer specializing in Next.js and
            modern web technologies.
          </div>
        </motion.div>

        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileImg />
        </Suspense>
      </div>
    </section>
  );
};

const ProfileSkeleton = () => (
  <Skeleton className="w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full" />
);

export default Hero;
