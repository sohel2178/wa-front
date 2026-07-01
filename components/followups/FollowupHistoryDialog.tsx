"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ScrollArea } from "@/components/ui/scroll-area";

import { FollowUp } from "@/types/followup";

import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  FileText,
  CircleDollarSign,
  CalendarPlus,
  Clock3,
} from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  followUp: FollowUp;
};

const getAction = (action: string) => {
  switch (action) {
    case "created":
      return {
        icon: CalendarPlus,
        color: "text-green-600",
        badge: "Created",
      };

    case "rescheduled":
      return {
        icon: RefreshCw,
        color: "text-blue-600",
        badge: "Rescheduled",
      };

    case "sales_updated":
      return {
        icon: CircleDollarSign,
        color: "text-orange-600",
        badge: "Sales Updated",
      };

    case "note_updated":
      return {
        icon: FileText,
        color: "text-indigo-600",
        badge: "Note Updated",
      };

    case "completed":
      return {
        icon: CheckCircle2,
        color: "text-green-600",
        badge: "Completed",
      };

    case "cancelled":
      return {
        icon: XCircle,
        color: "text-red-600",
        badge: "Cancelled",
      };

    default:
      return {
        icon: Clock3,
        color: "text-muted-foreground",
        badge: action,
      };
  }
};

export default function FollowupHistoryDialog({
  open,
  onOpenChange,
  followUp,
}: Props) {
  const history = [...followUp.history].reverse();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Follow-up History</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-3">
          <div className="relative ml-4 border-l">
            {history.map((item, index) => {
              const action = getAction(item.action);

              const Icon = action.icon;

              return (
                <div key={index} className="relative ml-6 pb-8 last:pb-0">
                  {/* Timeline Dot */}

                  <div className="absolute -left-[34px] top-1 flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                    <Icon className={`h-4 w-4 ${action.color}`} />
                  </div>

                  <div className="rounded-xl border p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <Badge>{action.badge}</Badge>

                      <div className="text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="mt-3 space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Scheduled</span>

                        <div className="text-muted-foreground">
                          {new Date(item.scheduledAt).toLocaleString()}
                        </div>
                      </div>

                      {item.note && (
                        <div>
                          <span className="font-medium">Note</span>

                          <div className="text-muted-foreground whitespace-pre-wrap">
                            {item.note}
                          </div>
                        </div>
                      )}

                      {item.createdBy && (
                        <div>
                          <span className="font-medium">Updated By</span>

                          <div className="text-muted-foreground">
                            {item.createdBy.name}
                          </div>
                        </div>
                      )}

                      <Separator />

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Status</span>

                        <Badge variant="outline">{item.status}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
