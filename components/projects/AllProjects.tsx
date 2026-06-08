"use client";

import { ArrowLeft, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import { ProjectProps } from "@/types";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AnimatedTitle from "../AnimatedTitle";
import UnderLine from "../UnderLine";
import Section from "../Section";
import { ModeToggle } from "../Themes/ModeToggle";

const CATEGORIES = [
  "All",
  "Front-End",
  "Personal",
  "Collaborative",
  "Coming Soon",
];

const AllProjects = ({ projects }: { projects: ProjectProps[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().replace(" ", "-").trim();
    const normalizedCategory = activeCategory
      .toLowerCase()
      .replace(" ", "-")
      .trim();

    return projects.filter((p) => {
      const matchesSearch =
        !normalizedQuery ||
        p.title.toLowerCase().includes(normalizedQuery) ||
        p.skills.some((t) =>
          t?.title?.toLowerCase().includes(normalizedQuery),
        ) ||
        p.categories?.some((cat) =>
          cat.toLowerCase().replace(" ", "-").trim().includes(normalizedQuery),
        );

      const matchesCategory =
        activeCategory === "All" ||
        p.categories?.some((cat) =>
          cat
            .toLowerCase()
            .replace(" ", "-")
            .trim()
            .includes(normalizedCategory),
        );

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <Section className="pt-0!">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border sm:px-5 py-4">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>
          <ModeToggle />
        </div>
      </div>

      <div className="mb-16 pt-12">
        <AnimatedTitle
          title="Project Archive"
          subtitle="A full showcase of my technical explorations and collaborative ventures."
        />
        <UnderLine lineClassName="mx-0!" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Search title, categories, or technologies..."
            className="w-full rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <Button
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border cursor-pointer ${activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground"}`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-fr">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} dense={true} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground">
          <Search size={48} className="mx-auto mb-4" />
          <p>No results for your search.</p>
        </div>
      )}
    </Section>
  );
};

export default AllProjects;
