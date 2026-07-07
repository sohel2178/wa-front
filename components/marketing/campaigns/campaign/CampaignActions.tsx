"use client";

import { Ban, Loader2, Pause, Play, RotateCcw, Trash2 } from "lucide-react";

import { TemplateCampaign } from "@/types/template-campaign";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  campaign: TemplateCampaign;

  loading?: boolean;

  onQueue?: () => void;

  onPause?: () => void;

  onResume?: () => void;

  onCancel?: () => void;

  onDelete?: () => void;
}

export default function CampaignActions({
  campaign,
  loading = false,
  onQueue,
  onPause,
  onResume,
  onCancel,
  onDelete,
}: Props) {
  const isDraft = campaign.status === "draft";
  const isQueued = campaign.status === "queued";
  const isRunning = campaign.status === "running";
  const isPaused = campaign.status === "paused";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ------------------------------------------------------------------ */}
        {/* Queue */}
        {/* ------------------------------------------------------------------ */}

        {isDraft && (
          <Button
            className="w-full"
            size="lg"
            disabled={loading}
            onClick={onQueue}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Queueing Campaign...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Queue Campaign
              </>
            )}
          </Button>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Queued */}
        {/* ------------------------------------------------------------------ */}

        {isQueued && (
          <Button className="w-full" size="lg" disabled variant="secondary">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Waiting for Worker...
          </Button>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Running */}
        {/* ------------------------------------------------------------------ */}

        {isRunning && (
          <Button
            className="w-full"
            size="lg"
            variant="secondary"
            disabled={loading}
            onClick={onPause}
          >
            <Pause className="mr-2 h-4 w-4" />
            Pause Campaign
          </Button>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Paused */}
        {/* ------------------------------------------------------------------ */}

        {isPaused && (
          <Button
            className="w-full"
            size="lg"
            disabled={loading}
            onClick={onResume}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Resume Campaign
          </Button>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Cancel */}
        {/* ------------------------------------------------------------------ */}

        {(isDraft || isQueued || isRunning || isPaused) && (
          <Button
            className="w-full"
            variant="destructive"
            size="lg"
            disabled={loading}
            onClick={onCancel}
          >
            <Ban className="mr-2 h-4 w-4" />
            Cancel Campaign
          </Button>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Delete */}
        {/* ------------------------------------------------------------------ */}

        {isDraft && !campaign.createdRecipients && (
          <Button
            className="w-full"
            variant="outline"
            size="lg"
            disabled={loading}
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Campaign
          </Button>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Status */}
        {/* ------------------------------------------------------------------ */}

        <div className="rounded-lg border bg-muted/40 p-4">
          <h4 className="font-medium">Current Status</h4>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {getStatusDescription(campaign.status)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusDescription(status: string) {
  switch (status) {
    case "draft":
      return "The campaign is still being prepared. You can edit details, upload or replace the CSV file, and generate recipients.";

    case "queued":
      return "The campaign has been added to the sending queue and is waiting for an available worker.";

    case "running":
      return "Messages are currently being delivered to recipients.";

    case "paused":
      return "Sending has been paused. You can resume the campaign at any time.";

    case "completed":
      return "The campaign finished successfully and all recipients have been processed.";

    case "cancelled":
      return "The campaign has been cancelled and will not send any additional messages.";

    case "failed":
      return "The campaign stopped because an unexpected error occurred.";

    default:
      return "-";
  }
}
