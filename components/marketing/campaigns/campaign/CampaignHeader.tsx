"use client";

import { Calendar, FileText, RefreshCw, SquarePen, User } from "lucide-react";

import { format } from "date-fns";

import { TemplateCampaign } from "@/types/template-campaign";

import CampaignStatusBadge from "../CampaignStatusBadge";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  campaign: TemplateCampaign;

  loading?: boolean;

  onRefresh?: () => void;

  onEdit?: () => void;
}

export default function CampaignHeader({
  campaign,
  loading = false,
  onRefresh,
  onEdit,
}: Props) {
  const templateName =
    campaign.templateSnapshot?.name ?? campaign.metaTemplate?.name ?? "-";

  const employeeName = campaign.assignedEmployee?.name ?? "-";

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left */}

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {campaign.name}
            </h1>

            <CampaignStatusBadge status={campaign.status} />
          </div>

          {campaign.description && (
            <p className="max-w-3xl text-muted-foreground">
              {campaign.description}
            </p>
          )}

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />

              <span>{templateName}</span>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />

              <span>{employeeName}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />

              <span>
                Created {format(new Date(campaign.createdAt), "dd MMM yyyy")}
              </span>
            </div>

            {campaign.scheduledAt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />

                <span>
                  Scheduled{" "}
                  {format(new Date(campaign.scheduledAt), "dd MMM yyyy HH:mm")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onRefresh} disabled={loading}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          <Button onClick={onEdit}>
            <SquarePen className="mr-2 h-4 w-4" />
            Edit Campaign
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Recipients" value={campaign.stats?.total || 0} />

        <MetricCard title="Sent" value={campaign.stats.sent} />

        <MetricCard title="Delivered" value={campaign.stats.delivered} />

        <MetricCard title="Read" value={campaign.stats.read} />
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;

  value: number;
}

function MetricCard({ title, value }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <p className="text-sm text-muted-foreground">{title}</p>

      <p className="mt-1 text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}
