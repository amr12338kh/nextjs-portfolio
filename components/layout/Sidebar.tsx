"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { footerLinks } from "@/data";
import AdminDropdown from "./AdminDropdown";
import { Button } from "../ui/button";
import Logo from "../Logo";

const Sidebar = ({
  isTestimonials,
  isAdmin,
}: {
  isTestimonials: boolean;
  isAdmin: boolean;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader className="space-y-6">
          <div className="flex items-center justify-between">
            <SheetTitle>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Logo size="sm" inverse />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-semibold text-base">
                    Amr's Portfolio
                  </span>
                </div>
              </div>
            </SheetTitle>
          </div>

          <nav className="space-y-6">
            {isAdmin && (
              <div className="p-4 rounded-lg bg-muted/50">
                <AdminDropdown />
              </div>
            )}

            <Separator orientation="horizontal" />

            {footerLinks.map((links, id) => (
              <Accordion
                type="single"
                collapsible
                key={id}
                className="flex flex-col gap-y-3"
              >
                <AccordionItem value={`${id}`} className="border-none">
                  <AccordionTrigger className="hover:bg-muted/50 rounded-lg px-4 py-2 font-semibold text-primary transition-colors">
                    {links.title}
                  </AccordionTrigger>
                  <div className="space-y-1 px-4">
                    {links.links
                      .filter(
                        (link) =>
                          !isTestimonials && link.name !== "Testimonials"
                      )
                      .map(({ id, name, link }) => (
                        <AccordionContent key={id} className="pb-0 pt-1">
                          <Link
                            href={link}
                            className="block rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            {name}
                          </Link>
                        </AccordionContent>
                      ))}
                  </div>
                </AccordionItem>
              </Accordion>
            ))}
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
