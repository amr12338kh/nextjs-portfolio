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

const ProjectLinks = ({ project }: { project: ProjectProps }) => {
  return (
    <div className="flex items-center gap-2">
      {project.githubLink && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="xs"
                className="hover:scale-105 transition-transform"
                asChild
              >
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-2" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View Source Code</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {project.link && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="xs"
                className="hover:scale-105 transition-transform"
                asChild
              >
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="size-2" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Visit Live Site</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ProjectLinks;
