"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Send, MessageCircle, Zap, CheckCircle2 } from "lucide-react";
import AnimatedTitle from "../AnimatedTitle";
import UnderLine from "../UnderLine";

export const ContactFormContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const data = [
    {
      icon: Send,
      text: "Direct communication for seamless collaboration",
      color: "text-blue-500",
    },
    {
      icon: MessageCircle,
      text: "Prompt and thoughtful response guaranteed",
      color: "text-green-500",
    },
    {
      icon: Zap,
      text: "Transforming ideas into actionable solutions",
      color: "text-purple-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const dataItemsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const dataItemsVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.3,
      },
    },
  };

  const dataTextVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.6,
        delay: i * 0.05,
      },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className={cn(className)}
    >
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div variants={itemVariants} className="space-y-8">
          <AnimatedTitle
            title="Contact Me"
            subtitle="Let's bring your ideas to life"
          />
          <UnderLine
            containerClassName="hidden md:block"
            lineClassName="!mx-0"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={dataItemsContainerVariants}
            className="space-y-6"
          >
            {data.map(({ icon: Icon, text, color }, i) => (
              <motion.div
                key={i}
                variants={dataItemsVariants}
                className="flex items-center space-x-4 group"
              >
                <motion.div
                  variants={iconVariants}
                  className={`
                    p-3 rounded-xl transition-all duration-300
                    ${color} bg-primary/10
                    group-hover:scale-105 group-hover:shadow-md
                  `}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <motion.p
                  variants={dataTextVariants}
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                >
                  {text}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <UnderLine
            containerClassName="md:hidden !mt-0"
            lineClassName="!mx-0"
          />
          {children}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        className="text-center text-sm text-muted-foreground mt-12"
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            whileInView={{
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0],
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <CheckCircle2 className="text-green-500 h-4 w-4" />
          </motion.div>
          I&apos;ll get back to you as soon as possible
        </div>
      </motion.div>
    </motion.div>
  );
};
