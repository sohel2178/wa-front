"use client";

import { Users, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  validRows: number;

  generated: boolean;

  loading?: boolean;

  onGenerate: () => void;
}

export default function GenerateRecipientsCard({
  validRows,
  generated,
  loading = false,
  onGenerate,
}: Props) {
  if (generated) {
    return (
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Recipients Generated</h3>

            <p className="text-sm text-muted-foreground">
              {validRows.toLocaleString()} recipients are ready for sending.
            </p>
          </div>

          <Button disabled>
            <Users className="mr-2 h-4 w-4" />
            Generated
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Ready to Generate Recipients
          </h3>

          <p className="text-sm text-muted-foreground">
            {validRows.toLocaleString()} valid contacts are ready to become
            campaign recipients.
          </p>
        </div>

        <Button disabled={loading || validRows === 0} onClick={onGenerate}>
          <Users className="mr-2 h-4 w-4" />
          Generate Recipients
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
