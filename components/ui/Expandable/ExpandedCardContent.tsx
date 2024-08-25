"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CloseIcon } from "./CloseIcon";
import Hover from "../Hover";
import { ExpandedCardContentProps } from "@/types";

export const ExpandedCardContent = forwardRef(
  ({ id, active, setActive }: ExpandedCardContentProps, ref) => {
    return (
      <div className="fixed inset-0 grid place-items-center z-50">
        <motion.button
          layout
          aria-label="Close expanded card"
          key={`button-${active.title}-${id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.05,
            },
          }}
          transition={{ duration: 0.3 }}
          className="flex absolute top-3 right-3 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
          onClick={() => setActive(null)}
        >
          <CloseIcon />
        </motion.button>
        <motion.div
          ref={ref}
          layoutId={`card-${active.title}-${id}`}
          className="w-full px-4 sm:px-6 max-h-screen max-w-[500px] overflow-y-scroll scrollbar-hide outline-none h-full min-[500px]:h-fit min-[500px]:max-h-[90%] flex flex-col bg-primary-foreground min-[500px]:rounded-3xl"
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
              className="rounded-lg"
            />
          </motion.div>
          <div className="py-8 sm:py-10">
            <div className="flex justify-between items-center flex-wrap gap-y-4">
              <div>
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
                  {active.tech.map(({ id, title, img, isDark }) => (
                    <Hover id={id} key={id} title={title}>
                      <div className="bg-muted ml-[-8px] z-10 sm:ml-[-12px] p-[3px] sm:p-[6px] border border-muted-foreground/50 rounded-lg flex items-center">
                        <Image
                          src={img}
                          alt={title}
                          width={18}
                          height={18}
                          className={`${isDark && "dark:invert z-0"}`}
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
    );
  }
);

ExpandedCardContent.displayName = "ExpandedCardContent";
