"use client";

import { useCallback, useRef, useState } from "react";

import { UploadCloud, Loader2, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
  loading?: boolean;
  onFileSelected: (file: File) => void;
}

export default function CsvDropzone({
  disabled = false,
  loading = false,
  onFileSelected,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const validateFile = useCallback(
    (file: File) => {
      const isCsv =
        file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv");

      if (!isCsv) {
        toast.error("Please select a valid CSV file.");
        return;
      }

      onFileSelected(file);
    },
    [onFileSelected],
  );

  const handleBrowse = () => {
    if (disabled || loading) return;

    inputRef.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    validateFile(file);

    // Allow selecting the same file again
    event.target.value = "";
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (disabled || loading) return;

    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setDragging(false);

    if (disabled || loading) return;

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    validateFile(file);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleInputChange}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex min-h-65 flex-col items-center justify-center rounded-xl border-2 border-dashed px-8 py-10 text-center transition-all",
          dragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
          (disabled || loading) && "cursor-not-allowed opacity-60",
        )}
      >
        {loading ? (
          <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
        ) : dragging ? (
          <UploadCloud className="mb-4 h-14 w-14 text-primary" />
        ) : (
          <FileSpreadsheet className="mb-4 h-14 w-14 text-muted-foreground" />
        )}

        <h3 className="text-lg font-semibold">
          {loading
            ? "Preparing upload..."
            : dragging
              ? "Drop CSV file here"
              : "Upload CSV File"}
        </h3>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Drag & drop your customer CSV file here or browse your computer.
        </p>

        <Button
          type="button"
          className="mt-6"
          variant="outline"
          disabled={disabled || loading}
          onClick={handleBrowse}
        >
          Browse CSV File
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Supported format: <strong>.csv</strong>
        </p>
      </div>
    </>
  );
}
