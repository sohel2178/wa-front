"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FollowupSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 p-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="space-y-5 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-4 w-40" />
              </div>

              <Skeleton className="h-8 w-24 rounded-full" />
            </div>

            <Skeleton className="h-px w-full" />

            {/* Date */}
            <div className="flex gap-8">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-28" />
            </div>

            {/* Sales */}
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Address */}
            <Skeleton className="h-5 w-72" />

            {/* Note */}
            <Skeleton className="h-20 w-full rounded-lg" />

            {/* Footer */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-28" />

              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
