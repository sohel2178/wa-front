"use client";

import {
  CheckCircle2,
  Clock3,
  Loader2,
  MailCheck,
  MessageCircle,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { TemplateCampaign } from "@/types/template-campaign";

interface Props {
  campaign: TemplateCampaign;
}

export default function CampaignStatistics({ campaign }: Props) {
  const stats = campaign.stats;

  const progress =
    campaign.progress ??
    (stats.total
      ? Math.round(
          ((stats.sent +
            stats.delivered +
            stats.read +
            stats.replied +
            stats.failed) /
            stats.total) *
            100,
        )
      : 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Statistics</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">Progress</span>

            <span className="font-semibold">{progress}%</span>
          </div>

          <Progress value={progress} />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat
            label="Total"
            value={stats.total}
            icon={<MessageCircle className="h-4 w-4" />}
          />

          <Stat
            label="Pending"
            value={stats.pending}
            icon={<Clock3 className="h-4 w-4" />}
          />

          <Stat
            label="Sending"
            value={stats.sending}
            icon={<Loader2 className="h-4 w-4" />}
          />

          <Stat
            label="Sent"
            value={stats.sent}
            icon={<CheckCircle2 className="h-4 w-4 text-green-600" />}
          />

          <Stat
            label="Delivered"
            value={stats.delivered}
            icon={<MailCheck className="h-4 w-4 text-blue-600" />}
          />

          <Stat
            label="Read"
            value={stats.read}
            icon={<CheckCircle2 className="h-4 w-4 text-violet-600" />}
          />

          <Stat
            label="Failed"
            value={stats.failed}
            icon={<XCircle className="h-4 w-4 text-red-600" />}
          />
        </div>

        <div className="flex justify-center">
          <Badge
            variant={
              campaign.status === "completed"
                ? "default"
                : campaign.status === "failed"
                  ? "destructive"
                  : "secondary"
            }
          >
            {campaign.status.toUpperCase()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function Stat({ label, value, icon }: StatProps) {
  return (
    <div className="rounded-lg border p-3">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
