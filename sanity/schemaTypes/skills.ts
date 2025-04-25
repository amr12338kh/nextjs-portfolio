import { defineType } from "sanity";

export const skills = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "isDark",
      title: "Is Dark",
      type: "boolean",
      description: "Indicates whether the skill icon is suited for dark mode.",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
