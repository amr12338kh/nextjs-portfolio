import { ExpandableCard } from "./ui/ExpandableCard";
import { projectsCards } from "@/data";

const Projects = () => {
  return (
    <div>
      <div className="relative text-center mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wider">
          Projects
        </h1>
        <div className="absolute size-24 top-[50%] w-[300px] left-[50%] translate-x-[-50%] translate-y-[-50%] inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 blur-2xl opacity-25" />
      </div>
      <ExpandableCard items={projectsCards} />
    </div>
  );
};

export default Projects;
