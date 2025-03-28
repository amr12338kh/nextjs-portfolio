import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const GridItems = ({
  children,
  className,
  title,
  des,
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  des?: string;
  icon?: React.JSX.Element;
}) => {
  return (
    <motion.div
      className={cn(
        "row-span-1 h-[320px] w-full p-4 relative bg-background rounded-2xl overflow-hidden transition-all duration-300 justify-between flex flex-col",
        "shadow-[0_-4px_12px_-10px_rgba(0,0,0,0.06),0_4px_12px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_12px_-10px_rgba(255,255,255,0.03),0_4px_12px_-10px_rgba(255,255,255,0.01)]",
        "hover:shadow-[0_-6px_15px_-8px_rgba(0,0,0,0.08),0_6px_15px_-8px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_-6px_15px_-8px_rgba(255,255,255,0.04),0_6px_15px_-8px_rgba(255,255,255,0.04)]",
        "ring-1 ring-muted/40 hover:ring-muted/60",
        className
      )}
    >
      <div>
        <h1
          className={`font-semibold text-base sm:text-lg ${
            icon && "flex items-center gap-2"
          }`}
        >
          {icon} {title}
        </h1>
        <p className="text-muted-foreground text-sm md:text-xs lg:text-sm max-w-[300px]">
          {des}
        </p>
      </div>
      {children}
    </motion.div>
  );
};

export default GridItems;
