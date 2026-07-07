"use client";

import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

const STATUS_MAP: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  draft: {
    label: "Draft",
    className: "bg-slate-100 text-slate-700 border-slate-200",
  },

  queued: {
    label: "Queued",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },

  running: {
    label: "Running",
    className: "bg-green-100 text-green-700 border-green-200",
  },

  paused: {
    label: "Paused",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },

  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },

  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 border-red-200",
  },

  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

export default function CampaignStatusBadge({ status }: Props) {
  const config = STATUS_MAP[status] ?? {
    label: status,
    className: "",
  };

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
