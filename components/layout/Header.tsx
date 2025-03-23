"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../Themes/ModeToggle";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import { headerLinks } from "@/data";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import AdminDropdown from "./AdminDropdown";
import { checkAdminStatus } from "@/lib/actions";
import Logo from "../Logo";
import { filterLinks } from "@/lib/utils";

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
  const [isScrolled, setIsScrolled] = useState(false);

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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (targetHash: string) => {
    setActiveHash(targetHash);
  };

  const filteredLinks = filterLinks(headerLinks, isTestimonials);

  return (
    <motion.header
      {...animation}
      className={`fixed top-5 left-0 right-0 mx-auto max-w-5xl z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 shadow-md backdrop-blur-lg rounded-xl"
          : "bg-background/30 shadow-sm backdrop-blur-[10px] rounded-2xl"
      }`}
    >
      <div className="flex justify-between items-center h-14 px-5">
        <Link
          href="/#home"
          onClick={() => handleLinkClick("#home")}
          className="flex items-center transition-transform duration-200 hover:scale-105"
        >
          <Logo />
        </Link>

        <div className="flex items-center">
          <nav className="hidden sm:block mr-6">
            <ul className="flex gap-6 md:gap-8">
              {filteredLinks.map(({ id, name, link }) => {
                const hashPart = link.includes("#")
                  ? `#${link.split("#")[1]}`
                  : "";
                const isActive = activeHash === hashPart && pathname === "/";

                return (
                  <li key={id} className="relative">
                    <Link
                      href={link}
                      onClick={() => handleLinkClick(hashPart)}
                      className={`relative px-1 py-2 font-medium transition-colors duration-200
                        ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                    >
                      {name}

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "100%" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
                          />
                        )}
                      </AnimatePresence>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {isAdmin && (
            <div className="hidden sm:flex items-center">
              <Separator orientation="vertical" className="h-6 mx-2" />
              <AdminDropdown />
            </div>
          )}

          <div className="flex items-center">
            <Separator
              orientation="vertical"
              className="h-6 hidden sm:block mx-2"
            />
            <ModeToggle />
            <div className="sm:hidden ml-2">
              <Separator orientation="vertical" className="h-6" />
            </div>
            <div className="sm:hidden ml-2">
              <Sidebar isTestimonials={isTestimonials} isAdmin={isAdmin} />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

const animation = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};
