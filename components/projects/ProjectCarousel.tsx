import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProjectCard from "./ProjectCard";
import { Project } from "@/sanity/types";

const ProjectCarousel = async ({ projects }: { projects: Project[] }) => {
  return (
    <Carousel>
      <CarouselContent>
        {projects.map((project: Project, index: number) => (
          <CarouselItem
            key={"Project " + index}
            className=" sm:basis-1/2 lg:basis-1/3"
          >
            <ProjectCard project={project} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className=" mt-5 absolute flex gap-2 right-0">
        <CarouselPrevious
          variant="outline"
          size="default"
          className=" rounded-md"
        />
        <CarouselNext
          variant="outline"
          size="default"
          className=" rounded-md"
        />
      </div>
    </Carousel>
  );
};

export default ProjectCarousel;
