import { DataTable } from "@/components/dashboard/AllModelsTable";
import { Separator } from "@/components/ui/separator";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";
import React from "react";
import { NotAvailable } from "../page";

const page = async () => {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">Projects</h1>
      <div>
        <Separator className="my-5" />
        {projects.length > 0 ? (
          <DataTable data={projects} pageSize={10} type="project" />
        ) : (
          <NotAvailable value="Projects" />
        )}
      </div>
    </div>
  );
};

export default page;
