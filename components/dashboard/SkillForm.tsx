"use client";

import { newSkillSchema } from "@/lib/validation";
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
import { Switch } from "../ui/switch";

import { useEffect, useState } from "react";
import { SkillProps, SkillFormProps } from "@/types";
import { AddImage } from "./AddImage";
import { useToast } from "@/components/ui/use-toast";
import { createSkill, updateSkill } from "@/lib/actions";
import { Loader2 } from "lucide-react";

const SkillForm = ({
  mode,
  initialData: propInitialData,
  skillId,
}: SkillFormProps) => {
  const [initialData, setInitialData] = useState(propInitialData);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [skillFormData, setSkillFormData] = useState<SkillProps>(
    initialData || {
      title: "",
      image: "",
      isDark: false,
    }
  );

  const form = useForm<z.infer<typeof newSkillSchema>>({
    resolver: zodResolver(newSkillSchema),
    defaultValues: skillFormData,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      const hasChanges =
        initialData.title !== skillFormData.title.trim() ||
        initialData.image !== skillFormData.image?.trim() ||
        initialData.isDark !== skillFormData.isDark;
      setIsFormChanged(hasChanges);
    }
  }, [skillFormData, initialData, mode]);

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
      const action = mode === "create" ? createSkill : updateSkill;
      const result = await action(
        mode === "edit" ? { ...skillFormData, id: skillId } : skillFormData
      );
      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: `Skill ${mode === "create" ? "created" : "updated"} successfully`,
        });
      }

      if (mode === "create") {
        setSkillFormData({
          title: "",
          image: "",
          isDark: false,
        });
        form.reset();
      } else {
        setInitialData({
          ...skillFormData,
          title: skillFormData.title.trim(),
          image: skillFormData.image?.trim(),
          isDark: skillFormData.isDark,
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
    setSkillFormData((prev) => ({ ...prev, [field]: value }));
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
          {skillFormData.title || "Skill Title"}
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
                    placeholder="Skill Title"
                    {...field}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AddImage
            form={form}
            size="big-skill"
            setSkillFormData={setSkillFormData}
          />

          <FormField
            control={form.control}
            name="isDark"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        handleFieldChange("isDark", checked)
                      }
                    />
                    <FormLabel>Is Dark</FormLabel>
                  </div>
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
              "Create Skill"
            ) : (
              "Update Skill"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SkillForm;
