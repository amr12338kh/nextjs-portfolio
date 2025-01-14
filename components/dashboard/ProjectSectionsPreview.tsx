import { SectionsProps } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Image, X } from "lucide-react";

const ProjectSectionsPreview = ({
  sections,
  deleteSection,
}: {
  sections: SectionsProps[];
  deleteSection: (index: number) => void;
}) => {
  return (
    sections.length > 0 && (
      <Carousel>
        <CarouselContent>
          {sections.map((section: SectionsProps, index: number) => (
            <CarouselItem
              key={"section " + index}
              className=" sm:basis-1/2 lg:basis-1/3"
            >
              <div className="relative w-full">
                <span
                  className=" absolute top-1 right-1 z-20 p-1 rounded-full bg-destructive text-white font-semibold cursor-pointer"
                  onClick={() => deleteSection(index)}
                >
                  <X className="size-4" />
                </span>
                {section.image ? (
                  <img
                    src={section.image}
                    alt={`${section.text} section ${index}`}
                    className="rounded-lg relative h-[210px] sm:h-[180px] w-full object-cover"
                  />
                ) : (
                  <div className="rounded-lg h-[220px] w-full bg-muted flex items-center justify-center">
                    <Image />
                  </div>
                )}
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
    )
  );
};

export default ProjectSectionsPreview;
