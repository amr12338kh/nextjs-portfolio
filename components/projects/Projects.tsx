import ProjectCarousel from "./ProjectCarousel";
import SectionTitle from "../SectionTitle";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";

const Projects = async () => {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);

  return (
    <>
      <div className="text-center mb-10">
        <SectionTitle
          title="My Works"
          subtitle="A collection of my latest development projects"
          variant="secondary"
        />
      </div>
      <ProjectCarousel projects={projects} />
    </>
  );
};

export default Projects;
