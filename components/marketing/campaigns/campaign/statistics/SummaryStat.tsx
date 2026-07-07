"use client";

import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;

  value: number;

  icon: ReactNode;

  description?: string;

  className?: string;
}

export default function SummaryStat({
  title,
  value,
  icon,
  description,
  className,
}: Props) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center justify-between p-5">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>

          <p className="text-3xl font-bold tracking-tight">
            {value.toLocaleString()}
          </p>

          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="rounded-xl bg-muted p-3">{icon}</div>
      </CardContent>
    </Card>
  );
}
