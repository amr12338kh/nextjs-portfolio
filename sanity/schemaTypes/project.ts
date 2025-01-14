import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "url",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
    }),
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "skill" }], // Assuming SkillsItemsProps corresponds to a "skill" document
        },
      ],
    }),
    defineField({
      name: "githubLink",
      title: "GitHub Link",
      type: "url",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "url",
            },
            {
              name: "text",
              title: "Text",
              type: "text",
            },
            {
              name: "subText",
              title: "Sub Text",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
