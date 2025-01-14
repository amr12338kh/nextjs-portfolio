import SkillForm from "@/components/dashboard/SkillForm";
import { client } from "@/sanity/lib/client";
import { SKILL_QUERY } from "@/sanity/lib/queries";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const skill = await client.fetch(SKILL_QUERY, { id });

  return (
    <div>
      <SkillForm mode="edit" skillId={id} initialData={skill} />
    </div>
  );
};

export default page;
