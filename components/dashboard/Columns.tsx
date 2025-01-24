import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { TableDataProps } from "@/types";
import { useState } from "react";
import ItemDropdownMenu from "../ItemDropdownMenu";

// Common columns that appear in all tables at the start
const StartCommonColumns: ColumnDef<TableDataProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

// Common columns that appear in all tables at the end
const EndCommonColumns: ColumnDef<TableDataProps>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => (
      <div className="lowercase line-clamp-1">
        {String(row.getValue("_id"))}
      </div>
    ),
  },
  {
    accessorKey: "_createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">
        {formatDate(String(row.getValue("_createdAt"))) ?? "N/A"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: function Row({ row }) {
      const model = row.original;
      const [open, setOpen] = useState(false);

      return (
        <ItemDropdownMenu
          _id={model._id || ""}
          title={model.title}
          open={open}
          setOpen={setOpen}
          type={model._type}
        />
      );
    },
  },
];

const ProjectColumns: ColumnDef<TableDataProps>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div>
        <img
          src={row.getValue("image")}
          alt="image"
          className="object-contain w-10 h-10"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
];

// Skill-specific columns
const SkillColumns: ColumnDef<TableDataProps>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div>
        <img
          src={row.getValue("image")}
          alt="image"
          className={`object-contain w-10 h-10 ${row.original.isDark && "dark:invert"}`}
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "isDark",
    header: "Dark Mode",
    cell: ({ row }) => <div>{row.getValue("isDark") ? "Yes" : "No"}</div>,
  },
];

// Testimonial-specific columns
const TestimonialColumns: ColumnDef<TableDataProps>[] = [
  {
    accessorKey: "username",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "job_title",
    header: "Job Title",
    cell: ({ row }) => <div>{row.getValue("job_title")}</div>,
  },
];

export const getColumns = (type: string): ColumnDef<TableDataProps>[] => {
  let typeSpecificColumns: ColumnDef<TableDataProps>[] = [];

  switch (type) {
    case "project":
      typeSpecificColumns = ProjectColumns;
      break;
    case "skill":
      typeSpecificColumns = SkillColumns;
      break;
    case "testimonial":
      typeSpecificColumns = TestimonialColumns;
      break;
    default:
      typeSpecificColumns = ProjectColumns;
  }

  // Combine columns in the desired order
  return [...StartCommonColumns, ...typeSpecificColumns, ...EndCommonColumns];
};
