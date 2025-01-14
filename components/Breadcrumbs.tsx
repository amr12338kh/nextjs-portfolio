"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

// Add this mapping object at the top of the file
const pathMap: Record<string, string> = {
  dashboard: "Dashboard",
  create: "Create",
  project: "Project",
  skill: "Skill",
  testimonial: "Testimonial",
  edit: "Edit",
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList aria-label="breadcrumb">
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <Fragment key={`${segment}-${index}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">
                    {pathMap[segment] || segment}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink className="capitalize" href={href}>
                    {pathMap[segment] || segment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
