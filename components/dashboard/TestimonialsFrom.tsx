"use client";

import { newTestimonialSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { useEffect, useState } from "react";
import { TestimonialsProps, TestimonialsFormProps } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { createTestimonials, updateTestimonials } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

const TestimonialsForm = ({
  mode,
  initialData: propInitialData,
  testimonialId,
}: TestimonialsFormProps) => {
  const [initialData, setInitialData] = useState(propInitialData);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [testimonialFormData, setTestimonialFormData] =
    useState<TestimonialsProps>(
      initialData || {
        username: "",
        job_title: "",
        user_message: "",
      }
    );

  const form = useForm<z.infer<typeof newTestimonialSchema>>({
    resolver: zodResolver(newTestimonialSchema),
    defaultValues: testimonialFormData,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      const hasChanges =
        initialData.job_title !== testimonialFormData.job_title.trim() ||
        initialData.user_message !== testimonialFormData.user_message.trim() ||
        initialData.username !== testimonialFormData.username.trim();
      setIsFormChanged(hasChanges);
    }
  }, [testimonialFormData, initialData, mode]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await form.trigger();
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please check your inputs and try again",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const action =
        mode === "create" ? createTestimonials : updateTestimonials;
      const result = await action(
        mode === "edit"
          ? { ...testimonialFormData, id: testimonialId }
          : testimonialFormData
      );
      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: `testimonial ${mode === "create" ? "created" : "updated"} successfully`,
        });
      }

      if (mode === "create") {
        setTestimonialFormData({
          job_title: "",
          user_message: "",
          username: "",
        });
        form.reset();
      } else {
        setInitialData({
          ...testimonialFormData,
          job_title: testimonialFormData.job_title.trim(),
          user_message: testimonialFormData.user_message.trim(),
          username: testimonialFormData.username.trim(),
        });
        setIsFormChanged(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setTestimonialFormData((prev) => ({ ...prev, [field]: value }));
    form.setValue(field as any, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto">
        <h2 className="font-bold text-4xl mb-5">
          {testimonialFormData.username || "User Testimonial"}
        </h2>
        <div className="space-y-10">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    onChange={(e) =>
                      handleFieldChange("username", e.target.value)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Job Title"
                    {...field}
                    onChange={(e) =>
                      handleFieldChange("job_title", e.target.value)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="user_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="User Message"
                    {...field}
                    onChange={(e) =>
                      handleFieldChange("user_message", e.target.value)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading || (mode === "edit" && !isFormChanged)}
            className="mt-10"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "create" ? "Creating..." : "Updating..."}
              </>
            ) : mode === "create" ? (
              "Create Testimonial"
            ) : (
              "Update Testimonial"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TestimonialsForm;
