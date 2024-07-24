"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@tszhong0411/ui";
import { AlignRight } from "lucide-react";
import { ModeToggle } from "../Themes/ModeToggle";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { footerLinks } from "@/data";

const Sidbar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignRight />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Link href="#home">
              <div className="dark:bg-main_white bg-main_black w-9 h-9 bg-no-repeat" />
            </Link>
          </SheetTitle>
          <Separator orientation="horizontal" />
          <SheetDescription className="">
            {footerLinks.map((links, id) => (
              <Accordion
                type="single"
                collapsible
                key={id}
                className=" flex flex-col gap-y-3"
              >
                <AccordionItem value={`${id}`}>
                  <AccordionTrigger className="font-semibold text-primary">
                    {links.title}
                  </AccordionTrigger>
                  {links.links.map(({ id, name, link }) => (
                    <AccordionContent
                      key={id}
                      className=" text-muted-foreground text-start "
                    >
                      <Link
                        href={link}
                        className="hover:text-primary duration-200"
                      >
                        {name}
                      </Link>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
            ))}
            <div>
              <Separator orientation="horizontal" className="mb-5" />
              <div>
                <ModeToggle />
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidbar;
