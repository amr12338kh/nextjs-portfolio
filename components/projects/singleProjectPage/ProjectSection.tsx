"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../ui/carousel";
import { ProjectProps } from "@/types";
import { Loader, ZoomIn } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const SingleProjectSection = ({ project }: { project: ProjectProps }) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  return project?.sections && project.sections.length > 0 ? (
    <div className="w-full space-y-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full relative"
      >
        <div className="flex pb-2 border-b border-muted-foreground/20 justify-between items-center mb-4">
          <h2
            className={cn(
              "text-lg font-semibold text-foreground/80",
              "tracking-tight"
            )}
          >
            <span className="flex items-center gap-2">
              <span className="w-[6px] h-[6px] bg-primary/50 rounded-full" />
              <span>Project Sections</span>
            </span>
          </h2>
          <div className="flex space-x-2">
            <CarouselPrevious
              className="relative translate-y-0"
              variant="outline"
            />
            <CarouselNext
              className="relative translate-y-0"
              variant="outline"
            />
          </div>
        </div>

        <CarouselContent className="-ml-4">
          {project.sections?.map((section, index) => (
            <CarouselItem
              key={`section-${index}`}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer group">
                    <div className="relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
                      <Image
                        src={section.image}
                        alt={`${project.title} section ${index}`}
                        width={1000}
                        height={1000}
                        loading="lazy"
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-muted-foreground/50 p-2 rounded-full">
                          <ZoomIn />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 px-1">
                      <h3 className="text-lg font-medium text-primary truncate">
                        {section.text}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {section.subText}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl shadow-2xl">
                  <div className="grid md:grid-cols-2">
                    <div className="relative">
                      <Image
                        src={section.image}
                        alt={`${project.title} section ${index}`}
                        width={1000}
                        height={1000}
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <div className="p-8 space-y-6 bg-background">
                      <div>
                        <DialogTitle className="text-2xl font-bold text-primary mb-3">
                          {section.text}
                        </DialogTitle>
                        <div className="h-1 w-16 bg-primary/50 rounded-full mb-4"></div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {section.subText}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center min-h-[50vh] text-center space-y-4">
      <Loader className="animate-spin text-primary w-8 h-8" />{" "}
      <h2 className="text-2xl font-semibold">
        Working on {project.title}&apos;s sections...
      </h2>
      <p className="text-muted-foreground text-sm max-w-md">
        Stay tuned! We&apos;re crafting something awesome here. Check back
        shortly.
      </p>
    </div>
  );
};

export default SingleProjectSection;
