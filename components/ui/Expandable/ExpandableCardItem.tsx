"use client";

import { ExpandableCardItemProps, ProjectsProps } from "@/types";
import { motion } from "framer-motion";
import React, { useCallback, useMemo } from "react";
import Image from "next/image";

export const ExpandableCardItem = React.memo(
  ({ item, id, setActive }: ExpandableCardItemProps) => {
    const memoizedItem = useMemo(() => item, [item]);
    const memoizedSetActive = useCallback(
      (item: ProjectsProps) => setActive(item),
      [setActive]
    );

    return (
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
        onClick={() => memoizedSetActive(memoizedItem)}
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
          <div>
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
    );
  }
);

ExpandableCardItem.displayName = "ExpandableCardItem";
