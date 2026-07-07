"use client";

import { useState } from "react";

import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import CsvDropzone from "./CsvDropzone";

import { replaceCampaignCsv } from "@/lib/marketing-api";

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

export default function CsvReplaceDialog({
  open,
  onOpenChange,
  campaignId,
  onSuccess,
}: Props) {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleReplace = async () => {
    if (!file) {
      toast.error("Please select a CSV file.");
      return;
    }

    try {
      setLoading(true);

      await replaceCampaignCsv(campaignId, file);

      toast.success("CSV replaced successfully.");

      await onSuccess?.();

      onOpenChange(false);

      setFile(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Failed to replace CSV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Replace CSV File</AlertDialogTitle>

          <AlertDialogDescription>
            Upload a new CSV file. The existing import will be replaced.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <CsvDropzone
          loading={loading}
          disabled={loading}
          onFileSelected={setFile}
        />

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={!file || loading}
            onClick={(e) => {
              e.preventDefault();
              handleReplace();
            }}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Replace CSV
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
