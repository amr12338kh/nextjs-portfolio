import { Separator } from "@/components/ui/separator";
import ProjectSection from "@/components/projects/singleProjectPage/ProjectSection";
import ProjectDetails from "@/components/projects/singleProjectPage/ProjectDetails";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import React, { Suspense } from "react";
import ProjectLinks from "@/components/projects/singleProjectPage/ProjectLinks";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const project = await client.fetch(PROJECT_QUERY, { id });
  if (!project) return notFound();

  return (
    <main className="px-5 md:px-10 py-32">
      <section>
        <ProjectDetails project={project} />
        <ProjectLinks project={project} />
      </section>
      <Separator className="my-10" />
      <section className="">
        <Suspense fallback={<p>LOADING...</p>}>
          <ProjectSection project={project} />
        </Suspense>
      </section>
    </main>
  );
};

export default page;
