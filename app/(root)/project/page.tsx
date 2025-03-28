import ProjectsCarousel from "@/components/projects/Carousel/ProjectsCarousel";
import ProjectsHero from "@/components/projects/ProjectsHero";
import { groupProjectsByYear } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import React from "react";

const page = async () => {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);
  const projectsByYear = groupProjectsByYear(projects);

  return (
    <main className="pt-10 sm:pt-0">
      <ProjectsHero projects={projects} />
      <ProjectsCarousel
        projects={projectsByYear}
        mode="yearly"
        title={`Projects`}
      />
    </main>
  );
};

export default page;
