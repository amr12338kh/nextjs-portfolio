import { cn } from "@/lib/utils";

const TextAmbient = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute size-24 top-[50%] w-[300px] left-[50%] translate-x-[-50%] translate-y-[-50%] inset-0 -z-10 blur-2xl opacity-5",
        className
      )}
    />
  );
};

export default TextAmbient;
