"use client";

import { useState } from "react";
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
import Logo from "../Logo";
import { filterLinks } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({
  isTestimonials,
  isAdmin,
}: {
  isTestimonials: boolean;
  isAdmin: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-muted/80 transition-colors md:hidden">
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] p-0 border-r shadow-lg backdrop-blur-sm bg-background/95"
      >
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-muted">
          <SheetHeader className="space-y-6 p-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between"
            >
              <SheetTitle>
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex aspect-square size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  >
                    <Logo size="sm" inverse />
                  </motion.div>
                  <div className="grid gap-1">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="font-semibold text-lg tracking-tight"
                    >
                      Amr&apos;s Portfolio
                    </motion.span>
                  </div>
                </div>
              </SheetTitle>
            </motion.div>

            <nav className="space-y-8">
              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-4 rounded-xl bg-muted/50 border shadow-sm"
                >
                  <AdminDropdown />
                </motion.div>
              )}

              <Separator />

              {footerLinks.map((links, id) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + id * 0.1 }}
                >
                  <Accordion
                    type="single"
                    collapsible
                    className="flex flex-col gap-y-2"
                  >
                    <AccordionItem value={`${id}`} className="border-none">
                      <AccordionTrigger className="hover:bg-muted-foreground/30 rounded-lg px-4 py-2.5 font-medium text-primary transition-all hover:pl-6">
                        {links.title}
                      </AccordionTrigger>
                      <AnimatePresence>
                        <div className="space-y-1 pl-4">
                          {filterLinks(links.links, isTestimonials).map(
                            ({ id, name, link }, index) => (
                              <AccordionContent key={id} className="pb-0 pt-1">
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.05,
                                  }}
                                >
                                  <Link
                                    href={link}
                                    className="block text-start rounded-md px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted-foreground/20 hover:text-primary hover:pl-6 transition-all"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {name}
                                  </Link>
                                </motion.div>
                              </AccordionContent>
                            )
                          )}
                        </div>
                      </AnimatePresence>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </nav>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
