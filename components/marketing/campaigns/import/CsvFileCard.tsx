"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileSpreadsheet,
  HardDrive,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { format } from "date-fns";

import { CampaignCsvFile } from "@/types/template-campaign";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  csvFile: CampaignCsvFile;

  uploading?: boolean;

  onPreview?: () => void;

  onReplace?: () => void;

  onDelete?: () => void;
}

export default function CsvFileCard({
  csvFile,
  uploading = false,
  onPreview,
  onReplace,
  onDelete,
}: Props) {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "-";

    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* File Information */}

          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileSpreadsheet className="h-8 w-8 text-primary" />
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="break-all text-lg font-semibold">
                  {csvFile.originalName}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">CSV</Badge>

                  {csvFile.parsed ? (
                    <Badge>
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Parsed
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" />
                      Waiting for Parse
                    </Badge>
                  )}

                  {csvFile.imported && <Badge>Imported</Badge>}
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />

                  {formatFileSize(csvFile.size)}
                </div>

                {csvFile.uploadedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />

                    {format(new Date(csvFile.uploadedAt), "dd MMM yyyy HH:mm")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              disabled={uploading || !csvFile.parsed}
              onClick={onPreview}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>

            <Button variant="outline" disabled={uploading} onClick={onReplace}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Replace
            </Button>

            <Button
              variant="destructive"
              disabled={uploading}
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
