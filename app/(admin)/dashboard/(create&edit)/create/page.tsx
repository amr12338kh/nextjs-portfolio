import Link from "next/link";
import { FileCode, Cpu, MessageSquare } from "lucide-react";

const items = [
  {
    title: "Project",
    description: "Create a new project to showcase your work",
    icon: FileCode,
    href: "/dashboard/create/project",
  },
  {
    title: "Skill",
    description: "Add new skills to your portfolio",
    icon: Cpu,
    href: "/dashboard/create/skill",
  },
  {
    title: "Testimonial",
    description: "Add client testimonials and feedback",
    icon: MessageSquare,
    href: "/dashboard/create/testimonial",
  },
];

const page = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {items.map((item, index) => (
          <div key={index}>
            <Link
              href={item.href}
              className="group flex flex-col items-center gap-4 rounded-xl border bg-card p-8 text-center shadow-sm transition-all hover:scale-105 hover:shadow-lg hover:border-primary"
            >
              <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="size-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">
                  Create {item.title}s
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
