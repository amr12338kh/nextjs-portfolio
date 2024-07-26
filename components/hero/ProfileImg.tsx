"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ProfileImg = ({ isSmall }: { isSmall: boolean }) => {
  return (
    <motion.div
      className={`relative ${isSmall ? "mb-10 md:hidden" : "hidden md:block"}`}
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
      <div className="profile_pic rounded-full relative w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 overflow-hidden">
        <Image
          src="/amr.jfif"
          alt="Profile Picture"
          fill
          style={{ objectFit: "cover" }}
          sizes="(min-width: 768px) 100vw, (min-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 blur-2xl opacity-30" />
      <div className="hidden lg:block dark:bg-dashes bg-dashes_light absolute z-20 top-64 right-58 w-[104px] h-[30px] bg-no-repeat" />
      <div className="hidden lg:block dark:bg-pluses bg-pluses_light absolute z-20 top-2 left-64 w-[50px] h-[56px] bg-no-repeat" />
      <div className="profile_border border-[2px] border-primary absolute z-10 top-0 w-full h-full" />
    </motion.div>
  );
};

export default ProfileImg;
