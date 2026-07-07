"use client";

import { CalendarIcon } from "lucide-react";

import { Employee } from "@/components/common/EmployeeSelect";
import EmployeeSelect from "@/components/common/EmployeeSelect";

import TemplateSelect from "./TemplateSelect";

import { MetaTemplate } from "@/types/meta-template";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface CampaignFormData {
  name: string;
  description: string;
  metaTemplate: string;
  assignedEmployee: string;
  scheduledAt: string;
}

type Props = {
  value: CampaignFormData;

  onChange: (value: CampaignFormData) => void;

  templates: MetaTemplate[];

  employees: Employee[];

  loading?: boolean;

  onCancel: () => void;

  onSubmit: () => void;
};

export default function CampaignForm({
  value,
  onChange,
  templates,
  employees,
  loading = false,
  onCancel,
  onSubmit,
}: Props) {
  const update = <K extends keyof CampaignFormData>(
    key: K,
    val: CampaignFormData[K],
  ) => {
    onChange({
      ...value,
      [key]: val,
    });
  };

  const dateValue = value.scheduledAt ? value.scheduledAt.substring(0, 10) : "";

  const timeValue = value.scheduledAt
    ? value.scheduledAt.substring(11, 16)
    : "";

  const updateSchedule = (date: string, time: string) => {
    if (!date) {
      update("scheduledAt", "");
      return;
    }

    update("scheduledAt", time ? `${date}T${time}:00` : `${date}T00:00:00`);
  };

  return (
    <div className="space-y-5">
      {/* Campaign Name */}

      <div className="space-y-2">
        <label className="text-sm font-medium">Campaign Name</label>

        <Input
          placeholder="Summer Promotion"
          value={value.name}
          disabled={loading}
          onChange={(e) => update("name", e.target.value)}
        />
      </div>

      {/* Description */}

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>

        <Textarea
          rows={4}
          placeholder="Optional description..."
          value={value.description}
          disabled={loading}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      {/* Template */}

      <div className="space-y-2">
        <label className="text-sm font-medium">Template</label>

        <TemplateSelect
          value={value.metaTemplate}
          onChange={(id) => update("metaTemplate", id)}
          templates={templates}
          disabled={loading}
        />
      </div>

      {/* Employee */}

      <div className="space-y-2">
        <label className="text-sm font-medium">Assigned Employee</label>

        <EmployeeSelect
          value={value.assignedEmployee}
          onChange={(id) => update("assignedEmployee", id)}
          employees={employees}
          includeAll={false}
          disabled={loading}
          className="w-full"
        />
      </div>

      {/* Schedule */}

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <CalendarIcon className="h-4 w-4" />
          Schedule (Optional)
        </label>

        <div className="grid grid-cols-2 gap-3">
          <Input
            type="date"
            value={dateValue}
            disabled={loading}
            onChange={(e) => updateSchedule(e.target.value, timeValue)}
          />

          <Input
            type="time"
            value={timeValue}
            disabled={loading}
            onChange={(e) => updateSchedule(dateValue, e.target.value)}
          />
        </div>
      </div>

      {/* Footer */}

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" disabled={loading} onClick={onCancel}>
          Cancel
        </Button>

        <Button
          disabled={
            loading ||
            !value.name.trim() ||
            !value.metaTemplate ||
            !value.assignedEmployee
          }
          onClick={onSubmit}
        >
          {loading ? "Creating..." : "Create Campaign"}
        </Button>
      </div>
    </div>
  );
}
