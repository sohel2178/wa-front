"use client";

import { Badge } from "@/components/ui/badge";
import { FollowUp } from "@/types/followup";

type Props = {
  followUp: FollowUp;
};

export default function FollowupStatusBadge({ followUp }: Props) {
  const scheduledAt = new Date(followUp.current.scheduledAt);

  const overdue =
    followUp.current.status === "scheduled" &&
    scheduledAt.getTime() < Date.now();

  switch (followUp.current.status) {
    case "completed":
      return (
        <Badge className="bg-green-600 hover:bg-green-600">Completed</Badge>
      );

    case "cancelled":
      return <Badge variant="secondary">Cancelled</Badge>;

    case "missed":
      return <Badge variant="destructive">Missed</Badge>;

    case "scheduled":
    default:
      if (overdue) {
        return <Badge variant="destructive">Overdue</Badge>;
      }

      return <Badge className="bg-blue-600 hover:bg-blue-600">Scheduled</Badge>;
  }
}
