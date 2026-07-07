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

import { Loader2, Trash2 } from "lucide-react";

import { TemplateCampaign } from "@/types/template-campaign";

interface Props {
  open: boolean;

  campaign: TemplateCampaign | null;

  loading?: boolean;

  onOpenChange: (open: boolean) => void;

  onConfirm: () => void | Promise<void>;
}

export default function DeleteCampaignDialog({
  open,
  campaign,
  loading = false,
  onOpenChange,
  onConfirm,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Campaign?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
            <br />
            <br />
            Are you sure you want to permanently delete{" "}
            <strong>{campaign?.name}</strong>?
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
            className="bg-destructive hover:bg-destructive/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Campaign
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
