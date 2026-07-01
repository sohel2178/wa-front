"use client";

import { Search, RotateCw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Employee = {
  _id: string;
  name: string;
};

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  employee?: string;
  onEmployeeChange?: (value: string) => void;

  district?: string;
  onDistrictChange?: (value: string) => void;

  status?: string;
  onStatusChange?: (value: string) => void;

  employees?: Employee[];
  districts?: string[];

  loading?: boolean;

  onRefresh?: () => void;
  onClear?: () => void;
};

export default function FollowupFilters({
  search,
  onSearchChange,

  employee = "all",
  onEmployeeChange,

  district = "all",
  onDistrictChange,

  status = "all",
  onStatusChange,

  employees = [],
  districts = [],

  loading = false,

  onRefresh,
  onClear,
}: Props) {
  return (
    <div className="border-b bg-background px-6 py-4">
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

        <Select value={employee} onValueChange={onEmployeeChange}>
          <SelectTrigger className="w-full xl:w-48">
            <SelectValue placeholder="Employee" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Employees</SelectItem>

            {employees.map((employee) => (
              <SelectItem key={employee._id} value={employee._id}>
                {employee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* District */}

        <Select value={district} onValueChange={onDistrictChange}>
          <SelectTrigger className="w-full xl:w-44">
            <SelectValue placeholder="District" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>

            {districts.map((district) => (
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
          <Button variant="outline" onClick={onClear}>
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>

          <Button variant="outline" disabled={loading} onClick={onRefresh}>
            <RotateCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
