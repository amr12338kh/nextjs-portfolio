"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { ProjectsCarouselProps, ProjectProps } from "@/types";

import { ProjectCarouselView } from "./ProjectCarouselView";
import { ExploreMoreButton } from "../../ExploreMoreButton";

export const ProjectsCarousel = ({
  projects,
  className,
  mode = "latest",
  title,
  showExploreMore = false,
  exploreMoreLink = "/project",
}: ProjectsCarouselProps) => {
  const displayProjects =
    mode === "latest"
      ? (projects as ProjectProps[])
          .sort((a, b) => {
            const dateA = a._createdAt;
            const dateB = b._createdAt;

            if (!dateA || !dateB) return 0;
            return new Date(dateB).getTime() - new Date(dateA).getTime();
          })
          .slice(0, 3)
      : projects;

  if (
    mode === "yearly" &&
    Array.isArray(displayProjects) &&
    displayProjects[0] instanceof Array
  ) {
    return (
      <div className={cn("w-full", className)}>
        {(displayProjects as [string, ProjectProps[]][]).map(
          ([year, yearProjects], yearIndex) => (
            <div key={year} className="mb-16">
              <ProjectCarouselView
                projectsToRender={yearProjects}
                yearTitle={year}
                mode={mode}
              />
            </div>
          )
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full relative", className)}>
      <ProjectCarouselView
        projectsToRender={displayProjects as ProjectProps[]}
        yearTitle={title}
        mode={mode}
      />

      {showExploreMore && (
        <ExploreMoreButton exploreMoreLink={exploreMoreLink} />
      )}
    </div>
  );
};

export default ProjectsCarousel;
