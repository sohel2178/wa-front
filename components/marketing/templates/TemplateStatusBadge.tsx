"use client";

import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  APPROVED: {
    label: "Approved",
    className:
      "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  },

  PENDING: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  },

  PAUSED: {
    label: "Paused",
    className:
      "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100",
  },

  DISABLED: {
    label: "Disabled",
    className: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100",
  },

  REJECTED: {
    label: "Rejected",
    className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
  },
};

export default function TemplateStatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "",
  };

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
