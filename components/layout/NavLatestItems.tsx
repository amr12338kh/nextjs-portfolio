"use client";

import { FileCode, Cpu, MessageSquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { DashboardSidebarProps } from "@/types";
import Link from "next/link";
import { useState } from "react";
import ItemDropdownMenu from "../ItemDropdownMenu";

export function NavLatestItems({ latestModels }: DashboardSidebarProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recent Items</SidebarGroupLabel>
      <SidebarMenu>
        {latestModels?.latestProject && (
          <>
            <Item
              _id={latestModels.latestProject._id}
              title={latestModels.latestProject.title || ""}
              url={`/dashboard/edit/project/${latestModels.latestProject._id}`}
              type="project"
            />
            <SidebarSeparator />
          </>
        )}
        {latestModels?.latestSkill && (
          <Item
            _id={latestModels.latestSkill._id}
            title={latestModels.latestSkill.title || ""}
            url={`/dashboard/edit/skill/${latestModels.latestSkill._id}`}
            type="skill"
          />
        )}
        {latestModels?.latestTestimonial && (
          <>
            <SidebarSeparator />
            <Item
              _id={latestModels.latestTestimonial._id || ""}
              title={latestModels.latestTestimonial.username}
              url={`/dashboard/edit/testimonial/${latestModels.latestTestimonial._id}`}
              type="testimonial"
            />
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

interface ItemProps {
  _id: string;
  title: string;
  url: string;
  icon?: JSX.IntrinsicAttributes;
  type: "project" | "skill" | "testimonial";
}

const getItemIcon = (type: string) => {
  switch (type) {
    case "project":
      return <FileCode className="size-4" />;
    case "skill":
      return <Cpu className="size-4" />;
    case "testimonial":
      return <MessageSquare className="size-4" />;
    default:
      return null;
  }
};

const Item: React.FC<ItemProps> = ({ title, _id, url, type }) => {
  const [open, setOpen] = useState(false);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="group capitalize"
        tooltip={`Edit ${title} ${type}`}
      >
        <Link href={url} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {getItemIcon(type)}
            <span className="truncate">{title}</span>
          </div>
          {type && (
            <Badge variant="outline" className="ml-auto text-xs capitalize">
              {type}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>

      <ItemDropdownMenu
        _id={_id}
        title={title}
        open={open}
        setOpen={setOpen}
        type={type}
        isSidebar
      />
    </SidebarMenuItem>
  );
};
