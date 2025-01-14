import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../ui/carousel";
import { ProjectProps } from "@/types";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export const experimental_ppr = true;

const SingleProjectSection = ({ project }: { project: ProjectProps }) => {
  return project?.sections && project.sections.length > 0 ? (
    <Carousel>
      <CarouselContent>
        {project.sections?.map((section, index) => (
          <CarouselItem
            key={"section " + index}
            className=" sm:basis-1/2 lg:basis-1/3"
          >
            <div>
              <Image
                src={section.image}
                alt={`${project.title} section ${index}`}
                width={1000}
                height={1000}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg relative object-cover"
              />
              <div className="pt-2 px-2">
                <h2 className="text-primary font-semibold text-xl">
                  {section.text}
                </h2>
                <p className="text-sm mt-1">{section.subText}</p>
              </div>
            </div>
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

export const ProjectSectionSkeleton = () => (
  <>
    <Carousel>
      <CarouselContent>
        {[0, 1, 2, 3, 4].map((i: number) => (
          <CarouselItem key={i} className=" sm:basis-1/2 lg:basis-1/3">
            <div>
              <div>
                <Skeleton className="w-full h-[220px] rounded-lg" />
              </div>
              <div className="pt-2 space-y-3 px-2">
                <Skeleton className=" w-[150px] h-5" />
                <div className=" space-y-1">
                  <Skeleton className=" w-[300px] h-2" />
                  <Skeleton className=" w-[100px] h-2" />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </>
);

export default SingleProjectSection;
