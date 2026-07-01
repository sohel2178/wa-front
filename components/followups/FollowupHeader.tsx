"use client";

import { CalendarClock, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  loading?: boolean;
  onRefresh: () => void;
};

export default function FollowupHeader({ loading = false, onRefresh }: Props) {
  return (
    <div className="border-b bg-background">
      <div className="flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <CalendarClock className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Follow-ups</h1>
            <p className="text-sm text-muted-foreground">
              Manage scheduled customer follow-ups.
            </p>
          </div>
        </div>

        <Button variant="outline" onClick={onRefresh} disabled={loading}>
          <RotateCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>
    </div>
  );
}
