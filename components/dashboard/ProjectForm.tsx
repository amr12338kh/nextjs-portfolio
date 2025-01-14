"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Loader2, Plus } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { SelectSkills } from "./SelectSkills";
import { AddSections } from "./AddSections";
import { AddImage } from "./AddImage";
import ProjectSectionsPreview from "./ProjectSectionsPreview";
import { newProjectSchema } from "@/lib/validation";
import { createProject, updateProject } from "@/lib/actions";
import { ProjectProps, ProjectFormProps } from "@/types";
import { areArraysEqual } from "@/lib/utils";

const ProjectForm = ({
  skills,
  mode,
  initialData: propInitialData,
  projectId,
}: ProjectFormProps) => {
  const [initialData, setInitialData] = useState(propInitialData);
  const [mainImage, setMainImage] = useState<string>(initialData?.image || "");
  const [sectionImage, setSectionImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [resetKey, setResetKey] = useState(0);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [formData, setFormData] = useState<ProjectProps>(
    initialData || {
      title: "",
      tagline: "",
      description: "",
      image: mainImage,
      link: "",
      githubLink: "",
      skills: [],
      sections: [],
    }
  );

  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      const hasChanges =
        initialData.title !== formData.title.trim() ||
        initialData.tagline !== formData.tagline.trim() ||
        initialData.description !== formData.description.trim() ||
        initialData.image !== formData.image?.trim() ||
        initialData.link !== formData.link.trim() ||
        initialData.githubLink !== formData.githubLink.trim() ||
        !areArraysEqual(initialData.skills || [], formData.skills || []) ||
        !areArraysEqual(initialData.sections || [], formData.sections || []);
      setIsFormChanged(hasChanges);
    }
  }, [formData, initialData, mode]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await form.trigger();
    if (!isValid && mode === "create") {
      toast({
        title: "Validation Error",
        description: "Please check your inputs and try again",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const action = mode === "create" ? createProject : updateProject;
      const result = await action(
        mode === "edit" ? { ...formData, id: projectId } : formData
      );

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: `Project ${mode === "create" ? "created" : "updated"} successfully`,
          action:
            mode === "create" ? (
              <Link target="_blank" href={`/project/${result._id}`}>
                <ToastAction altText="View">View</ToastAction>
              </Link>
            ) : undefined,
        });

        if (mode === "create") {
          setFormData({
            title: "",
            tagline: "",
            description: "",
            image: "",
            link: "",
            githubLink: "",
            skills: [],
            sections: [],
          });
          setMainImage("");
          setSectionImage("");
          setResetKey((prev) => prev + 1);
          form.reset();
        } else {
          // Update the initialData to match the current formData after successful update
          setInitialData({
            ...formData,
            title: formData.title.trim(),
            tagline: formData.tagline.trim(),
            description: formData.description.trim(),
            image: formData.image?.trim(),
            link: formData.link.trim(),
            githubLink: formData.githubLink.trim(),
            skills: formData.skills || [],
            sections: formData.sections || [],
          });
          setIsFormChanged(false);
        }
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
    setFormData((prev) => ({ ...prev, [field]: value }));
    form.setValue(field as any, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto">
          <h2 className="font-bold text-4xl mb-5">
            {formData.title || "Project Title"}
          </h2>
          <div className="space-y-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={formData.title}
                      onChange={(e) =>
                        handleFieldChange("title", e.target.value)
                      }
                      placeholder="Project Title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={formData.tagline}
                      onChange={(e) =>
                        handleFieldChange("tagline", e.target.value)
                      }
                      placeholder="Project Tagline"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={formData.description}
                      onChange={(e) =>
                        handleFieldChange("description", e.target.value)
                      }
                      placeholder="Project Description"
                      rows={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <AddImage
                size="big"
                mainImage={mainImage}
                setFormData={setFormData}
                setMainImage={setMainImage}
                form={form}
              />
            </div>

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={formData.link}
                      onChange={(e) =>
                        handleFieldChange("link", e.target.value)
                      }
                      placeholder="Project Link"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={formData.githubLink}
                      onChange={(e) =>
                        handleFieldChange("githubLink", e.target.value)
                      }
                      placeholder="Project Github Link"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <SelectSkills
                setFormData={setFormData}
                skills={skills}
                initialSkills={initialData?.skills}
                resetKey={resetKey}
              />
            </div>

            <div className="space-y-2">
              <span
                onClick={() => setOpen(true)}
                className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md p-3 cursor-pointer"
              >
                <Plus className="size-4" /> Add Section
              </span>
            </div>

            <ProjectSectionsPreview
              sections={formData.sections}
              deleteSection={(index) => {
                const newSections = formData.sections.filter(
                  (_, i) => i !== index
                );
                handleFieldChange("sections", newSections);
              }}
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
                "Create Project"
              ) : (
                "Update Project"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <AddSections
        open={open}
        setOpen={setOpen}
        setFormData={setFormData}
        sectionImage={sectionImage}
        setSectionImage={setSectionImage}
      />
    </div>
  );
};

export default ProjectForm;
