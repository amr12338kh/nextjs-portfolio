import { CircleUserRound } from "lucide-react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { TestimonialsProps } from "@/types";
import AnimatedTitle from "./AnimatedTitle";

const Testimonials = async ({
  testimonials,
}: {
  testimonials: TestimonialsProps[];
}) => {
  return (
    <>
      <AnimatedTitle title="What others saying" />
      <div className=" relative">
        <InfiniteMovingCards
          direction="right"
          speed="slow_max"
          className=" gap-0"
        >
          {testimonials.map(
            (
              { username, job_title, user_message }: TestimonialsProps,
              index: number
            ) => (
              <li
                className=" bg-primary-foreground w-[300px] sm:w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 px-4 sm:px-8 py-6 md:w-[450px]"
                key={index}
              >
                <blockquote className="flex flex-col gap-4">
                  <div className=" flex items-center gap-2">
                    <CircleUserRound size={40} />
                    <div>
                      <h1 className="font-semibold text-primary text-sm sm:text-base line-clamp-1">
                        {username}
                      </h1>
                      <span className="text-muted-foreground text-xs sm:text-sm line-clamp-1 ">
                        {job_title}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="italic text-xs sm:text-sm text-muted-foreground">
                      ❝ {user_message} ❞
                    </p>
                  </div>
                </blockquote>
              </li>
            )
          )}
        </InfiniteMovingCards>
        <div className="absolute top-0 right-0 z-20 bg-gradient-to-l from-background from-50% to-transparent h-full w-10 sm:w-16" />
        <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-background from-50% to-transparent h-full w-10 sm:w-16" />
      </div>
    </>
  );
};

export default Testimonials;
