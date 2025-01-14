import z from "zod";

const skillSchema = z.object({
  _id: z.string().nonempty("Skill ID is required."),
  title: z.string().nonempty("Skill title is required."),
  image: z.string().url("Invalid URL for skill image."),
  isDark: z.boolean().nullable(),
});

export const sectionSchema = z.object({
  text: z.string().nonempty("Section title is required."),
  subText: z.string().nonempty("Section subtext is required."),
  image: z.string().url("Invalid URL for section image."),
});

export const newProjectSchema = z.object({
  title: z.string().nonempty("Title is required."),
  tagline: z.string().nonempty("Tagline is required."),
  description: z.string().nonempty("Description is required."),
  image: z.string().url("Invalid URL for image.").nonempty("Image is required"),
  link: z
    .string()
    .url("Invalid URL for project link.")
    .nonempty("Link is required"),
  githubLink: z
    .string()
    .url("Invalid URL for GitHub link.")
    .nonempty("Github link is required"),
  skills: z.array(skillSchema).optional(),
  sections: z.array(sectionSchema).optional(),
});

export const newSkillSchema = z.object({
  title: z.string().nonempty("Title is required."),
  image: z.string().url("Invalid URL for image.").nonempty("Image is required"),
  isDark: z.boolean().default(false).optional(),
});

export const newTestimonialSchema = z.object({
  job_title: z.string().nonempty("Title is required."),
  image: z.string().url("Invalid URL for image.").optional(),
  username: z.string().nonempty("Username is required."),
  user_message: z.string().nonempty("User message is required."),
});
