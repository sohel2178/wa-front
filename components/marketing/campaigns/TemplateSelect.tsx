"use client";

import * as React from "react";

import { Check, ChevronsUpDown, FileText, Languages, Tag } from "lucide-react";

import { cn } from "@/lib/utils";

import { MetaTemplate } from "@/types/meta-template";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Badge } from "@/components/ui/badge";

type Props = {
  value: string;

  onChange: (value: string) => void;

  templates: MetaTemplate[];

  placeholder?: string;

  disabled?: boolean;

  className?: string;
};

export default function TemplateSelect({
  value,
  onChange,
  templates,
  placeholder = "Select Template",
  disabled = false,
  className,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const selectedTemplate = React.useMemo(
    () => templates.find((template) => template._id === value),
    [templates, value],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between overflow-hidden", className)}
        >
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />

            <span className="truncate">
              {selectedTemplate?.name ?? placeholder}
            </span>
          </div>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-105 p-0">
        <Command>
          <CommandInput placeholder="Search template..." />

          <CommandList>
            <CommandEmpty>No template found.</CommandEmpty>

            <CommandGroup>
              {templates.map((template) => (
                <CommandItem
                  key={template._id}
                  value={`${template.name} ${template.category} ${template.language}`}
                  onSelect={() => {
                    onChange(template._id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      value === template._id ? "opacity-100" : "opacity-0",
                    )}
                  />

                  <div className="flex w-full flex-col gap-1 py-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium">
                        {template.name}
                      </span>

                      <Badge
                        variant={
                          template.status === "APPROVED"
                            ? "default"
                            : "secondary"
                        }
                        className="shrink-0"
                      >
                        {template.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" />

                        <span>{template.category}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Languages className="h-3.5 w-3.5" />

                        <span>{template.language}</span>
                      </div>
                    </div>

                    {template.body?.text && (
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {template.body.text}
                      </p>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
