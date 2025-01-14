"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { AddSectionsProps } from "@/types";
import { AddImage } from "./AddImage";
import { sectionSchema } from "@/lib/validation";

export const AddSections = ({
  sectionImage,
  setSectionImage,
  open,
  setOpen,
  setFormData,
}: AddSectionsProps) => {
  let counter = 0;

  const form = useForm<z.infer<typeof sectionSchema>>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      text: "",
      subText: "",
      image: "",
    },
  });

  const handleSave = (values: z.infer<typeof sectionSchema>) => {
    let newSectionData: any;

    newSectionData = {
      text: values.text.trim(),
      subText: values.subText.trim(),
      image: values.image.trim(),
    };

    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSectionData],
    }));

    setSectionImage("");
    form.reset();
    setOpen(false);
  };

  const handleDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      setSectionImage("");
    }
    setOpen(isOpen);
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
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Section</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSave)}>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Section Title"
                      onChange={(e) =>
                        handleFieldChange("text", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtext</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Section Subtext"
                      onChange={(e) =>
                        handleFieldChange("subText", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AddImage
              size={"small"}
              setFormData={setFormData}
              sectionImage={sectionImage}
              setSectionImage={setSectionImage}
              counter={counter}
              form={form}
            />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
