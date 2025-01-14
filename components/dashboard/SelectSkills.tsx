"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { SelectSkillsProps } from "@/types";

export function SelectSkills({
  skills,
  setFormData,
  initialSkills,
  resetKey,
}: SelectSkillsProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (initialSkills?.length) {
      setSelectedValues(initialSkills.map((skill) => skill.title || ""));
    } else {
      setSelectedValues([]);
    }
  }, [initialSkills, resetKey]);

  const handleSelect = (skillValue: string) => {
    const isSelected = selectedValues.includes(skillValue);
    const newValues = isSelected
      ? selectedValues.filter((v) => v !== skillValue)
      : [...selectedValues, skillValue];

    setSelectedValues(newValues);

    const selectedSkills = skills.filter((skill) =>
      newValues.includes(skill.title || "")
    );

    setFormData((prev) => ({
      ...prev,
      skills: selectedSkills,
    }));
  };

  return (
    <div className="space-y-2">
      <Label>Skills</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !selectedValues.length && "text-muted-foreground"
            )}
          >
            {selectedValues.length
              ? `${selectedValues.length} selected`
              : "Select Skills"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search skills..." />
            <CommandList>
              <CommandEmpty>No skill found.</CommandEmpty>
              <CommandGroup>
                {skills.map(({ title }) => (
                  <CommandItem
                    value={title}
                    key={title}
                    onSelect={() => handleSelect(title || "")}
                  >
                    {title}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedValues.includes(title || "")
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
