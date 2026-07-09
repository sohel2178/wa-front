"use client";

import { Search, RotateCw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BANGLADESH_DISTRICTS } from "@/lib/bangladesh-districts";
import EmployeeSelect from "@/components/common/EmployeeSelect";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "../common/DatePicker";

type Employee = {
  _id: string;
  name: string;
};

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  isAdmin?: boolean;

  employee?: string;
  onEmployeeChange?: (value: string) => void;

  district?: string;
  onDistrictChange?: (value: string) => void;

  status?: string;
  onStatusChange?: (value: string) => void;

  employees?: Employee[];

  loading?: boolean;
  onClear?: () => void;

  scheduledDate?: Date;
  onScheduledDateChange: (date: Date | undefined) => void;
};

export default function FollowupFilters({
  search,
  onSearchChange,
  isAdmin = false,

  employee = "all",
  onEmployeeChange,

  district = "all",
  onDistrictChange,

  status = "all",
  onStatusChange,

  employees = [],

  loading = false,
  onClear,
  onScheduledDateChange,
  scheduledDate,
}: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        {/* Search */}

        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            className="pl-9"
            placeholder="Search customer name or phone..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Employee */}

        {isAdmin && (
          <EmployeeSelect
            value={employee}
            onChange={onEmployeeChange!}
            employees={employees}
            includeAll
          />
        )}

        {/* District */}

        <Select value={district} onValueChange={onDistrictChange}>
          <SelectTrigger className="w-full xl:w-44">
            <SelectValue placeholder="District" />
          </SelectTrigger>

          <SelectContent className="max-h-80">
            <SelectItem value="all">All Districts</SelectItem>

            {BANGLADESH_DISTRICTS.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status */}

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full xl:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>

            <SelectItem value="scheduled">Scheduled</SelectItem>

            <SelectItem value="completed">Completed</SelectItem>

            <SelectItem value="cancelled">Cancelled</SelectItem>

            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>

        {/* Buttons */}

        <div className="flex gap-2">
          <DatePicker value={scheduledDate} onChange={onScheduledDateChange} />
          <Button variant="outline" onClick={onClear}>
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
