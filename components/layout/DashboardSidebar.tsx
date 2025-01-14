"use client";

import * as React from "react";
import { Edit, Home, LayoutDashboard, PackagePlus } from "lucide-react";

import { NavMain } from "@/components/layout/NavMain";
import { NavLatestItems } from "@/components/layout/NavLatestItems";
import { NavUser } from "@/components/layout/NavUser";
import { AdminHeader } from "@/components/layout/AdminHeader";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../Themes/ModeToggle";
import { DashboardSidebarProps } from "@/types";
import NavQuickLinks from "./NavQuickLinks";

export function DashboardSidebar({
  user,
  latestModels,
  ...props
}: DashboardSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AdminHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavLatestItems latestModels={latestModels} />
        <NavQuickLinks items={data.quickLinks} />
      </SidebarContent>
      <SidebarFooter>
        <div className=" text-center">
          <ModeToggle />
        </div>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

const data = {
  navMain: [
    {
      title: "Models",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [
        {
          title: "All Models",
          url: "/dashboard",
        },
        {
          title: "Projects Models",
          url: "/dashboard/projects",
        },
        {
          title: "Skills Models",
          url: "/dashboard/skills",
        },
        {
          title: "Testimonials Models",
          url: "/dashboard/testimonials",
        },
      ],
    },
    {
      title: "Create",
      url: "/create",
      icon: PackagePlus,
      items: [
        {
          title: "Create",
          url: "/dashboard/create",
        },
        {
          title: "Create Project",
          url: "/dashboard/create/project",
        },
        {
          title: "Create Skill",
          url: "/dashboard/create/skill",
        },
        {
          title: "Create Testimonial",
          url: "/dashboard/create/testimonial",
        },
      ],
    },
  ],
  quickLinks: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
  ],
};
