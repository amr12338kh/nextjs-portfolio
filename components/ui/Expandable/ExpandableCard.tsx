"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ExpandableCardProps } from "@/types";
import { ExpandableCardItem } from "./ExpandableCardItem";
import { ExpandedCardContent } from "./ExpandedCardContent";

export const ExpandableCard = ({ items }: ExpandableCardProps) => {
  const [active, setActive] = useState<(typeof items)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const isActive = active && typeof active === "object";

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setActive(null);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      ref.current?.focus();
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, handleKeyDown]);

  useOutsideClick(ref, () => setActive(null));

  if (!items || items.length === 0) {
    console.log("No items received in ExpandableCard");
    return <p className="text-center">No projects to display</p>;
  }

  return (
    <React.Fragment>
      <AnimatePresence>
        {isActive && (
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
        {isActive && (
          <ExpandedCardContent
            ref={ref}
            id={id}
            active={active}
            setActive={setActive}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        <ul className="mx-auto w-full gap-4 grid grid-cols-1 min-[330px]:grid-cols-2 sm:flex sm:flex-col">
          {items.map((item) => (
            <ExpandableCardItem
              key={`card-${item.title}-${id}`}
              id={id}
              item={item}
              setActive={setActive}
            />
          ))}
        </ul>
      </AnimatePresence>
    </React.Fragment>
  );
};
