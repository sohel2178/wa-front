"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FollowUp } from "@/types/followup";

import {
  CalendarClock,
  MapPin,
  Pencil,
  Check,
  X,
  Plus,
  CircleDollarSign,
  Repeat,
} from "lucide-react";

type Props = {
  followUp?: FollowUp | null;

  onCreate: () => void;

  onEdit: () => void;

  onComplete: () => void;

  onCancel: () => void;
};

function getDisplayDate(date: Date) {
  const today = new Date();

  const startToday = new Date(today);
  startToday.setHours(0, 0, 0, 0);

  const startTomorrow = new Date(startToday);
  startTomorrow.setDate(startTomorrow.getDate() + 1);

  const startYesterday = new Date(startToday);
  startYesterday.setDate(startYesterday.getDate() - 1);

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (date >= startToday && date < startTomorrow) {
    return `Today • ${time}`;
  }

  if (
    date >= startTomorrow &&
    date < new Date(startTomorrow.getTime() + 86400000)
  ) {
    return `Tomorrow • ${time}`;
  }

  if (date >= startYesterday && date < startToday) {
    return `Yesterday • ${time}`;
  }

  return `${date.toLocaleDateString()} • ${time}`;
}

export default function FollowUpBanner({
  followUp,
  onCreate,
  onEdit,
  onComplete,
  onCancel,
}: Props) {
  if (!followUp) {
    return (
      <div className="border-b bg-muted/20 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4" />
          No follow-up scheduled
        </div>

        <Button size="sm" onClick={onCreate}>
          <Plus className="mr-1 h-4 w-4" />
          Schedule
        </Button>
      </div>
    );
  }

  const scheduled = new Date(followUp.current.scheduledAt);

  const overdue =
    followUp.current.status === "scheduled" && scheduled < new Date();

  return (
    <div className="border-b bg-muted/20 px-4 py-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Badge
            variant={
              overdue
                ? "destructive"
                : followUp.current.status === "completed"
                  ? "default"
                  : "secondary"
            }
          >
            {overdue ? "Overdue" : followUp.current.status}
          </Badge>

          <span className="flex items-center gap-1">
            <CalendarClock className="h-4 w-4" />

            {getDisplayDate(scheduled)}
          </span>

          <span className="flex items-center gap-1">
            <CircleDollarSign className="h-4 w-4 text-green-600" />৳
            {followUp.salesSnapshot.devicePrice ?? "-"}
          </span>

          <span className="flex items-center gap-1">
            <Repeat className="h-4 w-4 text-blue-600" />৳
            {followUp.salesSnapshot.monthlyCharge ?? "-"}
            /mo
          </span>

          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-red-500" />

            {followUp.salesSnapshot.district}

            {followUp.salesSnapshot.address &&
              ` • ${followUp.salesSnapshot.address}`}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>

          {followUp.current.status === "scheduled" && (
            <>
              <Button size="icon" variant="ghost" onClick={onComplete}>
                <Check className="h-4 w-4 text-green-600" />
              </Button>

              <Button size="icon" variant="ghost" onClick={onCancel}>
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </>
          )}
        </div>
      </div>

      {followUp.current.note && (
        <div className="mt-2 text-sm text-muted-foreground line-clamp-1">
          {followUp.current.note}
        </div>
      )}
    </div>
  );
}
