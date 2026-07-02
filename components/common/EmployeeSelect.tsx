"use client";

import * as React from "react";

import { Check, ChevronsUpDown, User } from "lucide-react";

import { cn } from "@/lib/utils";

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

export type Employee = {
  _id: string;
  name: string;
  email?: string;
};

type Props = {
  value: string;

  onChange: (value: string) => void;

  employees: Employee[];

  placeholder?: string;

  includeAll?: boolean;

  disabled?: boolean;

  className?: string;
};

export default function EmployeeSelect({
  value,
  onChange,
  employees,

  placeholder = "Select Employee",

  includeAll = true,

  disabled = false,

  className,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const selectedEmployee = employees.find((employee) => employee._id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          aria-expanded={open}
          className={cn("w-[220px] justify-between", className)}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <User className="h-4 w-4 shrink-0 text-muted-foreground" />

            <span className="truncate">
              {value === "all"
                ? "All Employees"
                : selectedEmployee?.name || placeholder}
            </span>
          </div>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[320px] p-0">
        <Command>
          <CommandInput placeholder="Search employee..." />

          <CommandList>
            <CommandEmpty>No employee found.</CommandEmpty>

            <CommandGroup>
              {includeAll && (
                <CommandItem
                  value="all"
                  onSelect={() => {
                    onChange("all");
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === "all" ? "opacity-100" : "opacity-0",
                    )}
                  />
                  All Employees
                </CommandItem>
              )}

              {employees.map((employee) => (
                <CommandItem
                  key={employee._id}
                  value={`${employee.name} ${employee.email ?? ""}`}
                  onSelect={() => {
                    onChange(employee._id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === employee._id ? "opacity-100" : "opacity-0",
                    )}
                  />

                  <div className="flex flex-col">
                    <span className="font-medium">{employee.name}</span>

                    {employee.email && (
                      <span className="text-xs text-muted-foreground">
                        {employee.email}
                      </span>
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
