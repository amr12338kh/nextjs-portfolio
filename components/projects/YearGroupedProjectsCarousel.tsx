"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProjectCard from "./ProjectCard";
import { ProjectProps } from "@/types";
import { Separator } from "../ui/separator";
import { groupProjectsByYear } from "@/lib/utils";

export const YearGroupedProjectsCarousel = ({
  projects,
}: {
  projects: ProjectProps[];
}) => {
  const YearCarousel = ({
    year,
    yearProjects,
  }: {
    year: string;
    yearProjects: ProjectProps[];
  }) => {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
      if (!api) return;

      const onSelect = () => {
        setCurrentSlide(api.selectedScrollSnap());
      };

      api.on("select", onSelect);
      setCurrentSlide(api.selectedScrollSnap());

      return () => {
        api.off("select", onSelect);
      };
    }, [api]);

    const handleDotClick = (index: number) => {
      if (api) {
        api.scrollTo(index);
      }
    };

    return (
      <div className="mb-16">
        <Carousel setApi={setApi}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-6">Projects done in {year}</h2>
            <div className="hidden sm:flex items-center justify-end gap-2">
              <CarouselPrevious className="rounded-lg" />
              <CarouselNext className="rounded-lg" />
            </div>
          </div>

          <Separator className="mb-5" />
          <CarouselContent>
            {yearProjects.map((project, index: number) => (
              <CarouselItem
                key={`project-${year}-${index}`}
                className="sm:basis-1/2 lg:basis-1/3"
              >
                <ProjectCard project={project} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="sm:hidden flex items-center justify-center gap-4 mt-4">
            <CarouselPrevious className="rounded-lg" />
            <div className="flex justify-center gap-2">
              {yearProjects.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-primary w-4"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <CarouselNext className="rounded-lg" />
          </div>
        </Carousel>
      </div>
    );
  };

  const projectsByYear = groupProjectsByYear(projects);

  return (
    <div>
      {projectsByYear.map(([year, yearProjects]) => (
        <YearCarousel
          key={`year-${year}`}
          year={year}
          yearProjects={yearProjects}
        />
      ))}
    </div>
  );
};
