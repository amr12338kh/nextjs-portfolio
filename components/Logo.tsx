import { cn } from "@/lib/utils";

const Logo = ({
  className,
  size = "default",
  inverse = false,
}: {
  className?: string;
  size?: "big" | "default" | "sm";
  inverse?: boolean;
}) => {
  const sizes = {
    big: "w-12 h-12",
    default: "w-9 h-9",
    sm: "w-5 h-5",
  };

  return (
    <div
      className={cn(
        "bg-no-repeat",
        className,
        sizes[size],
        inverse
          ? "bg-main_white dark:bg-main_black"
          : "dark:bg-main_white bg-main_black"
      )}
    />
  );
};

export default Logo;
