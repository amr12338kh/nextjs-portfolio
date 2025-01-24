"use client";

import { MoreHorizontal, Trash2, Edit, Copy } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuAction, useSidebar } from "@/components/ui/sidebar";
import { DeleteAlert } from "./dashboard/DeleteAlert";
import { ItemDropdownMenuProps } from "@/types";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

const ItemDropdownMenu = ({
  _id,
  type,
  title,
  open,
  setOpen,
  className,
  isSidebar = false,
}: ItemDropdownMenuProps) => {
  const { isMobile } = useSidebar();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isSidebar ? (
          <SidebarMenuAction showOnHover>
            <MoreHorizontal className="size-4" />
          </SidebarMenuAction>
        ) : (
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-48", className)}
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "end" : "start"}
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Link href={`/dashboard/edit/${type}/${_id}`}>
          <DropdownMenuItem>
            <Edit className="mr-2 size-4" />
            <span>Edit Item</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(_id)}>
          <Copy className="mr-2 size-4" />
          <span>Copy ID</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onSelect={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <Trash2 className="mr-2 size-4" />
          <span>Delete</span>
        </DropdownMenuItem>
        <DeleteAlert
          modelId={_id}
          modelName={title}
          open={open}
          setOpen={setOpen}
          onDeleteComplete={() => router.refresh()}
          isSingle
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ItemDropdownMenu;
