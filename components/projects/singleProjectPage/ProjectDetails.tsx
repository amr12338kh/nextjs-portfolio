import { ProjectProps } from "@/types";
import ProjectLoadingState from "./ProjectLoadingState";
import ProjectOverview from "./ProjectOverview";
import FeaturesList from "./FeaturesList";
import TechnologiesList from "./TechnologiesList";
import ProjectDetailsCard from "./ProjectDetailsCard";
import ImagePreview from "./ImagePreview";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectDetails = ({ project }: { project: ProjectProps }) => {
  if (!project.isActive) {
    return <ProjectLoadingState />;
  }

  return (
    <div className="space-y-5 md:space-y-12">
      <ProjectOverview description={project.description} />

      <section className="flex flex-col lg:flex-row gap-5">
        <FeaturesList features={project.features} />

        <div className="flex flex-col gap-5 lg:flex-1 w-full">
          <TechnologiesList skills={project.skills} />
          <ProjectDetailsCard
            createdAt={project.createdAt}
            isSolo={project.isSoloProject}
            releases={project.releases}
          />
        </div>
      </section>

      <ImagePreview project={project} />
    </div>
  );
};

interface HeaderTitleProps {
  title: string;
  icon: LucideIcon;
  className?: string;
}

export const HeaderTitle = ({
  title,
  icon: Icon,
  className,
}: HeaderTitleProps) => (
  <h2
    className={cn(
      "text-lg lg:text-xl font-semibold mb-4 flex items-center pb-3 border-b border-border/50",
      className
    )}
  >
    <span className="bg-primary/10 p-2 rounded-full mr-3" aria-hidden="true">
      <Icon className="h-5 w-5 text-primary" />
    </span>
    {title}
  </h2>
);

export default ProjectDetails;
