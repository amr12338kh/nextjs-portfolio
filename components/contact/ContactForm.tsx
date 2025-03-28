"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Send, CheckCircle2, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { formSchema } from "@/lib/schema";

const formFieldVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const iconVariants = {
  initial: {
    scale: 0.5,
    rotate: -180,
    opacity: 0,
  },
  whileInView: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

const buttonVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export const ContactForm = () => {
  const [isSent, setIsSent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const serviceId = process.env.EMAIL_SERVICE_ID;
    const templateId = process.env.EMAIL_TEMPLATE_ID;
    const publicKey = process.env.EMAIL_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Email service is not properly configured.",
      });
      return;
    }

    try {
      setIsSent(true);
      const formElement = document.querySelector("form");
      if (formElement) {
        await emailjs.sendForm(serviceId, templateId, formElement, publicKey);

        setIsSuccess(true);
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully!",
          variant: "default",
        });

        setTimeout(() => {
          form.reset();
          setIsSent(false);
          setIsSuccess(false);
        }, 2000);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sending Failed",
        description: "Unable to send message. Please try again.",
      });
      console.error("Failed to send email:", error);
      setIsSent(false);
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <motion.div
            variants={iconVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
          >
            <PenLine className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.h2
            variants={formFieldVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            className="text-2xl font-semibold text-foreground"
          >
            Drop Your Message
          </motion.h2>
        </div>
        <motion.p
          variants={formFieldVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
          className="text-muted-foreground text-sm"
        >
          Have a project in mind or want to collaborate? Fill out the form
          below.
        </motion.p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            variants={formFieldVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Full Name
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="
                        border-primary/30 focus:border-primary 
                        transition-all duration-300 
                        hover:shadow-sm
                        focus:ring-2 focus:ring-primary/30
                      "
                    />
                  </FormControl>
                  <AnimatePresence>
                    {form.formState.errors.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormMessage className="text-xs text-red-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            variants={formFieldVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Email Address
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      className="
                        border-primary/30 focus:border-primary 
                        transition-all duration-300 
                        hover:shadow-sm
                        focus:ring-2 focus:ring-primary/30
                      "
                    />
                  </FormControl>
                  <AnimatePresence>
                    {form.formState.errors.email && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormMessage className="text-xs text-red-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            variants={formFieldVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Your Message
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your message here..."
                      rows={5}
                      {...field}
                      className="
                        border-primary/30 focus:border-primary 
                        transition-all duration-300 
                        hover:shadow-sm
                        focus:ring-2 focus:ring-primary/30
                        resize-none
                      "
                    />
                  </FormControl>
                  <AnimatePresence>
                    {form.formState.errors.message && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormMessage className="text-xs text-red-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Button
              type="submit"
              disabled={isSent}
              className={cn(
                "w-full font-bold transition-all duration-300 group",
                isSuccess
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {isSent ? (
                isSuccess ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5 animate-pulse" />
                    Message Sent
                  </>
                ) : (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                )
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};
