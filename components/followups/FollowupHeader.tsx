"use client";

import { ReactNode } from "react";

import { CalendarClock, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  loading?: boolean;

  onRefresh: () => void;

  children?: ReactNode;
};

export default function FollowupHeader({
  loading = false,
  onRefresh,
  children,
}: Props) {
  return (
    <div className="border-b bg-background">
      <div className="px-6 py-5">
        {/* Desktop */}

        <div className="hidden lg:flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 shrink-0">
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

          <div className="flex flex-1 items-center justify-end gap-3">
            {children}

            <Button variant="outline" onClick={onRefresh} disabled={loading}>
              <RotateCw
                className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Mobile */}

        <div className="lg:hidden space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <CalendarClock className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">Follow-ups</h1>

                <p className="text-xs text-muted-foreground">
                  Manage scheduled customer follow-ups.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              disabled={loading}
            >
              <RotateCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
