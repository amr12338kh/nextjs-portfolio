import { defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    {
      name: "username",
      title: "Username",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "job_title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "user_message",
      title: "User Message",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "username",
    },
  },
});
