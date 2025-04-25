import { CheckCircle, Code } from "lucide-react";
import { HeaderTitle } from "./ProjectDetails";

const FeaturesList = ({ features }: { features: string[] }) => (
  <section className="rounded-xl bg-card p-6 border border-border/80 shadow-sm lg:flex-[2] w-full">
    <HeaderTitle title="Key Features" icon={Code} />

    <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {features.map((feature, index) => (
        <FeatureItem key={index} feature={feature} />
      ))}
    </ul>
  </section>
);

const FeatureItem = ({ feature }: { feature: string }) => (
  <li
    className="flex items-start gap-3 p-4 rounded-lg border border-border/50 
      bg-gradient-to-r from-transparent to-accent/5 hover:to-accent/20 
      hover:border-primary/30 transition-all duration-300 group"
  >
    <CheckCircle
      className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
      aria-hidden="true"
    />
    <span className="text-foreground/80 group-hover:text-foreground transition-colors">
      {feature}
    </span>
  </li>
);

export default FeaturesList;
