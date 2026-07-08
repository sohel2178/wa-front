"use client";

import { FollowUp } from "@/types/followup";

import { TableCell, TableRow } from "@/components/ui/table";

import FollowupStatusBadge from "./FollowupStatusBadge";
import FollowupActions from "./FollowupActions";

type Props = {
  followUp: FollowUp;

  onEdit?: (followUp: FollowUp) => void;

  onComplete?: (followUp: FollowUp) => void;

  onCancel?: (followUp: FollowUp) => void;

  onHistory?: (followUp: FollowUp) => void;
};

export default function FollowupRow({
  followUp,
  onEdit,
  onComplete,
  onCancel,
  onHistory,
}: Props) {
  const conversation = followUp.conversationId;

  const contact = conversation.contactId;

  const scheduled = new Date(followUp.current.scheduledAt);

  const assignedEmployee = conversation.assignedTo;

  return (
    <TableRow>
      {/* Customer */}

      <TableCell className="min-w-55">
        <div className="flex flex-col">
          <span className="font-medium">{contact?.name || "-"}</span>

          <span className="text-sm text-muted-foreground">
            {contact?.phone || "-"}
          </span>
        </div>
      </TableCell>

      {/* Assigned */}

      <TableCell className="min-w-40">
        {assignedEmployee ? (
          <div className="flex flex-col">
            <span className="font-medium">{assignedEmployee.name}</span>

            <span className="text-xs text-muted-foreground">Employee</span>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>

      {/* District */}

      <TableCell className="min-w-45">
        <div className="flex flex-col">
          <span className="font-medium">
            {followUp.salesSnapshot.district || "-"}
          </span>

          {followUp.salesSnapshot.address ? (
            <span
              className="max-w-55 truncate text-xs text-muted-foreground"
              title={followUp.salesSnapshot.address}
            >
              {followUp.salesSnapshot.address}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
        </div>
      </TableCell>

      {/* Schedule */}

      <TableCell className="min-w-42.5">
        <div className="flex flex-col">
          <span className="font-medium">{scheduled.toLocaleDateString()}</span>

          <span className="text-sm text-muted-foreground">
            {scheduled.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </TableCell>

      {/* Sales */}

      <TableCell className="min-w-40">
        <div className="space-y-1 text-sm">
          <div>
            Device:
            <span className="ml-1 font-medium">
              ৳{followUp.salesSnapshot.devicePrice ?? "-"}
            </span>
          </div>

          <div>
            Monthly:
            <span className="ml-1 font-medium">
              ৳{followUp.salesSnapshot.monthlyCharge ?? "-"}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Note */}

      <TableCell className="max-w-xs">
        <div className="line-clamp-2 text-sm text-muted-foreground">
          {followUp.current.note || "-"}
        </div>
      </TableCell>

      {/* Status */}

      <TableCell>
        <FollowupStatusBadge followUp={followUp} />
      </TableCell>

      {/* Actions */}

      <TableCell className="text-right">
        <FollowupActions
          followUp={followUp}
          onEdit={onEdit}
          onComplete={onComplete}
          onCancel={onCancel}
          onHistory={onHistory}
        />
      </TableCell>
    </TableRow>
  );
}
