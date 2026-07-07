"use client";

import { Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { MetaTemplate } from "@/types/meta-template";

import TemplateStatusBadge from "./TemplateStatusBadge";

interface Props {
  template: MetaTemplate;
  onView?: (template: MetaTemplate) => void;
}

export default function TemplateRow({ template, onView }: Props) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/40">
      <td className="px-6 py-4">
        <div>
          <p className="font-medium">{template.name}</p>

          <p className="text-xs text-muted-foreground">
            {template.metaTemplateId}
          </p>
        </div>
      </td>

      <td className="px-6 py-4">{template.language}</td>

      <td className="px-6 py-4">{template.category}</td>

      <td className="px-6 py-4">
        <TemplateStatusBadge status={template.status} />
      </td>

      <td className="px-6 py-4">{template.qualityScore || "-"}</td>

      <td className="px-6 py-4">
        {template.lastSyncedAt
          ? new Date(template.lastSyncedAt).toLocaleString()
          : "-"}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onView?.(template)}
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
