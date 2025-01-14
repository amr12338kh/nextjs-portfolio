import { type SchemaTypeDefinition } from "sanity";
import { project } from "./project";
import { skills } from "./skills";
import { testimonial } from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, skills, testimonial],
};
