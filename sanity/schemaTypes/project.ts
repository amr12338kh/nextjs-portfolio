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
      type: "image",
      options: {
        hotspot: true,
      },
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
          to: [{ type: "skill" }],
        },
      ],
    }),
    defineField({
      name: "githubLink",
      title: "GitHub Link",
      type: "url",
    }),
    defineField({
      name: "isSoloProject",
      title: "Is Solo Project",
      type: "boolean",
    }),
    defineField({
      name: "releases",
      title: "Releases",
      type: "number",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
