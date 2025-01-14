import ProjectCarousel from "./ProjectCarousel";
import SectionTitle from "../SectionTitle";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";

const Projects = async () => {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);

  return (
    <>
      <SectionTitle title="Projects" />
      <ProjectCarousel projects={projects} />
    </>
  );
};

export default Projects;
