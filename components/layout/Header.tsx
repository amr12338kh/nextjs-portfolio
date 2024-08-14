"use client";

import Link from "next/link";
import { ModeToggle } from "../Themes/ModeToggle";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";
import Sidbar from "./Sidbar";
import { lobbylLinks } from "@/data";

const Header = () => {
  return (
    <motion.header
      {...animation}
      className="fixed top-5 w-full max-w-7xl z-40 bg-background/30 saturate-100 shadow-sm backdrop-blur-[10px] rounded-2xl transition-colors"
    >
      <div className="flex justify-between items-center h-14 px-5 md:px-10">
        <Link href="#home">
          <div className="dark:bg-main_white bg-main_black w-9 h-9 bg-no-repeat" />
        </Link>
        <div className="flex gap-8 items-center">
          <ul className="hidden sm:flex gap-10">
            {lobbylLinks.map(({ id, name, link }) => (
              <Link key={id} href={link}>
                <li className="text-muted-foreground hover:text-primary duration-150 font-semibold">
                  {name}
                </li>
              </Link>
            ))}
          </ul>
          <Separator orientation="vertical" className="h-6" />
          <div className="hidden sm:block">
            <ModeToggle />
          </div>
          <div className="sm:hidden">
            <Sidbar />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

const animation = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};
