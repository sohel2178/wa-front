"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TemplateSkeletonProps {
  rows?: number;
}

export default function TemplateSkeleton({ rows = 8 }: TemplateSkeletonProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="border-b px-6 py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/30">
              <tr>
                {[
                  "Template",
                  "Language",
                  "Category",
                  "Status",
                  "Quality",
                  "Last Sync",
                  "Actions",
                ].map((_, index) => (
                  <th key={index} className="px-6 py-4 text-left">
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: rows }).map((_, row) => (
                <tr key={row} className="border-b">
                  <td className="px-6 py-5">
                    <Skeleton className="h-5 w-56" />
                  </td>

                  <td className="px-6 py-5">
                    <Skeleton className="h-5 w-16" />
                  </td>

                  <td className="px-6 py-5">
                    <Skeleton className="h-5 w-24" />
                  </td>

                  <td className="px-6 py-5">
                    <Skeleton className="h-8 w-24 rounded-full" />
                  </td>

                  <td className="px-6 py-5">
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </td>

                  <td className="px-6 py-5">
                    <Skeleton className="h-5 w-28" />
                  </td>

                  <td className="px-6 py-5">
                    <Skeleton className="h-9 w-9 rounded-md" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
