"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;

  loading?: boolean;

  campaignName?: string;

  onClose: () => void;

  onConfirm: () => void;
}

export default function AssignmentDeleteDialog({
  open,
  loading,
  campaignName,
  onClose,
  onConfirm,
}: Props) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Assignment</AlertDialogTitle>

          <AlertDialogDescription>
            Remove assignment for
            <strong> {campaignName}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>

          <AlertDialogAction disabled={loading} onClick={onConfirm}>
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
