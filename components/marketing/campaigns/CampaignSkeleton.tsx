"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function CampaignSkeleton() {
  return (
    <Card className="p-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="mb-4 flex items-center justify-between">
          <Skeleton className="h-5 w-64" />

          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </Card>
  );
}
