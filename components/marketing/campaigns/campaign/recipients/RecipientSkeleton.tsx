"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function RecipientSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-6 py-4 text-left">Phone</th>
            <th className="px-6 py-4 text-left">Employee</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Created</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 8 }).map((_, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">
                <Skeleton className="h-5 w-44" />
              </td>

              <td className="px-6 py-4">
                <Skeleton className="h-5 w-32" />
              </td>

              <td className="px-6 py-4">
                <Skeleton className="h-6 w-24 rounded-full" />
              </td>

              <td className="px-6 py-4">
                <Skeleton className="h-5 w-36" />
              </td>

              <td className="px-6 py-4 text-right">
                <Skeleton className="ml-auto h-8 w-8 rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
