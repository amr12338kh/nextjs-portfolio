"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

const PROFILE_ANIMATIONS = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" },
} as const;

interface ProfileImgProps {
  isSmall?: boolean;
}

const ProfileImg = memo(({ isSmall = false }: ProfileImgProps) => {
  const sizeClasses = isSmall ? "mb-10 md:hidden" : "hidden md:block";

  return (
    <motion.div className={`relative ${sizeClasses}`} {...PROFILE_ANIMATIONS}>
      <div
        className="profile_pic rounded-full relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 overflow-hidden"
        role="img"
        aria-label="Amr's Profile Picture"
      >
        <Image
          src="/Amr3.jpg"
          alt="Amr's Profile Picture"
          fill
          priority={isSmall}
          quality={80}
          style={{ objectFit: "cover" }}
          sizes="(min-width: 1024px) 288px, (min-width: 768px) 224px, 192px"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 blur-2xl opacity-30" />

      <div
        className="hidden lg:block dark:bg-dashes bg-dashes_light absolute z-20 top-60 right-58 w-[104px] h-[30px] bg-no-repeat"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block dark:bg-pluses bg-pluses_light absolute z-20 top-2 left-60 w-[50px] h-[56px] bg-no-repeat"
        aria-hidden="true"
      />

      <div
        className="profile_border border-[2px] border-primary absolute z-10 inset-0 rounded-full"
        aria-hidden="true"
      />
    </motion.div>
  );
});

ProfileImg.displayName = "ProfileImg";

export default ProfileImg;
