"use client";

import { Eye, MoreHorizontal, Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";

import { TemplateCampaign } from "@/types/template-campaign";

import CampaignStatusBadge from "./CampaignStatusBadge";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  campaign: TemplateCampaign;

  onDelete?: (campaign: TemplateCampaign) => void;
};

export default function CampaignRow({ campaign, onDelete }: Props) {
  const recipientCount = campaign.stats?.total ?? 0;

  const router = useRouter();

  return (
    <tr className="border-b transition-colors hover:bg-muted/40">
      {/* Campaign */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-medium">{campaign.name}</span>

          {campaign.description && (
            <span className="line-clamp-1 text-sm text-muted-foreground">
              {campaign.description}
            </span>
          )}
        </div>
      </td>

      {/* Template */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-medium">
            {campaign.templateSnapshot?.name ?? campaign.metaTemplate?.name}
          </span>

          <span className="text-xs text-muted-foreground">
            {campaign.templateSnapshot?.language ??
              campaign.metaTemplate?.language}
          </span>
        </div>
      </td>

      {/* Employee */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span>{campaign.assignedEmployee?.name}</span>

          <span className="text-xs text-muted-foreground">
            {campaign.assignedEmployee?.email}
          </span>
        </div>
      </td>

      {/* Recipients */}
      <td className="px-6 py-4">
        <span className="font-medium">{recipientCount.toLocaleString()}</span>
      </td>

      {/* Progress */}
      <td className="px-6 py-4">
        <div className="space-y-2">
          <Progress value={campaign.progress} className="h-2" />

          <span className="text-xs text-muted-foreground">
            {campaign.progress.toFixed(0)}%
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <CampaignStatusBadge status={campaign.status} />
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              router.push(
                `/whatsapp-template-marketing/campaigns/${campaign._id}`,
              )
            }
          >
            <Eye className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete?.(campaign)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Campaign
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}
