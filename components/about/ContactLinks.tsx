import { contactLinks } from "@/data";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const ContactLinks = () => {
  const linksContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    }),
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  return (
    <motion.ul
      className="flex flex-col h-full gap-2 justify-center"
      variants={linksContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {contactLinks.map(({ id, name, link, icon }, index) => {
        const Icon = icon;
        return (
          <Link key={id} href={link} target="_blank">
            <motion.li
              variants={linkVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              whileHover="hover"
              className="flex items-center gap-2 text-lg text-muted-foreground hover:text-primary duration-200"
            >
              {Icon && (
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={16} />
                </motion.div>
              )}
              {name}
            </motion.li>
          </Link>
        );
      })}
    </motion.ul>
  );
};

export default ContactLinks;
