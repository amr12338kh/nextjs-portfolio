export const ALL_PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)] | order(_createdAt desc)
  {
    _id,
    _type,
    title,
    slug,
    image,
    _createdAt,
    sections[]{
      _key,
      image,
      text,
      subText
    },
    "skills": skills[]->{
      _id,
      title,
      image,
      isDark
    },
  }`;

export const PROJECT_QUERY = `*[_type == "project" && defined(slug.current) && _id == $id][0]
  {
    _id,
    title,
    slug,
    tagline,
    image,
    link,
    description,
    "skills": skills[]->{
      _id,
      title,
      image,
      isDark
    },
    githubLink,
    sections[]{
      _key,
      image,
      text,
      subText
    }
  }`;

export const LATEST_PROJECT_QUERY = `*[_type == "project" && defined(slug.current)] | order(_createdAt desc)[0]
  {
    _id,
    title,
    slug,
    image,
    _createdAt,
    tagline,
    description,
    link
  }`;

export const ALL_SKILLS_QUERY = `*[_type == "skill"]
  {
    _id,
    _type,
    _createdAt,
    title,
    image,
    isDark,
  }`;

export const SKILL_QUERY = `*[_type == "skill" && _id == $id][0]
  {
    _id,
    _type,
    _createdAt,
    title,
    image,
    isDark,
  }`;

export const LATEST_SKILL_QUERY = `*[_type == "skill"] | order(_createdAt desc)[0]
  {
    _id,
    _type,
    _createdAt,
    title,
    image,
    isDark,
  }`;

export const ALL_TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc) 
{
  _id,
  _type,
  _createdAt,
  username,
  job_title,
  user_message
}
`;

export const TESTIMONIAL_QUERY = `*[_type == "testimonial" && _id == $id][0]
{
  _id,
  _type,
  _createdAt,
  username,
  job_title,
  user_message
}
`;

export const LATEST_TESTIMONIAL_QUERY = `*[_type == "testimonial"]| order(_createdAt desc)
{
  _id,
  _type,
  _createdAt,
  username,
  job_title,
  user_message
}
`;

export const ALL_LATEST_ITEMS_QUERY = `{
  "latestProject": *[_type == "project" && defined(slug.current)] | order(_createdAt desc)[0] {
    _id,
    title,
    slug,
    image,
    _createdAt,
    tagline,
    description,
    link
  },
  "latestSkill": *[_type == "skill"] | order(_createdAt desc)[0] {
    _id,
    title,
    image,
    isDark,
    _createdAt
  },
  "latestTestimonial": *[_type == "testimonial"] | order(_createdAt desc)[0] {
    _id,
    username,
    job_title,
    user_message,
    _createdAt
  }
}`;
