import ProjectsHero from "@/components/projects/ProjectsHero";
import { YearGroupedProjectsCarousel } from "@/components/projects/YearGroupedProjectsCarousel";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import React from "react";

const page = async () => {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);

  return (
    <main>
      <ProjectsHero projects={projects} />
      <YearGroupedProjectsCarousel projects={projects} />
    </main>
  );
};

export default page;
