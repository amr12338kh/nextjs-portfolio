import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import AnimatedTitle from "../AnimatedTitle";
import UnderLine from "../UnderLine";
import ProjectCard from "./ProjectCard";
import { ProjectProps } from "@/types";
import { ExploreMoreButton } from "../ExploreMoreButton";

const FeaturedProjects = async () => {
  const projects: ProjectProps[] = await client.fetch(ALL_PROJECTS_QUERY);

  return (
    <div>
      <div className="mb-10">
        <AnimatedTitle
          title="Featured"
          colored="Projects"
          subtitle="A selection of digital experiences built with precision and passion."
          titleClassName="text-4xl sm:text-5xl md:text-6xl!"
          subtitleClassName="max-w-2xl !text-md"
        />
        <UnderLine lineClassName="mx-0!" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-fr">
        {projects
          .filter((p) => p.isActive)
          .map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
      </div>
      <ExploreMoreButton exploreMoreLink="/projects" />
    </div>
  );
};

export default FeaturedProjects;
