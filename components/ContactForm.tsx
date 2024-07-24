"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// Define the form schema using zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Make sure your email is valid",
  }),
  message: z.string().min(2, {
    message: "Please write your message",
  }),
});

export const ContactForm = () => {
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Define the submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Ensure environment variables are defined
    const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing email configuration in environment variables");
      return;
    }

    try {
      setIsSent(true);
      const formElement = document.querySelector("form");
      if (formElement) {
        await emailjs.sendForm(serviceId, templateId, formElement, publicKey);
        toast({
          description: "Your message has been sent successfully!",
        });

        // You might want to reset the form or display a success message here
        form.reset();
        setIsSent(false);
      }
    } catch (error) {
      toast({
        title: "Somthing went wrong",
        description: "Please try again",
      });
      // Handle the error here (e.g., display an error message to the user)
      console.error("Failed to send email:", error);
      setIsSent(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter a valid email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Message <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Leave a message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSent ? (
          <Button disabled className="mt-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};
