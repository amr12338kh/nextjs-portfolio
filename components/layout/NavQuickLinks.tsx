import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

const NavQuickLinks = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(({ title, icon, url }, index) => (
          <Link href={url} key={index}>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={title}>
                {React.createElement(icon)} {title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavQuickLinks;
