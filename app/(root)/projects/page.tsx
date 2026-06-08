import AllProjects from "@/components/projects/AllProjects";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY, ALL_SKILLS_QUERY } from "@/sanity/lib/queries";

export async function generateMetadata() {
  const projects = await client.fetch(ALL_PROJECTS_QUERY);

  return {
    title: "Projects | Amr's Portfolio",
    description: `Explore ${projects.length}+ web development projects built with Next.js, React, and modern technologies.`,
    openGraph: {
      title: "Projects | Amr's Portfolio",
      description: `Explore ${projects.length}+ web development projects built with Next.js, React, and modern technologies.`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Amr's Development Projects",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Projects | Amr's Portfolio",
      description: `Explore ${projects.length}+ web development projects built with Next.js, React, and modern technologies.`,
      images: ["/og-image.png"],
    },
  };
}

const page = async () => {
  const [projects, skills] = await Promise.all([
    await client.fetch(ALL_PROJECTS_QUERY),
    await client.fetch(ALL_SKILLS_QUERY),
  ]);

  return (
    <main>
      <AllProjects projects={projects} />
    </main>
  );
};

export default page;
