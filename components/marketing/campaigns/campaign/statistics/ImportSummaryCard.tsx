"use client";

import { FileSpreadsheet, CircleCheckBig, CircleX, Copy } from "lucide-react";

import SummaryStat from "./SummaryStat";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  summary: {
    totalRows: number;

    validRows: number;

    duplicateRows: number;

    invalidRows: number;
  };
}

export default function ImportSummaryCard({ summary }: Props) {
  const hasImport = summary.totalRows > 0;

  if (!hasImport) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Import Summary</CardTitle>
        </CardHeader>

        <CardContent className="flex h-44 items-center justify-center text-muted-foreground">
          Upload a CSV file to see the import summary.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryStat
            title="Total Rows"
            value={summary.totalRows}
            icon={<FileSpreadsheet className="h-6 w-6" />}
          />

          <SummaryStat
            title="Valid"
            value={summary.validRows}
            icon={<CircleCheckBig className="h-6 w-6 text-green-600" />}
          />

          <SummaryStat
            title="Duplicate"
            value={summary.duplicateRows}
            icon={<Copy className="h-6 w-6 text-yellow-600" />}
          />

          <SummaryStat
            title="Invalid"
            value={summary.invalidRows}
            icon={<CircleX className="h-6 w-6 text-red-600" />}
          />
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          {summary.validRows > 0 ? (
            <div className="space-y-1">
              <p className="font-medium">Ready to generate recipients</p>

              <p className="text-sm text-muted-foreground">
                {summary.validRows.toLocaleString()} valid contacts can be
                converted into campaign recipients.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="font-medium">No valid recipients found</p>

              <p className="text-sm text-muted-foreground">
                Please upload a valid CSV file before continuing.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
