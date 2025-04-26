import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import React from "react";
import ProjectSkills from "@/components/projects/ProjectSkills";
import { ProjectProps } from "@/types";
import ProjectDetails from "@/components/projects/singleProjectPage/ProjectDetails";
import AnimatedTitle from "@/components/AnimatedTitle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UnderLine from "@/components/UnderLine";
import { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const project: ProjectProps = await client.fetch(PROJECT_QUERY, { id });

  if (!project) {
    return {
      title: "Project Not Found | Amr's Portfolio",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Amr's Portfolio`,
    description:
      project.tagline || `${project.title} - A web development project by Amr`,
    keywords: [
      ...(project.skills
        ?.map((skill) => skill.title)
        .filter((title): title is string => !!title) || []),
      "project",
      "web development",
      "portfolio",
    ],
    openGraph: {
      title: `${project.title} | Amr's Portfolio`,
      description:
        project.tagline ||
        `${project.title} - A web development project by Amr`,
      images: [
        {
          url: project.image ? urlFor(project.image).url() : "/og-image.png",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "article",
      url: `https://amr-portfolio-dev.vercel.app/projects/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Amr's Portfolio`,
      description:
        project.tagline ||
        `${project.title} - A web development project by Amr`,
      images: [project.image ? urlFor(project.image).url() : "/og-image.png"],
    },
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const project: ProjectProps = await client.fetch(PROJECT_QUERY, { id });
  if (!project) return notFound();

  return (
    <main className="pt-32 pb-16 ">
      <section>
        <div className=" flex items-center justify-between w-full">
          <AnimatedTitle
            title={project?.title || "Project Title"}
            subtitle={project?.tagline || "Project Tagline"}
            containerClassName="!space-y-1"
            subtitleClassName="!text-sm sm:!text-lg"
          />
          <ProjectSkills project={project} />
        </div>

        <UnderLine lineClassName="!mx-0" />
      </section>

      <section className="mt-10">
        <ProjectDetails project={project} />
      </section>

      {project.isActive && (
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mt-10 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      )}
    </main>
  );
};

export default page;
