"use client";

import { ProjectProps } from "@/types";
import ProjectLoadingState from "./ProjectLoadingState";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  Layers,
  Tag,
  User,
  Users,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { ModeToggle } from "@/components/Themes/ModeToggle";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Section from "@/components/Section";
import { Button } from "../ui/button";

const ProjectDetails = ({ project }: { project: ProjectProps }) => {
  return (
    <Section className="pt-0!">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border sm:px-5 py-4">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Home
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <Link
              href="/projects"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Projects
            </Link>
            <div className="h-4 w-px bg-border hidden sm:block"></div>
            <ModeToggle />
          </div>

          <div className="flex items-center gap-3">
            <Button
              disabled={!project.githubLink || !project.isActive}
              className="py-2 px-3 rounded-lg border border-border cursor-pointer"
              variant="secondary"
            >
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </Link>
            </Button>

            <Button
              className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg text-sm font-bold"
              disabled={!project.link || !project.isActive}
            >
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3"
              >
                <ExternalLink size={18} />{" "}
                <span className="hidden sm:block">Live Demo</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {!project.isActive ? (
        <div className="pt-12">
          <ProjectLoadingState />
        </div>
      ) : (
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
              <img
                src={
                  project.image
                    ? urlFor(project.image).url()
                    : "/image-placeholder.png"
                }
                alt={project.title}
                className="w-full h-auto"
              />
            </div>
            <section className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                  <Calendar size={14} />{" "}
                  {formatDate(project.createdAt || "", { day: false })}
                </span>
                <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                  {project.isSoloProject ? (
                    <User size={14} />
                  ) : (
                    <Users size={14} />
                  )}
                  {project.isSoloProject
                    ? "Solo Project"
                    : "Collaborative Project"}
                </span>
                <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
                  <Tag size={14} /> {project.tagline}
                </span>
              </div>
              <p className="text-muted-foreground sm:text-md md:text-lg leading-relaxed">
                {project.description}
              </p>
            </section>

            <section className="space-y-6 p-8 rounded-3xl border border-border">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Code2 /> Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground bg-muted p-4 rounded-xl"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-emerald-500 mt-0.5 shrink-0"
                    />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24 lg:h-fit">
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Layers className="text-primary" size={20} /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill._id}
                    className="px-3 py-1.5 bg-muted border border-border rounded-lg text-xs text-muted-foreground"
                  >
                    {skill.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-600/7 to-emerald-600/7 dark:from-blue-700/7 dark:to-emerald-700/7 border border-blue-500/13 dark:border-blue-600/13 rounded-2xl p-8 space-y-6">
              <h3 className="text-lg font-bold">Interested in the code?</h3>
              <p className="text-sm text-muted-foreground">
                Feel free to explore the repository or contact me for more
                information about the architecture.
              </p>
              <div className="space-y-3">
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
                >
                  <Github size={18} /> View on GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default ProjectDetails;
