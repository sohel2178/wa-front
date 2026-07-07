"use client";

import { useState } from "react";

import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

import CsvDropzone from "./CsvDropzone";
import CsvFileCard from "./CsvFileCard";

import { CampaignCsvFile } from "@/types/template-campaign";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  csvFile?: CampaignCsvFile | null;

  uploading?: boolean;

  onUpload: (file: File) => Promise<void>;

  onPreview?: () => void;

  onReplace?: () => void;

  onDelete?: () => void;
}

export default function CsvUploadCard({
  csvFile,
  uploading = false,
  onUpload,
  onPreview,
  onReplace,
  onDelete,
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const hasUploadedFile = csvFile?.exists ?? false;

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a CSV file.");
      return;
    }

    try {
      await onUpload(selectedFile);

      setSelectedFile(null);
    } catch (error) {
      console.error(error);

      toast.error("Failed to upload CSV.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSV Import</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Uploaded CSV */}

        {hasUploadedFile && csvFile ? (
          <CsvFileCard
            csvFile={csvFile}
            uploading={uploading}
            onPreview={onPreview}
            onReplace={onReplace}
            onDelete={onDelete}
          />
        ) : (
          <>
            {/* No CSV uploaded */}

            {!selectedFile ? (
              <CsvDropzone
                disabled={uploading}
                loading={uploading}
                onFileSelected={setSelectedFile}
              />
            ) : (
              <>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>

                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button disabled={uploading} onClick={handleUpload}>
                    <UploadCloud className="mr-2 h-4 w-4" />

                    {uploading ? "Uploading..." : "Upload CSV"}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
