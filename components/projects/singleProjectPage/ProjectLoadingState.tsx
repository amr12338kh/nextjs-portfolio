import { Loader } from "lucide-react";

const ProjectLoadingState = ({
  message = "Still are Working on it...",
}: {
  message?: string;
}) => (
  <div
    className="flex flex-col justify-center items-center min-h-[50vh] text-center space-y-4"
    role="status"
  >
    <Loader className="animate-spin text-primary w-8 h-8" aria-hidden="true" />
    <h2 className="text-2xl font-semibold">{message}</h2>
    <p className="text-muted-foreground text-sm max-w-md">
      Stay tuned! We&apos;re crafting something awesome here. Check back
      shortly.
    </p>
  </div>
);

export default ProjectLoadingState;
