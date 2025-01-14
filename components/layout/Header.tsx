"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../Themes/ModeToggle";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { headerLinks } from "@/data";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import AdminDropdown from "./AdminDropdown";
import { checkAdminStatus } from "@/lib/actions";
import Logo from "../Logo";

const Header = ({
  session,
  isTestimonials,
}: {
  session?: Session;
  isTestimonials: boolean;
}) => {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const fetchAdminStatus = async () => {
        const isAdmin = await checkAdminStatus();
        setIsAdmin(isAdmin);
      };

      fetchAdminStatus();
    }
  }, [session]);

  useEffect(() => {
    setActiveHash(window.location.hash);

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleLinkClick = (targetHash: string) => {
    setActiveHash(targetHash);
  };

  return (
    <motion.header
      {...animation}
      className="fixed top-5 w-full max-w-7xl z-40 bg-background/30 saturate-100 shadow-sm backdrop-blur-[10px] rounded-2xl transition-colors"
    >
      <div className="flex justify-between items-center h-14 px-5 md:px-10">
        <Link href="/#home" onClick={() => handleLinkClick("#home")}>
          <Logo />
        </Link>
        <div className="flex gap-8 items-center">
          <ul className="hidden sm:flex gap-10">
            {headerLinks
              .filter((link) => !isTestimonials && link.name !== "Testimonials")
              .map(({ id, name, link }) => {
                const hashPart = link.includes("#")
                  ? `#${link.split("#")[1]}`
                  : "";

                return (
                  <Link
                    key={id}
                    href={link}
                    className="relative"
                    onClick={() => handleLinkClick(hashPart)}
                  >
                    <li
                      className={`text-muted-foreground hover:text-primary duration-150 font-semibold ${
                        activeHash === hashPart &&
                        pathname === "/" &&
                        "text-primary"
                      }`}
                    >
                      {name}
                    </li>
                    {activeHash === hashPart && pathname === "/" && (
                      <>
                        <div className="absolute -bottom-[16px] left-1/2 size-3 -translate-x-1/2 rounded-[4px] bg-[rgb(255_122_151)] blur dark:blur-[10px] dark:bg-[rgb(223_29_72)]" />
                        <div className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 w-[30px] h-[0.5px] bg-[rgb(255_122_151)] blur-[1px] dark:bg-[rgb(223_29_72)]" />
                      </>
                    )}
                  </Link>
                );
              })}
          </ul>
          {isAdmin && (
            <>
              <Separator
                orientation="vertical"
                className="h-6 hidden sm:block"
              />
              <div className=" hidden sm:block">
                <AdminDropdown />
              </div>
            </>
          )}
          <Separator orientation="vertical" className="h-6 hidden sm:block" />
          <div>
            <ModeToggle />
          </div>
          <Separator orientation="vertical" className="h-6 sm:hidden" />
          <div className="sm:hidden">
            <Sidebar isTestimonials={isTestimonials} isAdmin={isAdmin} />
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
