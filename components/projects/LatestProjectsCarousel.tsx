"use client";

import { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { ProjectProps } from "@/types";

export const LatestProjectsCarousel = ({
  projects,
}: {
  projects: ProjectProps[];
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const latestProjects = [...projects]
    .sort((a, b) => {
      const dateA = a._createdAt;
      const dateB = b._createdAt;

      if (!dateA || !dateB) return 0;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })
    .slice(0, 3);

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
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {latestProjects.map((project, index: number) => (
            <CarouselItem
              key={`latest-project-${index}`}
              className="sm:basis-1/2 lg:basis-1/3"
            >
              <ProjectCard project={project} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="lg:hidden flex justify-center gap-4 mt-5">
          <CarouselPrevious className="rounded-lg" />
          <div className="flex justify-center gap-2 mt-4">
            {latestProjects.map((_, index) => (
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

        <div className="text-center mt-10">
          <Link href="/project" className="group">
            <Button>
              Explore More
              <MoveRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </Carousel>
    </div>
  );
};
