"use server";

import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { ProjectProps, SkillProps, TestimonialsProps } from "@/types";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";

const logError = (context: string, error: unknown) => {
  console.error(`[${context}] Error details:`, {
    message: error instanceof Error ? error.message : String(error),
    fullError: error,
    timestamp: new Date().toISOString(),
  });
};

export const deleteItem = async (id: string) => {
  try {
    await client.delete(id);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting document:", error.message);
    } else {
      console.error("Error deleting document:", error);
    }
  }
};

export const createProject = async (newProject: ProjectProps) => {
  const {
    title,
    tagline,
    description,
    image,
    link,
    githubLink,
    sections,
    skills,
  } = newProject;

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const skillReferences = skills.map((skill) => ({
      _type: "reference" as const,
      _ref: skill._id,
      _key: skill._id,
    }));

    const project = {
      _type: "project",
      title,
      tagline,
      description,
      link,
      githubLink,
      image,
      slug: {
        _type: slug,
        current: slug,
      },
      sections: sections.map((section) => ({
        ...section,
        _key: crypto.randomUUID(), // Add a unique key for each section
      })),
      skills: skillReferences,
    };

    console.log("[createProject] Preparing to create project in Sanity");
    const result = await writeClient.create(project);

    console.log("[createProject] Project created successfully", {
      projectId: result._id,
    });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    logError("createProject", error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateProject = async (data: ProjectProps) => {
  const {
    id,
    title,
    tagline,
    description,
    image,
    link,
    githubLink,
    sections,
    skills,
  } = data;

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const skillReferences = skills.map((skill) => ({
      _type: "reference" as const,
      _ref: skill._id,
      _key: skill._id,
    }));

    const project = {
      title,
      tagline,
      description,
      link,
      githubLink,
      image,
      slug: {
        _type: slug,
        current: slug,
      },
      sections: sections.map((section) => ({
        ...section,
        _key: section._key || crypto.randomUUID(),
      })),
      skills: skillReferences,
    };

    console.log("[updateProject] Preparing to update project in Sanity");
    const result = await writeClient
      .patch(id ? id : "")
      .set(project)
      .commit();

    console.log("[updateProject] Project updated successfully", {
      projectId: result._id,
    });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    logError("updateProject", error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createSkill = async (newSkill: SkillProps) => {
  const { title, image, isDark } = newSkill;

  try {
    const skill = {
      _type: "skill",
      title,
      image,
      isDark,
    };

    console.log("[createSkill] Preparing to create skill in Sanity");
    const result = await writeClient.create(skill);

    console.log("[createSkill] Skill created successfully", {
      skillId: result._id,
    });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    logError("createSkill", error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateSkill = async (data: SkillProps) => {
  const { id, title, image, isDark } = data;

  try {
    console.log("[updateSkill] Preparing to update skill in Sanity");
    const result = await writeClient
      .patch(id ? id : "")
      .set({
        title,
        image,
        isDark,
      })
      .commit();

    console.log("[updateSkill] Skill updated successfully", {
      skillId: result._id,
    });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    logError("updateSkill", error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createTestimonials = async (
  newTestimonials: TestimonialsProps
) => {
  const { job_title, username, user_message } = newTestimonials;

  try {
    const testimonials = {
      _type: "testimonial",
      job_title,
      username,
      user_message,
    };

    console.log(
      "[createTestimonials] Preparing to create testimonials in Sanity"
    );
    const result = await writeClient.create(testimonials);

    console.log("[createTestimonials] Testimonials created successfully", {
      testimonialsId: result._id,
    });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    logError("createTestimonials", error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const updateTestimonials = async (data: TestimonialsProps) => {
  const { id, job_title, user_message, username } = data;

  try {
    console.log(
      "[updateTestimonials] Preparing to update testimonials in Sanity"
    );
    const result = await writeClient
      .patch(id ? id : "")
      .set({
        job_title,
        user_message,
        username,
      })
      .commit();

    console.log("[updateTestimonials] Testimonials updated successfully", {
      testimonialsId: result._id,
    });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    logError("updateTestimonials", error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

// Check admin status
export const checkAdminStatus = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) return false;

    const isAdmin =
      session.user.email === process.env.OWNER_EMAIL ||
      session.user.email === process.env.ADMIN_TEAM_EMAIL;

    return isAdmin;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
