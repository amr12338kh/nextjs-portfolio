"use client";

import { Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ProjectProps } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ProjectLinks = ({ project }: { project: ProjectProps }) => {
  return (
    <div className="flex items-center gap-3">
      {project.githubLink && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg"
              >
                <Button
                  variant="outline"
                  className={cn(
                    "flex items-center gap-2 rounded-lg",
                    "bg-muted/50 hover:bg-muted",
                    "border-muted-foreground/20 hover:border-primary/50",
                    "transition-all duration-300",
                    "group"
                  )}
                  asChild
                >
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github
                      className={cn(
                        "size-4 text-muted-foreground",
                        "group-hover:text-primary",
                        "transition-colors duration-300"
                      )}
                    />
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      GitHub
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom">View Source Code</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {project.link && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg"
              >
                <Button
                  variant="default"
                  className={cn(
                    "flex items-center gap-2 rounded-lg",
                    "bg-primary hover:bg-primary/90",
                    "shadow-md hover:shadow-lg",
                    "transition-all duration-300",
                    "group"
                  )}
                  asChild
                >
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Globe
                      className={cn(
                        "size-4 text-primary-foreground",
                        "group-hover:scale-110",
                        "transition-transform duration-300"
                      )}
                    />
                    <span className="text-xs font-medium text-primary-foreground">
                      Live Site
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom">Visit Live Site</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ProjectLinks;
