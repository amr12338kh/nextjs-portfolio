"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const ExploreMoreButton = ({
  exploreMoreLink,
}: {
  exploreMoreLink: string;
}) => (
  <div className="flex items-center justify-center">
    <Link href={exploreMoreLink} className="inline-block text-center mt-10">
      <motion.div
        variants={{
          hover: { y: -2 },
          tap: { y: 0 },
        }}
        whileHover="hover"
        whileTap="tap"
      >
        <Button className="group">
          <span>Explore More</span>
          <motion.span
            className="inline-block ml-2"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <MoveRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.span>
        </Button>
      </motion.div>
    </Link>
  </div>
);
