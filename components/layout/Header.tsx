"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../Themes/ModeToggle";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import { headerLinks } from "@/data";
import { usePathname } from "next/navigation";
import Logo from "../Logo";
import { filterLinks } from "@/lib/utils";

const headerVariants = {
  hidden: { opacity: 0, y: -300 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      when: "beforeChildren" as const,
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
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 },
  },
};

const navItemVariants = (index: number) => ({
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.25 + index * 0.08,
    },
  },
});

const controlsVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.5,
      staggerChildren: 0.12,
      delayChildren: 0.6,
    },
  },
};

const controlItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const Header = ({ isTestimonials }: { isTestimonials: boolean }) => {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    setActiveHash(window.location.hash);

    const handleHashChange = () => setActiveHash(window.location.hash);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (pathname.startsWith("/projects")) return null;

  const handleLinkClick = (targetHash: string) => setActiveHash(targetHash);

  const filteredLinks = filterLinks(headerLinks, isTestimonials);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-5 left-0 right-0 mx-auto max-w-7xl z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 shadow-lg backdrop-blur-xl rounded-2xl border border-border/60"
          : "bg-background/40 shadow-sm backdrop-blur-md rounded-2xl border border-border/30"
      }`}
    >
      <div className="flex justify-between items-center h-14 px-5">
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
        >
          <Link
            href="/#home"
            onClick={() => handleLinkClick("#home")}
            className="flex items-center w-full h-full"
          >
            <Logo />
          </Link>
        </motion.div>

        <div className="flex items-center gap-3">
          {/* Desktop nav */}
          <nav className="hidden sm:block">
            <motion.ul
              className="flex items-center gap-1 bg-muted/50 border border-border/50 rounded-full px-2 py-1.5"
              variants={controlsVariants}
            >
              {filteredLinks.map(({ id, name, link }, index) => {
                const hashPart = link.includes("#") ? `#${link.split("#")[1]}` : "";
                const isActive = activeHash === hashPart && pathname === "/";
                const isHovered = hoveredLink === id.toFixed();

                return (
                  <motion.li
                    key={id}
                    className="relative"
                    variants={navItemVariants(index)}
                  >
                    <Link
                      href={link}
                      onClick={() => handleLinkClick(hashPart)}
                      onMouseEnter={() => setHoveredLink(id.toFixed())}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="relative flex items-center px-3.5 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 z-10"
                    >
                      {/* Active pill background */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            layoutId="active-pill"
                            className="absolute inset-0 bg-primary rounded-full z-[-1]"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Hover underline */}
                      {!isActive && (
                        <motion.span
                          className="absolute bottom-0.5 left-3.5 right-3.5 h-px bg-primary origin-left"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                      )}

                      <span className={isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground transition-colors"}>
                        {name}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          {/* Controls */}
          <motion.div className="flex items-center gap-2" variants={controlsVariants}>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            <motion.div variants={controlItemVariants}>
              <ModeToggle />
            </motion.div>
            <motion.div className="sm:hidden" variants={controlItemVariants}>
              <Sidebar isTestimonials={isTestimonials} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;