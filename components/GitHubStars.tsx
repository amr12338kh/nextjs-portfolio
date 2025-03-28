import { cn, formatNumber } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FiGithub } from "react-icons/fi";

const GitHubStars = ({
  stars,
  className,
}: {
  stars: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn("flex items-center", className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href="https://github.com/amr12338kh"
        target="_blank"
        className="relative inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full 
                      bg-muted-foreground/5 border border-muted-foreground/15 
                      hover:bg-muted-foreground/10 hover:border-muted-foreground/40
                      transition-all duration-300 group"
      >
        <motion.div className="p-1 bg-primary/10 rounded-full">
          <FiGithub className="w-4 h-4 text-primary" />
        </motion.div>

        <div className="flex items-center gap-1.5 pl-1">
          <div>
            <Star
              className="w-4 h-4 text-yellow-500 
                          fill-yellow-500/30 group-hover:fill-yellow-500/60 
                          transition-all duration-300"
            />
          </div>

          <span
            className="font-semibold text-primary 
                        group-hover:text-primary/80 
                        transition-colors duration-300"
          >
            {formatNumber(stars)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default GitHubStars;
