import SectionTitle from "../SectionTitle";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import { LatestProjectsCarousel } from "./LatestProjectsCarousel";

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
      <LatestProjectsCarousel projects={projects} />
    </>
  );
};

export default Projects;
