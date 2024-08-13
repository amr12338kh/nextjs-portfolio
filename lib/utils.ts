import { ProjectsProps } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

async function fetchData<T>(query: string): Promise<T> {
  if (!HYGRAPH_ENDPOINT) {
    throw new Error("HYGRAPH_ENDPOINT is not defined");
  }

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 10, // 1 Hour
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.errors ? error.errors[0].message : "An error occurred"
    );
  }

  const json = await response.json();
  return json.data;
}

export const getProjects = async (): Promise<ProjectsProps[]> => {
  const query = `
    query projects {
      projectsData {
        id
        title
        tagline
        link
        description
        btnText
        date
        isFinished
        image {
          url
        }
      }
    }
  `;

  return (await fetchData<{ projects: ProjectsProps[] }>(query)).projects;
};
