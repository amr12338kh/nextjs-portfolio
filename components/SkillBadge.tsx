import { cn } from "@/lib/utils";

const SkillBadge = ({ title }: { title: string }) => (
  <span
    className={cn(
      "px-2 sm:px-4 py-1 sm:py-2 rounded-full text-sm font-medium",
      "bg-primary/5 text-primary hover:bg-primary/15",
      "border border-primary/20",
      "transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5"
    )}
  >
    {title}
  </span>
);

export default SkillBadge;
