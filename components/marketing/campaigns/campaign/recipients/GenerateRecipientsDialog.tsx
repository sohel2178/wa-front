"use client";

import { Loader2, Users } from "lucide-react";

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

  onOpenChange: (open: boolean) => void;

  total: number;

  loading?: boolean;

  onConfirm: () => void;
}

export default function GenerateRecipientsDialog({
  open,
  onOpenChange,
  total,
  loading = false,
  onConfirm,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Generate Recipients</AlertDialogTitle>

          <AlertDialogDescription>
            This will create <strong>{total.toLocaleString()}</strong> campaign
            recipients from the uploaded CSV file.
            <br />
            <br />
            Existing recipients will be replaced.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
