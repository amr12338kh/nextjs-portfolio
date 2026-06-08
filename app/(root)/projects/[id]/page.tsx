import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { ProjectProps } from "@/types";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

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
    <main className="pb-16">
      <section>
        <ProjectDetails project={project} />
      </section>
    </main>
  );
};

export default page;
