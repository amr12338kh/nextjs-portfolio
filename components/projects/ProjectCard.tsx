"use client";

import Link from "next/link";
import { ProjectProps } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { ChevronRight, ExternalLink, Github } from "lucide-react";

const ProjectCard = ({
  project,
  dense = false,
}: {
  project: ProjectProps;
  dense?: boolean;
}) => {
  const imageUrl = project.image
    ? urlFor(project.image).url()
    : "/image-placeholder.png";

  return (
    <div
      className={`group relative flex flex-col bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-muted-foreground hover:shadow-xl ${dense ? "h-full" : ""}`}
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card/80 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-background/80 backdrop-blur-md border border-border rounded-full text-foreground">
            {project.mainCategory}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.skills.map((skill) => (
            <span
              key={skill._id}
              className="text-[10px] font-mono text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10"
            >
              {skill.title}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex gap-3">
            <Link
              href={project.githubLink}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={16} />
            </Link>
            <Link
              href={project.link}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={16} />
            </Link>
          </div>
          <Link
            href={`/projects/${project._id}`}
            className="text-[10px] font-bold uppercase tracking-widest text-primary hover:opacity-70 transition-all inline-flex items-center gap-1"
          >
            View More <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
