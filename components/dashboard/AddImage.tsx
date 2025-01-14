"use client";

import { ImagePlus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AddImageProps, ImagePreviewProps } from "@/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export const AddImage = ({
  size,
  form,
  setMainImage,
  setSectionImage,
  setFormData,
  setSkillFormData,
}: AddImageProps) => {
  const handleImageChange = (value: string) => {
    if (size === "big" && setMainImage && setFormData) {
      setMainImage(value);
      setFormData((prev) => ({
        ...prev,
        image: value,
      }));
    } else if (size === "small" && setSectionImage) {
      setSectionImage(value);
    } else if (size === "big-skill" && setSkillFormData) {
      setSkillFormData((prev) => ({ ...prev, image: value }));
    }
  };

  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Image URL"
                onChange={(e) => {
                  field.onChange(e);
                  handleImageChange(e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
            <ImagePreview
              imageUrl={field.value}
              onRemove={() => {
                field.onChange("");
                handleImageChange("");
              }}
              size={size}
            />
          </FormItem>
        )}
      />
    </div>
  );
};

const ImagePreview = ({ imageUrl, onRemove, size }: ImagePreviewProps) => {
  if (!imageUrl) {
    return (
      <div
        className={`flex flex-col items-center justify-center w-full ${
          size === "big" || size === "big-skill" ? "h-[500px]" : "h-[200px]"
        } border-2 border-dashed rounded-lg hover:border-primary`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <ImagePlus className="w-8 h-8 mb-2 text-gray-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto">
      <img
        src={imageUrl}
        alt="Image Preview"
        className={`${
          size === "big" || size === "big-skill"
            ? "h-[500px] max-w-4xl"
            : "h-[200px]"
        } w-full ${size === "big-skill" ? "object-contain" : "object-cover"} rounded-lg`}
      />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute -top-1 -right-1 h-5 w-5"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
