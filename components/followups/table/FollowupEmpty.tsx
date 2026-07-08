"use client";

import { ClipboardCheck, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  onRefresh?: () => void;
};

export default function FollowupEmpty({ onRefresh }: Props) {
  return (
    <div className="flex h-full min-h-100 items-center justify-center">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ClipboardCheck className="h-10 w-10 text-muted-foreground" />
        </div>

        <h3 className="text-xl font-semibold">No Follow-ups Found</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          There are no follow-ups matching the current filters. Try changing the
          filters or refresh the page.
        </p>

        {onRefresh && (
          <Button className="mt-6" variant="outline" onClick={onRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}
