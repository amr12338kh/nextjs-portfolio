import { InfiniteMovingCards } from "../ui/InfiniteMovingCards";
import Image from "next/image";
import { Skill } from "@/sanity/types";

const TechStack = ({ skills }: { skills: Skill[] }) => {
  const directions: ("left" | "right")[] = ["right", "left"];

  return (
    <div className="relative flex flex-col gap-6 py-6">
      {directions.map((dir, id) => (
        <InfiniteMovingCards
          key={id}
          direction={dir}
          speed="slow"
          pauseOnHover={false}
        >
          {skills.map(
            ({ _createdAt, title, image, isDark }: Skill, i: number) => (
              <li
                key={i}
                className="flex items-center justify-center rounded-md bg-muted/50 shadow p-3"
              >
                <Image
                  src={image || ""}
                  alt={title || "Tech Image"}
                  width={40}
                  height={40}
                  className={`${isDark && "dark:invert"}`}
                  priority={false}
                />
              </li>
            )
          )}
        </InfiniteMovingCards>
      ))}

      <div className="absolute top-0 right-0 z-20 bg-gradient-to-l from-background from-50% to-transparent h-full w-10 sm:w-16" />
      <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-background from-50% to-transparent h-full w-10 sm:w-16" />
    </div>
  );
};

export default TechStack;
