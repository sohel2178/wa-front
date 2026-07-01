"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import { FollowUp } from "@/types/followup";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  CalendarClock,
  Phone,
  User,
  MapPin,
  CircleDollarSign,
  Repeat,
  Pencil,
  Check,
  X,
  MessageCircle,
  History,
} from "lucide-react";
import FollowupHistoryDialog from "./FollowupHistoryDialog";

type Props = {
  followUp: FollowUp;

  onEdit?: (followUp: FollowUp) => void;

  onComplete?: (followUp: FollowUp) => void;

  onCancel?: (followUp: FollowUp) => void;
};

export default function FollowupCard({
  followUp,
  onEdit,
  onComplete,
  onCancel,
}: Props) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const conversation = followUp.conversationId;

  const contact = conversation.contactId;

  const scheduled = new Date(followUp.current.scheduledAt);

  const overdue =
    followUp.current.status === "scheduled" && scheduled < new Date();

  const badge = (() => {
    if (followUp.current.status === "completed") {
      return <Badge>✓ Completed</Badge>;
    }

    if (followUp.current.status === "cancelled") {
      return <Badge variant="secondary">Cancelled</Badge>;
    }

    if (overdue) {
      return <Badge variant="destructive">Overdue</Badge>;
    }

    return <Badge className="bg-green-600 hover:bg-green-600">Scheduled</Badge>;
  })();

  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.15,
      }}
    >
      <Card className="h-full rounded-xl">
        <div className="flex h-full flex-col p-5">
          {/* HEADER */}

          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-lg font-semibold">
                  {contact?.name}
                </h3>

                {badge}
              </div>

              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />

                  {contact?.phone}
                </div>

                {conversation.assignedTo && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />

                    {conversation.assignedTo.name}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-muted px-3 py-2 text-right">
              <div className="flex items-center justify-end gap-2 text-sm font-medium">
                <CalendarClock className="h-4 w-4" />

                {scheduled.toLocaleDateString()}
              </div>

              <div className="mt-1 text-xs text-muted-foreground">
                {scheduled.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* QUICK INFO */}

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CircleDollarSign className="h-4 w-4 text-green-600" />
                Device Price
              </div>

              <div className="font-semibold">
                ৳{followUp.salesSnapshot.devicePrice ?? "-"}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Repeat className="h-4 w-4 text-blue-600" />
                Monthly
              </div>

              <div className="font-semibold">
                ৳{followUp.salesSnapshot.monthlyCharge ?? "-"}
              </div>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 text-red-500" />
                Location
              </div>

              <div className="text-right font-medium">
                {followUp.salesSnapshot.district || "-"}

                {followUp.salesSnapshot.address && (
                  <div className="text-xs text-muted-foreground">
                    {followUp.salesSnapshot.address}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* NOTE */}

          {followUp.current.note && (
            <div className="mt-5 rounded-lg bg-muted p-3">
              <div className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                Customer Note
              </div>

              <div className="line-clamp-3 text-sm leading-6">
                {followUp.current.note}
              </div>
            </div>
          )}

          {/* PUSH FOOTER */}

          <div className="mt-auto">
            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <button
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                onClick={() => setHistoryOpen(true)}
              >
                <History className="h-4 w-4" />
                {followUp.history.length} History
              </button>

              <div className="flex items-center gap-1">
                <Button asChild variant="ghost" size="icon">
                  <Link href={`/conversations?id=${conversation._id}`}>
                    <MessageCircle className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit?.(followUp)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                {followUp.current.status === "scheduled" && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600"
                      onClick={() => onComplete?.(followUp)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600"
                      onClick={() => onCancel?.(followUp)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <FollowupHistoryDialog
          open={historyOpen}
          onOpenChange={setHistoryOpen}
          followUp={followUp}
        />
      </Card>
    </motion.div>
  );
}
