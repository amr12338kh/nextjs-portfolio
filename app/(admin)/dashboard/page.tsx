import { DataTable } from "@/components/dashboard/AllModelsTable";
import { Separator } from "@/components/ui/separator";
import { client } from "@/sanity/lib/client";
import {
  ALL_PROJECTS_QUERY,
  ALL_SKILLS_QUERY,
  ALL_TESTIMONIALS_QUERY,
} from "@/sanity/lib/queries";
import { FiInbox } from "react-icons/fi"; // Add this for icons

export default async function Page() {
  const [projects, skills, testimonials] = await Promise.all([
    client.fetch(ALL_PROJECTS_QUERY),
    client.fetch(ALL_SKILLS_QUERY),
    client.fetch(ALL_TESTIMONIALS_QUERY),
  ]);

  const pageSize = 5;

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">All Models</h1>
      <div>
        <Separator className="my-5" />
        <h2 className="text-2xl font-semibold text-primary/90">Projects</h2>
        {projects.length > 0 ? (
          <DataTable data={projects} pageSize={pageSize} type="project" />
        ) : (
          <NotAvailable value="Projects" />
        )}
      </div>
      <div>
        <Separator className="my-5" />
        <h2 className="text-2xl font-semibold text-primary/90">Skills</h2>
        {skills.length > 0 ? (
          <DataTable data={skills} pageSize={pageSize} type="skill" />
        ) : (
          <NotAvailable value="Skills" />
        )}
      </div>
      <div>
        <Separator className="my-5" />
        <h2 className="text-2xl font-semibold text-primary/90">Testimonials</h2>
        {testimonials.length > 0 ? (
          <DataTable
            data={testimonials}
            pageSize={pageSize}
            type="testimonial"
          />
        ) : (
          <NotAvailable value="Testimonials" />
        )}
      </div>
    </div>
  );
}

export const NotAvailable = ({ value }: { value: string }) => (
  <div className="flex flex-col items-center my-5 p-8 rounded-lg text-gray-500 bg-muted/80">
    <FiInbox className="size-12" />
    <p className="text-lg mt-4">No {value} available at the moment.</p>
  </div>
);
