import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectsCarousel from "./Carousel/ProjectsCarousel";
import AnimatedTitle from "../AnimatedTitle";
import UnderLine from "../UnderLine";

const Projects = async () => {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);

  return (
    <>
      <div className="mb-10">
        <AnimatedTitle
          title="My Projects"
          subtitle="A collection of my latest development projects"
          titleClassName="text-4xl sm:text-5xl "
        />
        <UnderLine lineClassName="!mx-0" />
      </div>
      <ProjectsCarousel projects={projects} showExploreMore />
    </>
  );
};

export default Projects;
