import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

const ProjectOverview = ({ description }: { description: string }) => (
  <section className="mb-8 md:mb-0">
    <div
      className={cn(
        "text-xl font-semibold text-foreground/90 mb-6",
        "pb-3 border-b border-border/50",
        "tracking-tight"
      )}
    >
      <span className="flex items-center gap-3">
        <span className="relative" aria-hidden="true">
          <Circle className="w-4 h-4 text-primary/30" />
          <Circle className="w-4 h-4 text-primary absolute inset-0 animate-ping" />
        </span>
        <span>Project Overview</span>
      </span>
    </div>

    <div
      className={cn(
        "text-base sm:text-[15px] leading-relaxed text-foreground/80",
        "tracking-wide selection:bg-primary/20 selection:text-primary",
        "relative pl-5",
        "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-gradient-to-b before:from-primary/50 before:to-primary/5 before:rounded-full"
      )}
    >
      <p className="prose prose-sm prose-gray">{description}</p>
    </div>
  </section>
);

export default ProjectOverview;
