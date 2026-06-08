import { ChevronLeft, Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const ProjectLoadingState = ({
  message = "Still are Working on it...",
}: {
  message?: string;
}) => (
  <div
    className="flex flex-col justify-center items-center min-h-[50vh] text-center space-y-12"
    role="status"
  >
    <div className="flex flex-col items-center">
      <Loader
        className="animate-spin text-primary w-8 h-8 mb-8"
        aria-hidden="true"
      />
      <h2 className="text-2xl font-semibold mb-2">{message}</h2>
      <p className="text-muted-foreground text-sm max-w-md sm:max-w-xs">
        Stay tuned! We&apos;re crafting something awesome here. Check back
        shortly.
      </p>
    </div>

    <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
      <Link href="/">
        <Button className="cursor-pointer group" size="sm">
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Home
        </Button>
      </Link>

      <Link href="/projects">
        <Button variant="outline" className="cursor-pointer group" size="sm">
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to Projects
        </Button>
      </Link>
    </div>
  </div>
);

export default ProjectLoadingState;
