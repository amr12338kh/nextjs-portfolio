import { cn } from "@/lib/utils";
import { ProjectProps } from "@/types";

const ProjectDetails = ({ project }: { project: ProjectProps }) => {
  return (
    <div>
      <div
        className={cn(
          "text-lg font-semibold text-foreground/80 mb-4",
          "flex items-center justify-between",
          "pb-2 border-b border-muted-foreground/20",
          "tracking-tight"
        )}
      >
        <span className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] bg-primary/50 rounded-full" />
          <span>Project Overview</span>
        </span>
        <span className="text-xs font-normal text-muted-foreground/70">
          Project Details
        </span>
      </div>
      <div
        className={cn(
          "text-base sm:text-[15px] leading-relaxed text-foreground/70",
          "tracking-wide selection:bg-primary/20 selection:text-primary",
          "max-w-6xl mx-auto",
          "relative",
          "before:absolute before:-left-1 sm:before:-left-4 before:top-0 before:bottom-0 before:w-[3px] before:bg-primary/20",
          "pl-4"
        )}
      >
        <p>{project.description}</p>
        <div className="mt-4 pt-4 border-t border-muted-foreground/10">
          <div className="flex sm:items-center gap-2 text-sm">
            <span className="font-medium text-foreground/70">
              Technologies:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {project.skills
                .sort((a: any, b: any) => a.title.localeCompare(b.title))
                .map((skill: any) => (
                  <span
                    key={skill.title}
                    className={cn(
                      "px-2 py-1 rounded-md text-xs",
                      "bg-muted/50 text-muted-foreground",
                      "border border-muted-foreground/20",
                      "inline-flex items-center gap-1"
                    )}
                  >
                    {skill.title}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
