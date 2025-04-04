import { cn } from "@/lib/utils";

const Section = ({
  children,
  variant = "primary",
  className,
  id,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  id?: string;
}) => {
  return (
    <section
      id={id}
      className={cn(
        variant === "primary" ? "py-16 sm:py-24" : "py-24 sm:py-32",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
