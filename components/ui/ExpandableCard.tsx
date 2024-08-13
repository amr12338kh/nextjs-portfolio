"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ExpandableCardProps } from "@/types";
import Hover from "./Hover";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const ExpandableCard = ({ items }: ExpandableCardProps) => {
  const [active, setActive] = useState<(typeof items)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  if (!items || items.length === 0) {
    console.log("No items received in ExpandableCard");
    return <p className="text-center">No projects to display</p>;
  }

  return (
    <React.Fragment>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-50"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-50">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-3 right-3 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full px-4 sm:px-6 max-h-screen max-w-[500px] h-full min-[500px]:h-fit min-[500px]:max-h-[90%] flex flex-col bg-primary-foreground min-[500px]:rounded-3xl overflow-hidden"
            >
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="pt-8 sm:pt-10 flex justify-center"
              >
                <Image
                  priority
                  width={500}
                  height={500}
                  src={active.image}
                  alt={active.title}
                  className=" rounded-lg"
                />
              </motion.div>
              <div className="py-8 sm:py-10">
                <div className="flex justify-between items-center flex-wrap gap-y-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-xl text-primary"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.tagline}-${id}`}
                      className="text-sm text-muted-foreground max-w-[180px] sm:max-w-full"
                    >
                      {active.tagline}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.link}
                    target="_blank"
                    className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-primary-foreground"
                  >
                    {active.btnText}
                  </motion.a>
                </div>

                <div className="relative py-8">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className=" text-muted-foreground text-sm"
                  >
                    <p className="flex flex-col gap-1">
                      <span className="font-bold text-primary/90 text-lg">
                        Quick Overview:
                      </span>{" "}
                      {active.description}
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.5,
                  }}
                  className="flex items-center justify-between "
                >
                  <div className="flex gap-x-3 sm:gap-x-5 items-center">
                    <span className="font-bold text-primary/90 sm:text-lg">
                      Tech:
                    </span>
                    <div className="flex sm:gap-x-1">
                      {active.tech?.map(({ id, title, img, isDark }) => (
                        <Hover id={id} key={id} title={title}>
                          <div className="bg-muted ml-[-8px] sm:ml-[-12px] p-[3px] sm:p-[6px] border border-muted-foreground rounded-lg flex items-center">
                            <Image
                              src={img}
                              alt={title}
                              width={18}
                              height={18}
                              className={`${isDark && "dark:invert"}`}
                              priority={false}
                            />
                          </div>
                        </Hover>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Link
                      target="_blank"
                      href={active.githubLink}
                      className="flex items-center gap-x-[2px] hover:underline underline-offset-4 text-primary/90 font-bold text-sm"
                    >
                      <ExternalLink size={20} />
                      <span>github repository</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="mx-auto w-full gap-4 grid grid-cols-1 min-[330px]:grid-cols-2 sm:flex sm:flex-col">
        {items.map((item) => (
          <motion.li
            initial={{
              y: 50,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
            }}
            viewport={{ once: true }}
            layoutId={`card-${item.title}-${id}`}
            key={`card-${item.title}-${id}`}
            onClick={() => setActive(item)}
            className="p-4 flex flex-col sm:flex-row justify-between items-center hover:bg-muted rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col sm:flex-row items-center ">
              <motion.div layoutId={`image-${item.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={item.image}
                  alt={item.title}
                  className="h-50 w-50 sm:h-20 sm:w-20 rounded-lg object-contain"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${item.title}-${id}`}
                  className="font-medium text-primary text-center sm:text-left"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${item.tagline}-${id}`}
                  className="text-muted-foreground text-center sm:text-left"
                >
                  {item.tagline}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${item.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-primary-foreground mt-4 sm:mt-0"
            >
              {item.btnText}
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
