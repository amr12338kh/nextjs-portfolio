"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center sm:items-start md:items-center">
      <motion.div
        className="relative md:hidden"
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="profile_pic rounded-full relative w-48 h-48 overflow-hidden">
          <Image
            src="/amr.jfif"
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 blur-2xl opacity-30" />
        <div className="hidden lg:block dark:bg-dashes bg-dashes_light absolute z-20 top-64 right-2 w-full h-full bg-no-repeat" />
        <div className="hidden lg:block dark:bg-pluses bg-pluses_light absolute z-20 top-2 left-64 w-full h-full bg-no-repeat" />
        <div className="profile_border border-[2px] border-primary absolute z-10 top-0 w-full h-full" />
      </motion.div>
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
      <motion.div
        className="relative hidden md:block"
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="profile_pic rounded-full relative w-56 h-56 lg:w-72 lg:h-72 overflow-hidden">
          <Image
            src="/amr.jfif"
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 blur-2xl opacity-30" />
        <div className="hidden lg:block dark:bg-dashes bg-dashes_light absolute z-20 top-64 right-58 w-[104px] h-[30px] bg-no-repeat" />
        <div className="hidden lg:block dark:bg-pluses bg-pluses_light absolute z-20 top-2 left-64 w-[50px] h-[56px] bg-no-repeat" />
        <div className="profile_border border-[2px] border-primary absolute z-10 top-0 w-full h-full" />
      </motion.div>
    </div>
  );
};

export default Hero;
