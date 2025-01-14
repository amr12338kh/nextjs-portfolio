"use client";

import { SocialMediaStatsProps, StatCardProps } from "@/types";
import { GridBackground } from "./ui/GridBackground";
import { motion } from "framer-motion";

const SocialMediaStats = ({
  githubFollowers,
  totalStars,
  instagramFollowers,
}: SocialMediaStatsProps) => {
  return (
    <GridBackground>
      <div className="flex flex-wrap justify-center gap-20 sm:gap-28 z-10">
        <StatCard label="followers" platform="github" value={githubFollowers} />
        <StatCard label="stars" platform="github" value={totalStars} />
        <StatCard
          label="followers"
          platform="instagram"
          value={instagramFollowers}
        />
      </div>
    </GridBackground>
  );
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const StatCard = ({ label, platform: platform, value }: StatCardProps) => {
  return (
    <div className="text-center">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="text-5xl sm:text-6xl font-bold text-primary mb-2">
          {formatNumber(value)}
        </p>
        <p className="text-lg font-medium text-muted-foreground tracking-widest uppercase">
          {label}
        </p>
        <p className="font-medium text-muted-foreground/70 tracking-widest uppercase">
          on {platform}
        </p>
      </motion.span>
    </div>
  );
};

export default SocialMediaStats;
