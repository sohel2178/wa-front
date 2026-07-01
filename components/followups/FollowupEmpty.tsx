"use client";

import { CalendarClock } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  title?: string;

  description?: string;

  onRefresh?: () => void;
};

export default function FollowupEmpty({
  title = "No Follow-ups Found",
  description = "You're all caught up. There are no follow-ups matching the current filters.",
  onRefresh,
}: Props) {
  return (
    <div className="mx-auto flex h-105 w-full max-w-3xl items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CalendarClock className="h-10 w-10 text-primary" />
        </div>

        <h2 className="text-2xl font-semibold">{title}</h2>

        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          {description}
        </p>

        {onRefresh && (
          <Button className="mt-6" variant="outline" onClick={onRefresh}>
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}
