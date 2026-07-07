"use client";

import { useState } from "react";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteCampaignImport } from "@/lib/marketing-api";

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

  campaignId: string;

  onSuccess?: () => void | Promise<void>;
}

export default function CsvDeleteDialog({
  open,
  onOpenChange,
  campaignId,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteCampaignImport(campaignId);

      toast.success("CSV deleted successfully.");

      await onSuccess?.();

      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Failed to delete CSV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Imported CSV?</AlertDialogTitle>

          <AlertDialogDescription>
            This will remove the uploaded CSV file and its import summary.
            <br />
            <br />
            Recipient generation must be performed again after uploading a new
            file.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete CSV
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
