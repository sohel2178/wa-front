"use client";

import { Calendar, FileText, Languages, Tag, User } from "lucide-react";
import { format } from "date-fns";

import { TemplateCampaign } from "@/types/template-campaign";

import CampaignStatusBadge from "../CampaignStatusBadge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
  campaign: TemplateCampaign;
}

export default function CampaignInfoCard({ campaign }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Campaign */}

        <InfoRow
          icon={<FileText className="h-4 w-4" />}
          label="Campaign Name"
          value={campaign.name}
        />

        {campaign.description && (
          <InfoRow
            icon={<FileText className="h-4 w-4" />}
            label="Description"
            value={campaign.description}
            multiline
          />
        )}

        <Separator />

        {/* Template */}

        <InfoRow
          icon={<FileText className="h-4 w-4" />}
          label="Template"
          value={campaign.templateSnapshot.name}
        />

        <InfoRow
          icon={<Languages className="h-4 w-4" />}
          label="Language"
          value={campaign.templateSnapshot.language}
        />

        <InfoRow
          icon={<Tag className="h-4 w-4" />}
          label="Category"
          value={campaign.templateSnapshot.category}
        />

        <InfoRow
          icon={<Tag className="h-4 w-4" />}
          label="Template Status"
          value={
            <CampaignStatusBadge
              status={
                campaign.templateSnapshot.status as
                  | "draft"
                  | "queued"
                  | "running"
                  | "paused"
                  | "completed"
                  | "cancelled"
                  | "failed"
              }
            />
          }
        />

        <Separator />

        {/* Employee */}

        <InfoRow
          icon={<User className="h-4 w-4" />}
          label="Assigned Employee"
          value={campaign.assignedEmployee.name}
        />

        <InfoRow
          icon={<User className="h-4 w-4" />}
          label="Employee Email"
          value={campaign.assignedEmployee.email}
        />

        <Separator />

        {/* Campaign */}

        <InfoRow
          icon={<Tag className="h-4 w-4" />}
          label="Campaign Status"
          value={<CampaignStatusBadge status={campaign.status} />}
        />

        <InfoRow
          icon={<Calendar className="h-4 w-4" />}
          label="Created"
          value={format(new Date(campaign.createdAt), "dd MMM yyyy HH:mm")}
        />

        {campaign.scheduledAt && (
          <InfoRow
            icon={<Calendar className="h-4 w-4" />}
            label="Scheduled"
            value={format(new Date(campaign.scheduledAt), "dd MMM yyyy HH:mm")}
          />
        )}

        {campaign.startedAt && (
          <InfoRow
            icon={<Calendar className="h-4 w-4" />}
            label="Started"
            value={format(new Date(campaign.startedAt), "dd MMM yyyy HH:mm")}
          />
        )}

        {campaign.completedAt && (
          <InfoRow
            icon={<Calendar className="h-4 w-4" />}
            label="Completed"
            value={format(new Date(campaign.completedAt), "dd MMM yyyy HH:mm")}
          />
        )}
      </CardContent>
    </Card>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  multiline?: boolean;
}

function InfoRow({ icon, label, value, multiline = false }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon}
        {label}
      </div>

      <div className={multiline ? "whitespace-pre-wrap" : "flex items-center"}>
        {value || "-"}
      </div>
    </div>
  );
}
