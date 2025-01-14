import ProjectForm from "@/components/dashboard/ProjectForm";
import { client } from "@/sanity/lib/client";
import { ALL_SKILLS_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [project, skills] = await Promise.all([
    client.fetch(PROJECT_QUERY, { id }),
    client.fetch(ALL_SKILLS_QUERY),
  ]);

  return (
    <div>
      <ProjectForm
        skills={skills}
        mode="edit"
        projectId={id}
        initialData={project}
      />
    </div>
  );
};

export default page;
