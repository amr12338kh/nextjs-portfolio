"use client";

import { motion } from "framer-motion";
import ProfileImg from "./ProfileImg";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center sm:items-start md:items-center">
      <Suspense fallback={<Loading />}>
        <ProfileImg isSmall />
      </Suspense>
      <motion.div
        className=" max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl text-center sm:text-start"
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <h3 className="font-semibold text-lg sm:text-xl">
          Hi There!, I&apos;m Amr.
        </h3>
        <h1 className=" font-bold text-[20px] sm:text-3xl md:text-4xl lg:text-5xl">
          a{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff1835] to-[#ffc900]">
            passionate
          </span>{" "}
          Front-End Developer with a specialization in Next.js.
        </h1>
      </motion.div>
      <Suspense fallback={<Loading />}>
        <ProfileImg isSmall={false} />
      </Suspense>
    </div>
  );
};

export const Loading = () => (
  <Skeleton className=" w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full" />
);

export default Hero;
