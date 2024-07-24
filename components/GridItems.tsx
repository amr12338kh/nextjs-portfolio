import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "row-span-1 h-[320px] w-full p-4 relative bg-background rounded-2xl overflow-hidden transition duration-200 justify-between flex flex-col border border-black/[0.1] dark:border-white/[0.1]",
        className
      )}
    >
      <div className="">
        <h1
          className={`font-semibold text-base sm:text-lg ${
            icon && "flex items-center gap-2"
          }`}
        >
          {icon} {title}
        </h1>
        <p className=" text-muted-foreground text-sm md:text-xs lg:text-sm max-w-[300px]">
          {des}
        </p>
      </div>
      {children}
    </div>
  );
};

export default GridItems;
