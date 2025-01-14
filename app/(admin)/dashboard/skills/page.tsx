import { DataTable } from "@/components/dashboard/AllModelsTable";
import { Separator } from "@/components/ui/separator";
import { client } from "@/sanity/lib/client";
import { ALL_SKILLS_QUERY } from "@/sanity/lib/queries";
import React from "react";
import { NotAvailable } from "../page";

const page = async () => {
  const skills = await client.fetch(ALL_SKILLS_QUERY);

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">Skills</h1>
      <div>
        <Separator className="my-5" />
        {skills.length > 0 ? (
          <DataTable data={skills} pageSize={10} type="skill" />
        ) : (
          <NotAvailable value="Skills" />
        )}
      </div>
    </div>
  );
};

export default page;
