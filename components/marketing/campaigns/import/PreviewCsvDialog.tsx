"use client";

import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getImportPreview } from "@/lib/marketing-api";

import { CampaignImportPreview } from "@/types/campaign-import";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  campaignId: string;
}

export default function PreviewCsvDialog({
  open,
  onOpenChange,
  campaignId,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<CampaignImportPreview | null>(null);

  useEffect(() => {
    if (!open) return;

    loadPreview();
  }, [open]);

  const loadPreview = async () => {
    try {
      setLoading(true);

      const result = await getImportPreview(campaignId);

      setPreview(result);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Failed to load preview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>CSV Preview</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex h-80 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : preview ? (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <SummaryCard title="Total" value={preview.summary.totalRows} />

              <SummaryCard title="Valid" value={preview.summary.validRows} />

              <SummaryCard
                title="Duplicate"
                value={preview.summary.duplicateRows}
              />

              <SummaryCard
                title="Invalid"
                value={preview.summary.invalidRows}
              />
            </div>

            <div className="max-h-125 overflow-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {preview.headers.map((header) => (
                      <TableHead key={header}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {preview.preview.map((row, index) => (
                    <TableRow key={index}>
                      {preview.headers.map((header) => (
                        <TableCell key={header}>{row[header]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">{title}</p>

      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
