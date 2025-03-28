"use client";

import React from "react";
import { CarouselPrevious, CarouselNext } from "../../ui/carousel";
import { CarouselMobileNavigationProps } from "@/types";
import { CarouselDotNavigation } from "./CarouselDotNavigation";

export const CarouselMobileNavigation = ({
  projectsToRender,
  currentSlide,
  api,
  mode = "latest",
}: CarouselMobileNavigationProps) => (
  <div
    className={`${mode === "latest" ? "lg:hidden" : "sm:hidden"} flex items-center justify-between mt-5`}
  >
    <div>
      <CarouselPrevious className="rounded-lg" />
    </div>

    <CarouselDotNavigation
      projectsToRender={projectsToRender}
      currentSlide={currentSlide}
      api={api}
    />

    <div>
      <CarouselNext className="rounded-lg" />
    </div>
  </div>
);
