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
        "bg-no-repeat bg-center",
        className,
        sizes[size],
        inverse
          ? "bg-[url(/svg/main-logo-white.svg)] dark:bg-[url(/svg/main-logo-black.svg)]"
          : "dark:bg-[url(/svg/main-logo-white.svg)] bg-[url(/svg/main-logo-black.svg)]"
      )}
    />
  );
};

export default Logo;
