"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { FollowUp } from "@/types/followup";

import {
  CalendarDays,
  MapPin,
  Pencil,
  CheckCircle2,
  XCircle,
  Plus,
  Clock3,
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

export default function FollowUpCard({
  followUp,
  onCreate,
  onEdit,
  onComplete,
  onCancel,
}: Props) {
  if (!followUp) {
    return (
      <Card className="mt-3">
        <CardContent className="py-8 flex flex-col items-center justify-center gap-4">
          <CalendarDays className="h-10 w-10 text-muted-foreground" />

          <div className="text-center">
            <div className="font-medium">No Follow-up Scheduled</div>

            <div className="text-sm text-muted-foreground">
              Schedule a follow-up to remind yourself to contact this customer.
            </div>
          </div>

          <Button onClick={onCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Follow-up
          </Button>
        </CardContent>
      </Card>
    );
  }

  const scheduled = new Date(followUp.current.scheduledAt);

  const now = new Date();

  const overdue = followUp.current.status === "scheduled" && scheduled < now;

  const statusColor = () => {
    switch (followUp.current.status) {
      case "completed":
        return "default";

      case "cancelled":
        return "secondary";

      default:
        return overdue ? "destructive" : "default";
    }
  };

  return (
    <Card className="mt-3">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Follow-up
          </CardTitle>

          <Button size="sm" variant="ghost" onClick={onEdit}>
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-muted-foreground" />

            <span>
              {scheduled.toLocaleDateString()}

              {" • "}

              {scheduled.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <Badge variant={statusColor()}>
            {overdue ? "Overdue" : followUp.current.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-green-600" />

            <span>৳{followUp.salesSnapshot.devicePrice ?? "-"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-blue-600" />

            <span>
              ৳{followUp.salesSnapshot.monthlyCharge ?? "-"}
              /month
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-500" />

          <span>
            {followUp.salesSnapshot.district}

            {followUp.salesSnapshot.address
              ? ` • ${followUp.salesSnapshot.address}`
              : ""}
          </span>
        </div>

        {followUp.current.note && (
          <div className="rounded-lg bg-muted p-3 text-sm">
            {followUp.current.note}
          </div>
        )}

        {followUp.current.status === "scheduled" && (
          <div className="flex gap-2">
            <Button className="flex-1" onClick={onComplete}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Complete
            </Button>

            <Button variant="outline" className="flex-1" onClick={onCancel}>
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
