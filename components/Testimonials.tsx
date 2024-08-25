import { CircleUserRound } from "lucide-react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { testimonials } from "@/data";
import Image from "next/image";
import TextAmbient from "./ui/TextAmbient";

const Testimonials = () => {
  return (
    <div>
      <div className="relative text-center mb-20">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-wider">
          What others saying
        </h1>
        <TextAmbient />
      </div>
      <div className=" relative">
        <InfiniteMovingCards
          direction="right"
          speed="slow_max"
          className=" gap-0"
        >
          {testimonials.map((item, idx) => (
            <li
              className=" bg-primary-foreground w-[300px] sm:w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 px-4 sm:px-8 py-6 md:w-[450px]"
              key={item.name}
            >
              <blockquote className="flex flex-col gap-4">
                <div className=" flex items-center gap-2">
                  {item.img ? (
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  ) : (
                    <CircleUserRound size={40} />
                  )}
                  <div>
                    <h1 className="font-semibold text-primary text-sm sm:text-base line-clamp-1">
                      {item.name}
                    </h1>
                    <span className="text-muted-foreground text-xs sm:text-sm line-clamp-1 ">
                      {item.title}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="italic text-xs sm:text-sm text-muted-foreground">
                    ❝ {item.quote} ❞
                  </p>
                </div>
              </blockquote>
            </li>
          ))}
        </InfiniteMovingCards>
        <div className="absolute top-0 right-0 z-20 bg-gradient-to-l from-background from-50% to-transparent h-full w-10 sm:w-16" />
        <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-background from-50% to-transparent h-full w-10 sm:w-16" />
      </div>
    </div>
  );
};

export default Testimonials;
