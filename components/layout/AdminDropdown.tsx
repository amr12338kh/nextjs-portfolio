import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, UserCog2Icon } from "lucide-react";
import Link from "next/link";

const AdminDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <UserCog2Icon className="size-4" /> Admin
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard">
          <DropdownMenuItem>
            <LayoutDashboard className=" size-4 mr-2" /> Dashboard
          </DropdownMenuItem>
        </Link>
        <Link href="/signout">
          <DropdownMenuItem>
            <LogOut className=" size-4 mr-2" /> Sign Out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminDropdown;
