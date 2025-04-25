import { ProjectDetailsCardProps } from "@/types";
import { HeaderTitle } from "./ProjectDetails";
import {
  Calendar,
  GitBranch,
  LucideIcon,
  ReceiptText,
  User,
  Users,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const ProjectDetailsCard = ({
  createdAt,
  isSolo,
  releases,
}: ProjectDetailsCardProps) => (
  <section className="space-y-4 rounded-xl bg-card p-6 border border-border/80 shadow-sm h-auto">
    <HeaderTitle title="Project Details" icon={ReceiptText} />
    <DetailItem
      icon={Calendar}
      text={createdAt ? formatDate(createdAt) : "Unknown Date"}
    />
    <DetailItem
      icon={isSolo ? User : Users}
      text={isSolo ? "Solo Project" : "Team Project"}
    />
    <DetailItem
      icon={GitBranch}
      text={`${releases} Release${releases > 1 ? "s" : ""}`}
    />
  </section>
);

const DetailItem = ({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) => (
  <div className="flex items-center gap-2">
    <span className="bg-primary/10 p-2 rounded-full" aria-hidden="true">
      <Icon className="size-4 text-muted-foreground" />
    </span>
    <span className="text-sm sm:text-base">{text}</span>
  </div>
);

export default ProjectDetailsCard;
