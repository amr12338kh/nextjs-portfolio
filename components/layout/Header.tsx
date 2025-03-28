"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../Themes/ModeToggle";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence, delay } from "framer-motion";
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
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsLoaded(true), 100);
  //   return () => clearTimeout(timer);
  // }, []);

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

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -300,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -25, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1,
      },
    },
  };

  const navItemVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      y: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.25 + index * 0.08,
      },
    },
  });

  const controlsVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5,
        staggerChildren: 0.12,
        delayChildren: 0.6,
      },
    },
  };

  const controlItemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const activeIndicatorVariants = {
    hidden: {
      width: 0,
      opacity: 0,
      left: "50%",
    },
    visible: {
      width: "100%",
      opacity: 1,
      left: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      width: 0,
      opacity: 0,
      left: "50%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate={"visible"}
      className={`fixed top-5 left-0 right-0 mx-auto max-w-7xl z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-background/70 shadow-md backdrop-blur-lg rounded-xl"
          : "bg-background/30 shadow-sm backdrop-blur-[10px] rounded-2xl"
      }`}
    >
      <div className="flex justify-between items-center h-14 px-5">
        <motion.div
          variants={logoVariants}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          whileTap={{
            scale: 0.98,
            transition: { duration: 0.2 },
          }}
        >
          <Link
            href="/#home"
            onClick={() => handleLinkClick("#home")}
            className="flex items-center"
          >
            <Logo />
          </Link>
        </motion.div>

        <div className="flex items-center">
          <nav className="hidden sm:block mr-6">
            <ul className="flex gap-6 md:gap-8">
              {filteredLinks.map(({ id, name, link }, index) => {
                const hashPart = link.includes("#")
                  ? `#${link.split("#")[1]}`
                  : "";
                const isActive = activeHash === hashPart && pathname === "/";

                return (
                  <motion.li
                    key={id}
                    className="relative"
                    custom={index}
                    variants={navItemVariants(index)}
                  >
                    <motion.div
                      whileHover={{
                        y: -2,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }}
                      whileTap={{
                        y: 0,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Link
                        href={link}
                        onClick={() => handleLinkClick(hashPart)}
                        className={`relative px-1 py-2 font-medium transition-colors duration-300
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
                              variants={activeIndicatorVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
                            />
                          )}
                        </AnimatePresence>
                      </Link>
                    </motion.div>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {isAdmin && (
            <motion.div
              className="hidden sm:flex items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
            >
              <Separator orientation="vertical" className="h-6 mx-2" />
              <AdminDropdown />
            </motion.div>
          )}

          <motion.div className="flex items-center" variants={controlsVariants}>
            <Separator
              orientation="vertical"
              className="h-6 hidden sm:block mx-2"
            />
            <motion.div variants={controlItemVariants}>
              <ModeToggle />
            </motion.div>
            <div className="sm:hidden ml-2">
              <Separator orientation="vertical" className="h-6" />
            </div>
            <motion.div
              className="sm:hidden ml-2"
              variants={controlItemVariants}
            >
              <Sidebar isTestimonials={isTestimonials} isAdmin={isAdmin} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
