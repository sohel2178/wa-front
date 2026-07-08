"use client";

import { useState } from "react";

import { FollowUp } from "@/types/followup";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import FollowupRow from "./FollowupRow";
import FollowupEmpty from "./FollowupEmpty";
import FollowupSkeleton from "./FollowupSkeleton";

import FollowupHistoryDialog from "../FollowupHistoryDialog";

type Props = {
  followUps: FollowUp[];

  loading?: boolean;

  onRefresh?: () => void;

  onEdit?: (followUp: FollowUp) => void;

  onComplete?: (followUp: FollowUp) => void;

  onCancel?: (followUp: FollowUp) => void;
};

export default function FollowupTable({
  followUps,
  loading = false,
  onRefresh,
  onEdit,
  onComplete,
  onCancel,
}: Props) {
  const [historyFollowUp, setHistoryFollowUp] = useState<FollowUp | null>(null);

  if (loading) {
    return <FollowupSkeleton />;
  }

  if (!followUps.length) {
    return <FollowupEmpty onRefresh={onRefresh} />;
  }

  return (
    <>
      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur supports-backdrop-filter:bg-background/95">
            <TableRow>
              <TableHead className="w-60">Customer</TableHead>

              <TableHead className="w-45">Assigned</TableHead>

              <TableHead className="w-35">District</TableHead>

              <TableHead className="w-45">Schedule</TableHead>

              <TableHead className="w-45">Sales</TableHead>

              <TableHead>Note</TableHead>

              <TableHead className="w-35">Status</TableHead>

              <TableHead className="w-55 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {followUps.map((followUp) => (
              <FollowupRow
                key={followUp._id}
                followUp={followUp}
                onEdit={onEdit}
                onComplete={onComplete}
                onCancel={onCancel}
                onHistory={setHistoryFollowUp}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {historyFollowUp && (
        <FollowupHistoryDialog
          open={!!historyFollowUp}
          followUp={historyFollowUp}
          onOpenChange={(open) => {
            if (!open) {
              setHistoryFollowUp(null);
            }
          }}
        />
      )}
    </>
  );
}
