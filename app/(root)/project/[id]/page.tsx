import { Separator } from "@/components/ui/separator";
import ProjectSection from "@/components/projects/singleProjectPage/ProjectSection";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import React from "react";
import ProjectLinks from "@/components/projects/singleProjectPage/ProjectLinks";
import ProjectSkills from "@/components/projects/ProjectSkills";
import { ProjectProps } from "@/types";
import ProjectDetails from "@/components/projects/singleProjectPage/ProjectDetails";
import AnimatedTitle from "@/components/AnimatedTitle";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const project: ProjectProps = await client.fetch(PROJECT_QUERY, { id });
  if (!project) return notFound();

  return (
    <main className="py-32">
      <section>
        <div className=" flex items-center justify-between w-full">
          <AnimatedTitle
            title={project?.title || "Project Title"}
            subtitle={project?.tagline || "Project Tagline"}
            variant="secondary"
          />
          <ProjectSkills project={project} />
        </div>
      </section>

      <Separator className="my-10" />

      <section className="">
        <ProjectLinks project={project} />
      </section>

      <section className="mt-10">
        <ProjectSection project={project} />
      </section>

      {project.sections && project.sections.length > 0 && (
        <section className="my-16">
          <ProjectDetails project={project} />
        </section>
      )}
    </main>
  );
};

export default page;
