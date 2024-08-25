import { ExpandableCard } from "./ui/Expandable/ExpandableCard";
import { projectsCards } from "@/data";
import TextAmbient from "./ui/TextAmbient";

const Projects = () => {
  return (
    <div>
      <div className="relative text-center mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wider">
          Projects
        </h1>
        <TextAmbient />
      </div>
      <ExpandableCard items={projectsCards} />
    </div>
  );
};

export default Projects;
