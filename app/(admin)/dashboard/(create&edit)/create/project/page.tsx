import ProjectForm from "@/components/dashboard/ProjectForm";
import { client } from "@/sanity/lib/client";
import { ALL_SKILLS_QUERY } from "@/sanity/lib/queries";

const page = async () => {
  const skills = await client.fetch(ALL_SKILLS_QUERY);

  return (
    <div>
      <ProjectForm skills={skills} mode="create" />
    </div>
  );
};

export default page;
