import SkillBadge from "@/components/SkillBadge";
import { Cpu, LucideIcon } from "lucide-react";
import { HeaderTitle } from "./ProjectDetails";
import { Skill } from "@/sanity/types";

const TechnologiesList = ({ skills }: { skills: Skill[] }) => (
  <section className="rounded-xl bg-card p-6 border border-border/80 shadow-sm h-auto">
    <HeaderTitle title="Technologies Used" icon={Cpu} />

    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillBadge key={skill.title} title={skill.title || "Unknown Skill"} />
      ))}
    </div>
  </section>
);

export default TechnologiesList;
